import express from "express"
import authMiddleware from "../middlewares/auth.js";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.get("/create", authMiddleware, createChat);
chatRoutes.get("/get", authMiddleware, getChats);
chatRoutes.post("/delete", authMiddleware, deleteChat);

export default chatRoutes;