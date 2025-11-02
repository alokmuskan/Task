// backend/routes/dashboardRoutes.js
import express from "express";
import { getDashboardData, refreshDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);
router.post("/refresh", refreshDashboardStats);

export default router;