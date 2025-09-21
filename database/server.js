import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import novelRoutes from "./routes/novelRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("📚 Novel API is running...");
});

app.use("/api/novels", novelRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
