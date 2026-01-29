import express from 'express';
import authMiddleware from "../middlewares/auth.js"
import { getPlans, purchesPlan } from '../controllers/creditsController.js';

const creaditRoutes = express.Router();

creaditRoutes.get("/plan", getPlans);
creaditRoutes.post("/purchase", authMiddleware, purchesPlan);

export default creaditRoutes;