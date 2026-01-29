import Stripe from "stripe";
import Transaction from "../models/transactionModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { transactionId, appId } = session.metadata;

      if (appId !== "Genix-AI") {
        return res.json({ received: true });
      }

      const transaction = await Transaction.findOne({
        _id: transactionId,
        isPaid: false
      });

      if (!transaction) {
        return res.json({ received: true });
      }

      // ✅ Add credits
      await userModel.updateOne(
        { _id: transaction.userId },
        { $inc: { credits: transaction.credits } }
      );

      // ✅ Mark paid
      transaction.isPaid = true;
      await transaction.save();
    }

    res.json({ received: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
