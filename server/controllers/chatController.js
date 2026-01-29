import chatModel from "../models/chatModel.js";


// creating a new chat
const createChat = async(req,res)=>{
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            userName:req.user.name,
            name:"New chat",
            messages:[]
        }
        await chatModel.create(chatData);

        res.json({success:true, message:"Chat created"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error,message});
    }
}

// api for getting all chats
const getChats = async(req,res)=>{
    try {
        const userId = req.user._id;
        const chats = await chatModel.find({userId}).sort({updatedat:-1});

        res.json({success:true, chats});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error,message});
    }
}

//api to detele chat
const deleteChat = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {chatId} = req.body;
        await chatModel.deleteOne({_id:chatId, userId});

        res.json({success:true, message:"chat deleted"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error,message});
    }
}


export {createChat, getChats,deleteChat}