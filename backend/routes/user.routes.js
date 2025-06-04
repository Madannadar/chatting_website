import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';

export const registerRoute = Router();
export const loginRoute = Router();

// Route for user registration
registerRoute.post('/register', register);
// Route for user login
loginRoute.post('/login', login)


