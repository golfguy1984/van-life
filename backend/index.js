import express from "express";
import cors from "cors";
import Stripe from "stripe";
import bodyParser from "body-parser";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

const stripe = new Stripe(
  "sk_test_51ON3wUKknoF4bIMWo1KFz4xIlHh7JpZpwLmKDRloBINgdAfiBlc42Uo74jaXolRjRIMS7rR2vF9errdLEp7PJspE00JchxGGhX"
);

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const usedTokens = new Set();

const generateToken = () => {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
};

const calculateTotal = (price, numDays) => {
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

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.post("/pay", async (req, res) => {
  try {
    const { email, price, numDays, van } = req.body;

    const total = calculateTotal(price, numDays);
    console.log(total);

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

app.post("/api/get-state", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    if (response.data.results.length > 0) {
      const state = response.data.results[0]?.address_components.find(
        (component) => component.types.includes("locality")
      );
      if (state) {
        res.json({ state: state.long_name });
      } else {
        res.status(404).json({ error: "State not found in the response" });
      }
    } else {
      res.status(404).json({ error: "No results found" });
    }
  } catch (error) {
    console.error("Error getting state:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/checkout", (req, res) => {
  const oneTimeToken = generateToken();

  res.json({ token: oneTimeToken });
});

app.get("/api/checkToken", (req, res) => {
  const { token } = req.query;

  // Check if the token is in the usedTokens set
  const tokenUsed = usedTokens.has(token);

  // Respond with the result
  res.json({ tokenUsed });
});

app.post("/api/markTokenUsed", (req, res) => {
  const { token } = req.body;

  // Mark the token as used by adding it to the usedTokens set
  usedTokens.add(token);

  // Respond with a success message
  res.json({ message: "Token marked as used" });
});

const PORT = 8000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
