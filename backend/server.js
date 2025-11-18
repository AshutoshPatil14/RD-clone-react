import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/mainRouter.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: "http://localhost:5173", credentials: true };

app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send(`Welcome to Reliance Digital!`);
});

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
