import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import chatRoutes from "./routes/chatRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import creaditRoutes from "./routes/creditsRouter.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();
await connectDb()

//middlewares
app.use(cors({
    origin:'*',
    methods:"GET PUT POST DELETE HEAD PATCH"
}));
app.use(express.json());

//stripe webhooks
app.post("/api/stripe", express.raw({type:"application/json"}),stripeWebhooks)

//api endpoints
app.use("/api/user",userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/credit", creaditRoutes);

//routes
app.get("/",(req, res)=> res.send("Server is live now"));

const port = process.env.PORT || 3000

app.listen((port),()=>{
    console.log(`Server is running on port ${port}`);
})