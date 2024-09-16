import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from  "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import { connectDB } from "./lib/db.js";


dotenv.config()

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());

// CORS Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://skeenpoint.com.ng', 'https://skeenpoint.vercel.app'],
    methods: 'POST, PUT, DELETE, GET, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/analytics", analyticsRoutes)


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)

    connectDB()
})