import Order from "../models/order.model.js"; // Import your Order model

// Create a new order after successful payment
export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, flutterwaveTransactionId } = req.body;

        // Ensure the required data is present
        if (!Array.isArray(products) || products.length === 0 || !totalAmount || !flutterwaveTransactionId) {
            return res.status(400).json({ error: "Missing required order details" });
        }

        // Create the order (user data should be passed from the frontend or JWT token)
        const newOrder = new Order({
            user: req.user._id,  // Assuming you have a user attached to the request via middleware
            products: products.map((product) => ({
                product: product._id,
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount,
            flutterwaveTransactionId,
        });

        await newOrder.save();

        // Send a success response back to the frontend
        res.status(200).json({
            success: true,
            message: "Order created successfully.",
            orderId: newOrder._id,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};
