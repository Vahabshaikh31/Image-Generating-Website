import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
const port = process.env.PORT || 8000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/gemini", geminiRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(
      port,
      () => console.log(`Server running on http://localhost:8000`) // Updated port number in the message
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
