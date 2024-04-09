import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(400).json({
                message:"User is not authorized",
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
}