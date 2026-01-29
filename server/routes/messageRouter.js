import express from "express"
import authMiddleware from "../middlewares/auth.js";
import { imageMsgController, textMsgColtroller } from "../controllers/messageController.js";

const messageRoutes = express.Router();

messageRoutes.post("/text", authMiddleware, textMsgColtroller);
messageRoutes.post("/image", authMiddleware, imageMsgController)

export default messageRoutes;