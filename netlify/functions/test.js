import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/test", (req, res) => res.send("test!"));

api.use("/test/", router);

export const handler = serverless(api);
