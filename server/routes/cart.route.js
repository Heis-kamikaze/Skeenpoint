import express from "express";

import { 
    addToCart, 
    // emptyCart, 
    getCart, 
    removeProductFromCart, 
    updateQuantity, 
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCart);
router.put("/:id", protectRoute, updateQuantity)
router.delete("/:id", protectRoute, removeProductFromCart);
// router.delete("/", protectRoute, emptyCart)

export default router;