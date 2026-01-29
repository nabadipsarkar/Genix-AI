import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import chatModel from "../models/chatModel.js";


// API to user login 
const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"user doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid password"});
        }
        const token = createToken(user._id);
        res.json({ success: true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}

// generate a token for user
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"10d"});
}

// API to  register the user
const registerUser = async(req, res)=>{
    const {name, email, password} = req.body;
    try {
        const userExist = await userModel.findOne({email});
        if(userExist){
           return res.json({success:false, message:"User already exist"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter valid email"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const user = await userModel.create({name, email, password:hashedPass});
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
// get user data
const getUser = async(req,res)=>{
    try {
        const user = req.user;
        return res.json({success:true, user});
    } catch (error) {
       console.log(error)
        res.json({ success: false, message: error.message }); 
    }
}

//get all published images
const getPublishedImages = async (req, res)=>{
    try {
        const publicImages = await chatModel.aggregate([
            {$unwind:"$messages"},
            {
                $match:{
                    "messages.isImage":true,
                    "messages.isPublished":true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl:"$messages.content",
                    userName:"$userName"
                }
            }
        ])
        res.json({success:true, images: publicImages.reverse()});
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, getUser, getPublishedImages}