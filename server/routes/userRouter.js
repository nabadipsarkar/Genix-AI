import express from "express";
import { getPublishedImages, getUser, loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/data", authMiddleware, getUser);
userRoutes.get("/published-images", getPublishedImages);

export default userRoutes;