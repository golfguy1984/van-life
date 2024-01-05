import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();

const router = Router();
router.get("/test", (req, res) => res.send("test!"));

app.use("/test/", router);

export const handler = serverless(app);
