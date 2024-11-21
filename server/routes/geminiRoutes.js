import express from "express";
import * as dotenv from "dotenv";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.get("/", async (req, res) => {
  console.log("Hello from DALL-E");
  res.send("Hello from DALL-E");
});

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    if (!response) {
      console.log("no response from");
      res.status(200).json({ success: true, data: "Out Of Credits" });
    }
    console.log(result.response.text());
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("no response from2");

    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
