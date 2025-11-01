import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Dashboard from "./models/Dashboard.js";
import Destination from "./models/Destination.js";
import Analytics from "./models/Analytics.js";
import Settings from "./models/Settings.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Dashboard.deleteMany();
    await Destination.deleteMany();
    await Analytics.deleteMany();
    await Settings.deleteMany();

    await Dashboard.create({
      totalVisitors: 12000,
      totalBookings: 340,
      totalRevenue: 850000,
      activeUsers: 150,
    });

    await Destination.insertMany([
      {
        name: "Paris",
        country: "France",
        description: "The city of lights and love.",
        imageUrl: "https://source.unsplash.com/random/300x200?paris",
        rating: 4.8,
        visitors: 3000,
        revenue: 200000,
      },
      {
        name: "Tokyo",
        country: "Japan",
        description: "Modern meets tradition in Tokyo.",
        imageUrl: "https://source.unsplash.com/random/300x200?tokyo",
        rating: 4.6,
        visitors: 2500,
        revenue: 150000,
      },
    ]);

    await Analytics.insertMany([
      { date: new Date("2025-10-01"), visitors: 200, revenue: 5000, bookings: 10 },
      { date: new Date("2025-10-02"), visitors: 250, revenue: 7000, bookings: 15 },
      { date: new Date("2025-10-03"), visitors: 300, revenue: 8500, bookings: 18 },
    ]);

    await Settings.create({
      theme: "dark",
      notificationsEnabled: true,
      language: "en",
    });

    console.log("✅ Sample data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
