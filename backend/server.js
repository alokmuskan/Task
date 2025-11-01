// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ Import DB connection

// Import route files
import analyticsRoutes from "./routes/analyticsRoutes.js";
import destinationsRoutes from "./routes/destinationsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

// ✅ Connect Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register all routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/settings", settingsRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🌍 Tourism Dashboard API is running...");
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
