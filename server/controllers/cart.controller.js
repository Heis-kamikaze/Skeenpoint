import Product from "../models/products.model.js";

export const getCart = async (req, res) => {
    try {
        // Filter out null values from cartItems
        const validCartItems = req.user.cartItems.filter(item => item && item.productRef);

        // Extract product IDs from valid cart items
        const productIds = validCartItems.map(item => item.productRef);

        // Find products in the Product collection
        const products = await Product.find({ _id: { $in: productIds } });

        // Map products to include their corresponding quantity from cartItems
        const cartItems = products.map(product => {
            const item = validCartItems.find(cartItem =>
                cartItem.productRef.toString() === product._id.toString()
            );
            return {
                ...product.toJSON(),
                quantity: item.quantity,
                cartId: item._id
            };
        });

        console.log("Cart in contr:", cartItems);
        res.json(cartItems);
    } catch (error) {
        console.log("Error in getCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(
            item => item.productRef.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;  // Increase quantity if item exists
        } else {
            user.cartItems.push({ productRef: productId, quantity: 1 });  // Add new product with quantity
        }

        await user.save();
        res.json({ message: "Product added to cart successfully", cartItems: user.cartItems });
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            // If no productId is provided, clear the entire cart
            user.cartItems = [];
            await user.save();
            return res.status(200).json({
                message: "Cart cleared successfully",
                cartItems: user.cartItems
            });
        } else {
            // If productId is provided, remove only the specified product
            const originalCartSize = user.cartItems.length;
            user.cartItems = user.cartItems.filter(item => item.id !== productId);

            if (user.cartItems.length === originalCartSize) {
                // Product wasn't found in the cart
                return res.status(404).json({
                    message: "Product not found in the cart"
                });
            }

            await user.save();
            return res.status(200).json({
                message: "Product removed from cart successfully",
                cartItems: user.cartItems
            });
        }
    } catch (error) {
        console.error("Error in removeProductFromCart:", error.message);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



export const updateQuantity = async (req, res) => {
    try {
        const { id: cartId } = req.params;
        console.log("carti", cartId)
        const { quantity } = req.body;
        console.log(quantity)
        const user = req.user;

        const itemExists = user.cartItems.find(item => item.id === cartId);
        console.log(itemExists)

        if (itemExists) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item.id !== cartId);
                await user.save();
                return res.json(user.cartItems);
            }

            itemExists.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// export const emptyCart = async (req, res) => {
//     try {
//         req.user.cartItems = []; // Use the correct property 'cartItems'
//         await req.user.save();
//         res.json({ message: "Cart emptied successfully", cartItems: req.user.cartItems }); // Return the updated cartItems for consistency
//     } catch (error) {
//         console.log("Error in emptyCart controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }










// export const addToCart = async (req, res) => {
//     try {
//         const { cart } = req.body;
//         req.user.cart = cart;
//         await req.user.save();
//         res.json({ message: "Cart updated successfully" });
//     } catch (error) {
//         console.log("Error in addToCart controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }

// export const getCart = async (req, res) => {
//     try {
//         await req.user.populate("cart.product").execPopulate();
//         res.json({ cart: req.user.cart });
//     } catch (error) {
//         console.log("Error in getCart controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }

// export const removeFromCart = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         req.user.cart = req.user.cart.filter(item => item.product.toString() !== productId);
//         await req.user.save();
//         res.json({ message: "Product removed from cart successfully" });
//     } catch (error) {
//         console.log("Error in removeFromCart controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }



// export const updateQuantity = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const item = req.user.cart.find(item => item.product.toString() === productId);
//         item.quantity = quantity;
//         await req.user.save();
//         res.json({ message: "Cart updated successfully" });
//     } catch (error) {
//         console.log("Error in updateQuantity controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }