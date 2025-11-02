// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import route files
import analyticsRoutes from "./routes/analyticsRoutes.js";
import destinationsRoutes from "./routes/destinationsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Tourism Analytics API is running! 🚀" });
});

// Register all routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/settings", settingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/dashboard`);
  console.log(`   POST http://localhost:${PORT}/api/dashboard/refresh`);
  console.log(`   GET  http://localhost:${PORT}/api/analytics`);
  console.log(`   GET  http://localhost:${PORT}/api/destinations`);
  console.log(`   GET  http://localhost:${PORT}/api/settings`);
});