// backend/controllers/destinationsController.js
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = [
      {
        id: 1,
        name: "Jaipur",
        country: "India",
        visitors: 12000,
        rating: 4.7,
        category: "Cultural",
      },
      {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        visitors: 25000,
        rating: 4.9,
        category: "Beach",
      },
      {
        id: 3,
        name: "Paris",
        country: "France",
        visitors: 40000,
        rating: 4.8,
        category: "City",
      },
      {
        id: 4,
        name: "Maldives",
        country: "Maldives",
        visitors: 18000,
        rating: 4.9,
        category: "Luxury",
      },
    ];

    res.status(200).json({ destinations });
  } catch (err) {
    console.error("Error in getAllDestinations:", err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};
