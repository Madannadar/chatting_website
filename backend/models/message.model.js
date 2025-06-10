import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true
    }
)

const Messages = mongoose.model("Message", messageSchema);
export default Messages;