// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const port = 5000;

// app.use(express.json());

// // Initialize Google Generative AI with your API key
// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// app.post("/chat", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const result = await chatSession.sendMessage(message);
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error chatting with Gemini", details: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
