import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import destinationsRoutes from "./routes/destinationsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/analytics", analyticsRoutes);
app.use("/api/destinations", destinationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
