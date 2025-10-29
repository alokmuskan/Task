// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import route files
import analyticsRoutes from "./routes/analyticsRoutes.js";
import destinationsRoutes from "./routes/destinationsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"; // ✅ added
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register all routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
