import express from "express";
import * as dotenv from "dotenv";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ success: true, data: text });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
