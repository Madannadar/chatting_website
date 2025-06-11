import Messages from "../models/message.model.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        // console.log("message",data.message.text);
        if (data) return res.json({ msg: "Message added successfully" })
        if (!data) return res.json({ msg: "Failded to added message to db" })
    } catch (error) {
        next(error)
    }
}

export const getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 })
        // console.log(messages);
        
        const projectedMessages = messages.map((msg) => {
            return {
                _id: msg._id,
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            }
        })
        res.json(projectedMessages)
    } catch (error) {
        next(error)
    }
}

