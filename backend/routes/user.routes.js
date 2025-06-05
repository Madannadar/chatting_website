import { Router } from 'express';
import { login, register, setAvatar } from '../controllers/user.controller.js';

export const registerRoute = Router();
export const loginRoute = Router();
export const setAvatarRoute = Router();

// Route for user registration
registerRoute.post('/register', register);
// Route for user login
loginRoute.post('/login', login)
// Route for setAvatar
setAvatarRoute.post('/setAvatar/:id', setAvatar)



