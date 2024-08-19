import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import postSchema from "../mongodb/models/post";
dotenv.config();
const router = express.Routes();

export default router;
