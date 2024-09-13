import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ error: "Unauthorized - no access token provided" });
        }

        try {
    
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
    
            if (!user) {
                return res.status(401).json({ error: "Unauthorized - no user found" });
            }
    
            req.user = user;
    
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError") {
                return res.status(401).json({error: "Unauthorized - access token expired"});
            }  
            throw error;
        }

    } catch (error) {
        console.log(`Error in protectRoute middleware:`, error.message);
        res.status(401).json({ message: "Unauthorized -Invalid Access token" });
    }
}

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json ({message: "Access denied - Admin only"})
    }
}