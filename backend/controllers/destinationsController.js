// backend/controllers/destinationsController.js
import Destination from "../models/Destination.js";

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    let destinations = await Destination.find();

    // If no data in MongoDB, create your existing mock data
    if (destinations.length === 0) {
      const mockDestinations = [
        {
          name: "Jaipur",
          country: "India",
          visitors: 12000,
          rating: 4.7,
          category: "Cultural",
          description: "The Pink City with magnificent palaces and forts",
          popularMonths: ["Oct", "Nov", "Dec"],
          averageStay: 3
        },
        {
          name: "Bali",
          country: "Indonesia",
          visitors: 25000,
          rating: 4.9,
          category: "Beach",
          description: "Tropical paradise with stunning beaches and culture",
          popularMonths: ["Jun", "Jul", "Aug"],
          averageStay: 7
        },
        {
          name: "Paris",
          country: "France",
          visitors: 40000,
          rating: 4.8,
          category: "City",
          description: "City of lights with iconic landmarks and art",
          popularMonths: ["Apr", "May", "Sep"],
          averageStay: 4
        },
        {
          name: "Maldives",
          country: "Maldives",
          visitors: 18000,
          rating: 4.9,
          category: "Luxury",
          description: "Luxury island resort destination",
          popularMonths: ["Nov", "Dec", "Jan"],
          averageStay: 6
        },
      ];

      destinations = await Destination.insertMany(mockDestinations);
      console.log(" Initial destinations created in MongoDB");
    }

    // Return in your existing format
    res.status(200).json({ destinations });
  } catch (err) {
    console.error("Error in getAllDestinations:", err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

// Get single destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.status(200).json({ destination });
  } catch (err) {
    console.error("Error in getDestinationById:", err);
    res.status(500).json({ error: "Failed to fetch destination" });
  }
};