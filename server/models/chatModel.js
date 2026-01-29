import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId:{type:String, ref:"user", required:true},
    userName:{type:String, required:true},
    name:{type:String,  required:true},
    messages:[
        {
            isImage:{type:Boolean, required:true},
            isPublished:{type:Boolean, default:false},
            role:{type:String, required:true},
            content:{type:String, required:true},
            timestamp:{type:Number, required:true},
        }
    ]
},{timestamp:true})

const chatModel = new mongoose.model("chatModel", chatSchema);

export default chatModel