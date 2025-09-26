import express from "express";
import { config as dotenvConfig } from "dotenv";
import ErrorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import user from './routes/authRoutes.js'


const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://effortless-swan-b08432.netlify.app"],
    credentials: true,
  })
);

dotenvConfig({ path: "./Config/config.env" });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", user);


// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Error handling middleware
app.use(ErrorMiddleware);

export default app;
