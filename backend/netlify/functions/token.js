import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();
const router = Router();

app.post("/check", (req, res) => {
  const { token } = req.query;

  const tokenUsed = usedTokens.has(token);

  res.json({ tokenUsed });
});
