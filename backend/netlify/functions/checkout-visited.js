import express, { Router } from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Set-Cookie"], // Add this line to expose Set-Cookie header
  })
);
const router = Router();

router.post("/", (req, res) => {
  // Check if a specific parameter is provided to determine whether to set or clear the cookie
  console.log("Request Body:", req.body);

  // Check if the request wants to check the existence of the cookie
  if (req.body.checkCookie) {
    const cookieExists = req.cookies["checkout-visited"] === "true";
    res.json({ cookieExists });
    return;
  }

  // Handle clearing or setting the cookie
  if (req.body.clearCookie) {
    // Clear the cookie
    res.clearCookie("checkout-visited");
    console.log("Cookie cleared");
    res.json({ message: "Cookie cleared successfully" });
  } else {
    // Set the cookie
    res.cookie("checkout-visited", true, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({ message: "Cookie set properly" });
  }
});

app.use("/.netlify/functions/checkout-visited", router);

export const handler = serverless(app);
