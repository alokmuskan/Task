// backend/routes/analyticsRoutes.js
import express from "express";
import { getAnalyticsData } from "../controllers/analyticsController.js";

const router = express.Router();

// Route to fetch analytics data
router.get("/", getAnalyticsData);

export default router;
