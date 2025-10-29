import express from "express";
const router = express.Router();

// Temporary test route
router.get("/", (req, res) => {
  res.json({
    message: "Destinations fetched successfully ✅",
    destinations: [
      { id: 1, name: "Jaipur", country: "India", rating: 4.7 },
      { id: 2, name: "Bali", country: "Indonesia", rating: 4.8 },
      { id: 3, name: "Paris", country: "France", rating: 4.9 },
    ],
  });
});

export default router;
