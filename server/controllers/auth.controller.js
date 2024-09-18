import User from "../models/users.model.js"
import jwt from "jsonwebtoken"
import { redisClient } from './../lib/redis.js';



const tokenGen = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "14d"
    });

    return {accessToken, refreshToken};
}

const storeRefreshToken = async ( userId, refreshToken ) => {
    await redisClient.set( `refreshToken: ${userId}`, refreshToken, "EX", 7*24*60*60 ) //7days
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60 * 1000,
    });
}


export const signup = async (req, res) => {
    const { name, password, email} = req.body;

    try {
        const userExists = await User.findOne({ email });
    
        if(userExists) {
            return res.status(400).json({
                error: "Sorry, this email is already in use"
            })
        };
    
        const new_user = await User.create({ name, password, email });

        const {accessToken, refreshToken} = tokenGen(new_user._id);
        await storeRefreshToken(new_user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);
    
        res.status(201).json({ new_user:{
            _id: new_user._id,
            name: new_user.name,
            email: new_user.email,
            createdAt: new_user.createdAt,
            role: new_user.role
        }, message: "User created successfully" });
    } catch (error) {
        console.log(`Error in Signup controller:`, error.message)
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = tokenGen(user._id);
            await storeRefreshToken(user._id, refreshToken);

            setCookies(res, accessToken, refreshToken);

            return res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    role: user.role
                },
                message: "Logged in successfully"
            })
        }        

        if (!user) {
            return res.status(400).json({error: "Invalid email or password"})
        }

        if (!(await user.comparePassword(password))) {
            return res.status(400).json({error: "Invalid email or password"});
        }
    } catch (error) {
        console.log(`Error in Login controller:`, error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            await redisClient.del(`refreshToken: ${decoded.userId}`);
        }
        
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log(`Error in Logout controller:`, error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
};

export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log(`Error in GetProfile controller:`, error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
};

//recreate an access token
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            return res.status(401).json({error: "No refresh token provided"})
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redisClient.get(`refreshToken: ${decoded.userId}`)

        console.log(storedToken);

        if(storedToken !== refreshToken) {
            return res.status(401).json({message: "Invalid refresh token"});
        }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.json({message: "Token successfully refreshed"});
    } catch (error) {
        console.log(`Error in RefreshToken controller:`, error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Controller for updating billing details
export const updateUserInfo = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, phone, billDetails } = req.body;
  
      // Check if all billing details fields are filled
      const isBillingComplete =
        billDetails &&
        billDetails.country &&
        billDetails.address &&
        billDetails.city &&
        billDetails.stateName 

      // Update the user information and billing details
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          phone,
          billDetails: {
            ...billDetails,
            isCompleted: isBillingComplete ? true : false, // Set to true only if all fields are filled
          },
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the updated user data
      res.status(200).json({
        message: 'User information updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user information:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
