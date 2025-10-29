// backend/routes/destinationsRoutes.js
import express from "express";
import { getAllDestinations } from "../controllers/destinationsController.js";

const router = express.Router();

// Route to fetch list of destinations
router.get("/", getAllDestinations);

export default router;
