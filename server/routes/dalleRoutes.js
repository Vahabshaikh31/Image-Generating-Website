import express from "express";
import * as dotenv from "dotenv";
import * as fal from "@fal-ai/serverless-client";

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
  console.log("Key not available");
}

fal.config({
  credentials: process.env.fal_ai_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello From DALL-E !");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await fal.subscribe("fal-ai/lora", {
      input: {
        model_name: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt,
      },
      logs: true,
    });
    var msg = "Currently Out Of Creadits";
    if (result === null) {
      res.json({ message: "Image generation incomplete", msg });
    }
    res.json({ message: "Image generation complete", result });
  } catch (error) {
    console.error("Error during image generation:", error);

    res
      .status(error.status || 500)
      .json({ error: error.message, details: error.body });
  }
});

export default router;
