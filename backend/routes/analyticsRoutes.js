import express from "express";
const router = express.Router();

// Temporary test route
router.get("/", (req, res) => {
  res.json({
    message: "Analytics data fetched successfully ✅",
    visitorsByYear: [
      { year: 2021, visitors: 32000 },
      { year: 2022, visitors: 45000 },
      { year: 2023, visitors: 52000 },
      { year: 2024, visitors: 61000 },
    ],
  });
});

export default router;
