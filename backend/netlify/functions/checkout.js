import express, { Router } from "express";
import serverless from "serverless-http";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(cors());
const router = Router();

const generateToken = () => {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
};

router.get("/", (req, res) => {
  const oneTimeToken = generateToken();

  res.json({ token: oneTimeToken });
});

app.use("/.netlify/functions/checkout", router);

export const handler = serverless(app);
