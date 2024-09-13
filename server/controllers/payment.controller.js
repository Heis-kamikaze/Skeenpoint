import { paystack } from "../lib/paystack.js";
import Order from '../models/order.model.js';

export const createCheckoutSession = async (req, res) => {
    try {
        const {products} = req.body;
        
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({error: "Invalid or empty products array"})
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100)
            totalAmount += amount * product.quantity

            return {
                price_data: {
                    currency: "ngn",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount
                },
                quantity: product.quantity
            }
        });

        const session = await paystack.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.TEST_CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.TEST_CLIENT_URL}/purchase-cancel`,
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(
                    products.map(product => {
                        return {
                            _id: product._id,
                            quantity: product.quantity,
                            price: product.price,
                        }
                    })
                )
            },

        })
        res.status(200).json({id:session.id, totalAmount: totalAmount/100})

    } catch (error) {
        console.log("Error creating checkout session", error)
        res.status(500).json({message: "An error occurred while creating checkout session"})
    }
}

export const checkoutSuccess =  async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await paystack.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            // Update user's orders
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map(product => ({
                    product: product._id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100,
                paystackSessionId: sessionId
            });

            await newOrder.save();
            res.status(200).json({
                success: true,
                message: "Order placed successfully",
                orderId: newOrder._id,
            });
            // Clear user's cart
            // Send email to user
        }
    } catch (error) {
        console.log("Error processing succesful checkout",error);
        res.status(500).json({message: "An error occurred while processing your payment"})
    }
}
