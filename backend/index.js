import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/database.js';
import {registerRoute, loginRoute, setAvatarRoute, allUsersRoute } from './routes/user.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', setAvatarRoute);
app.use('/api', allUsersRoute);

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
})


