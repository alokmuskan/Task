// backend/routes/destinationsRoutes.js
import express from "express";
import { getAllDestinations, getDestinationById } from "../controllers/destinationsController.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

export default router;