import { Router } from 'express';
import { addMessage, getAllMessages } from '../controllers/messages.controller.js'

export const messageRoutes = Router()

messageRoutes.post('/addMessage/', addMessage)
messageRoutes.get('/getAllMessages/', getAllMessages)



