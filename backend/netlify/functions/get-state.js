import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

const router = Router();

router.post("/get-state", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    console.log(response);
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

app.use("/.netlify/functions/get-state", router);

export const handler = serverless(app);
