import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, recieverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, recieverId],
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json({newMessage})
    } catch (error) {
        console.log("Error in message controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
};

export const getMessage = async(req,res)=>{
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId, userToChatId]},
        }).populate("messages");//it sends not messages but actual messages

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in get message controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}