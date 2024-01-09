import express, { Router } from "express";
import cors from "cors";
import serverless from "serverless-http";
import Stripe from "stripe";
import bodyParser from "body-parser";

const stripe = new Stripe(
  "sk_test_51ON3wUKknoF4bIMWo1KFz4xIlHh7JpZpwLmKDRloBINgdAfiBlc42Uo74jaXolRjRIMS7rR2vF9errdLEp7PJspE00JchxGGhX"
);

const app = express();
const router = Router();
app.use(bodyParser.json());
app.use(cors());

const calculateTotal = (price, numDays) => {
  console.log("Price:", price);
  console.log("NumDays:", numDays);
  const salesTax = 1.07;
  const tripFee = 3.75;
  let discount = 1;

  if (numDays >= 3) {
    discount = 0.9;
  }

  const result = (price * discount + tripFee) * numDays * salesTax * 100;

  // Ensure the result is a valid integer
  const roundedResult = Math.round(result);

  return roundedResult;
};

router.post("/", async (req, res) => {
  try {
    const { email, price, numDays, van } = req.body;

    const total = calculateTotal(price, numDays);
    console.log("the total is", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      // metadata: {
      //   item: price,
      // },
      receipt_email: email,
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/.netlify/functions/pay", router);

export const handler = serverless(app);
