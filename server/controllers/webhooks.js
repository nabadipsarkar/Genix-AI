import Stripe from "stripe";
import Transaction from "../models/transactionModel.js";
import userModel from "../models/userModel.js";

export const stripeWebhoohs = async(req, res)=>{
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET_KEY)
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`)
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded":{
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent : paymentIntent.id
                })
                const session = sessionList.data[0];
                const {transactionId, appId} = session.metadata;

                if(appId === "Genix-AI"){
                    const transaction = await Transaction.findOne({_id:transactionId,isPaid:false});
                    //updates user credits
                    await userModel.updateOne({_id:transaction.userId},{$inc:{credits:transaction.credits}});

                    // update trabsaction property
                    transaction.isPaid = true;
                    await transaction.save()
                }else{
                    return res.json({received:true, message:"ignore event invalid app"})
                }
                break;
            }
                
            default :
                console.log("unhandle event type", event.type)
                break;
        }
        res.json({received:true})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}