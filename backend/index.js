import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/database.js';
import { registerRoute, loginRoute, setAvatarRoute, allUsersRoute } from './routes/user.routes.js';
import { messageRoutes } from './routes/messages.routes.js';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', setAvatarRoute);
app.use('/api', allUsersRoute);
app.use('/api/msg', messageRoutes)

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credential: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (Socket) => {
    global.chatSocket = Socket;
    Socket.on("add-user", (userId) => {
        onlineUsers.set(userId, Socket.id)
    })

    Socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            Socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
})
