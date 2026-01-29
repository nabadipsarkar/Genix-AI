import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const authMiddleware = async(req, res, next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.json({success:false, message:"not authorized login again"});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = token_decode.id;

        const user = await userModel.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:"Not authorized, token failed"});
    }
}

export default authMiddleware