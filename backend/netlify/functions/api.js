import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World Again!"));

router.get("/test", (req, res) => res.send("test!"));

router.post("/get-state", (req, res) => {
  res.json({ message: "Received POST request to get-state" });
});

api.use("/.netlify/functions/api", router);

export const handler = serverless(api);
