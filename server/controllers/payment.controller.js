import Order from "../models/order.model.js";
import { flutterwave } from "../lib/flutterwave.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map((product) => {
            const amount = product.price;
            totalAmount += amount * product.quantity;

            return {
                name: product.name,
                amount: amount,
                quantity: product.quantity || 1,
            };
        });

        // Flutterwave payment request
        const payload = {
            tx_ref: "flw-tx-" + Date.now(),
            amount: totalAmount,
            currency: "NGN",
            payment_options: 'card,mobilemoney,ussd',
            redirect_url: `${process.env.CLIENT_URL}/purchase-success`,
            customer: {
                email: req.user.email,
                phonenumber: req.user.phone,
                name: req.user.name,
            },
            customizations: {
                title: "Skeenpoint",
                description: "Payment for products",
                logo: "https://skeenpoint.com.ng/logo.png",
            },
            configurations: {
              session_duration: 20,// Session timeout in minutes (maxValue: 1440)    
              max_retry_attempt: 9// Max retry (int)
            },
        };

        const response = await flutterwave.Charge.card(payload);
        
        res.status(200).json({
            checkoutUrl: response.data.link, // This is the payment link where the user will be redirected
            totalAmount,
        });

    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ message: "Error processing checkout", error: error.message });
    }
};

export const checkoutSuccess = async (req, res) => {
    try {
        const { transaction_id } = req.body; // Get the transaction ID from the Flutterwave redirect

        // Verify the transaction
        const response = await flutterwave.Transaction.verify({ id: transaction_id });

        if (response.data.status === "successful") {
            const session = response.data;

            // Create a new order
            const products = JSON.parse(session.meta.products);
            const newOrder = new Order({
                user: session.meta.userId,
                products: products.map((product) => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: session.amount,
                flutterwaveTransactionId: transaction_id,
            });

            await newOrder.save();

            res.status(200).json({
                success: true,
                message: "Payment successful, order created.",
                orderId: newOrder._id,
            });
        } else {
            res.status(400).json({ message: "Payment not successful" });
        }
    } catch (error) {
        console.error("Error processing successful checkout:", error);
        res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
};

