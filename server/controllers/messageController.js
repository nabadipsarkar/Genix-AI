import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import axios from "axios"
import imagekit from "../config/imagekit.js"
import openai from "../config/openai.js"


const textMsgColtroller = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId, prompt } = req.body;
        if(req.user.credits <2){
            return res.json({success:false, message:"You don't have enough credits to use this features"})
        }       

        const chat = await chatModel.findOne({ _id: chatId, userId });
        if(!chat){
            return res.json({success:false, message:"chat not found"})
        }
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        const {choices} = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        // remove the extra_content field and save only required field
        const {extra_content, ...cleanMessage} = choices[0].message;
        const reply = {...cleanMessage, timestamp: Date.now(), isImage: false }
        

        chat.messages.push(reply);
        await chat.save();

        await userModel.updateOne({_id:userId}, {$inc:{credits:-1}});
        res.json({success:true, reply});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

const imageMsgController = async(req, res)=>{
    try {
        const userId = req.user._id;
        if(req.user.credits <2){
            return res.json({success:false, message:"You don't have enough credits to use this features"})
        }
        const {prompt, chatId, isPublished} = req.body;

        const chat = await chatModel.findOne({userId, _id:chatId});

        //push user message
        chat.messages.push({
            role: "user", content: prompt, timestamp: Date.now(), isImage: false 
        })
        // encode prompt
        const encodedPrompt = encodeURIComponent(prompt);
        const generateImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/${Date.now()}.png?tr=w-800,h-800`;

        const aIimage = await axios.get(generateImageUrl, {responseType:"arraybuffer"});
        // cenvert image into base64
        const base64Image = `data:image/png;base64,${Buffer.from(aIimage.data,"binary").toString("base64")}`;

        //upload to imageKit media library
        const uploadResponse = await imagekit.upload({
            file:base64Image,
            fileName:`${Date.now()}.png`,
            folder:"Genix-AI"
        })
        const reply = {
            role:"assistant", 
            content:uploadResponse.url,
            timestamp: Date.now(), 
            isImage: true,
            isPublished 
        }

        chat.messages.push(reply);
        await chat.save();
        await userModel.updateOne({_id:userId}, {$inc:{credits:-2}});
        res.json({success:true, reply});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}



export { textMsgColtroller, imageMsgController}