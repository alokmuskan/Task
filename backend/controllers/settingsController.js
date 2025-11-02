// backend/controllers/settingsController.js
import Settings from "../models/Settings.js";

// Get user settings
export const getSettings = async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";
    
    let settings = await Settings.findOne({ userId });

    // If no settings in MongoDB, create with your existing defaults
    if (!settings) {
      settings = await Settings.create({
        userId,
        theme: "light",
        notifications: true,
        autoUpdates: true,
        language: "en",
        currency: "USD"
      });
      console.log("Initial settings created in MongoDB");
    }

    // Return in your existing format
    res.status(200).json({ settings });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

// Update user settings
export const updateSettings = async (req, res) => {
  try {
    const userId = req.body.userId || "default_user";
    const { theme, notifications, autoUpdates, language, currency } = req.body;

    // Find and update, or create if doesn't exist
    const settings = await Settings.findOneAndUpdate(
      { userId },
      {
        theme: theme || undefined,
        notifications: notifications ?? undefined,
        autoUpdates: autoUpdates ?? undefined,
        language: language || undefined,
        currency: currency || undefined,
        updatedAt: Date.now()
      },
      { 
        new: true,           // Return updated document
        upsert: true,        // Create if doesn't exist
        runValidators: true, // Run schema validators
        omitUndefined: true  // Don't update undefined fields
      }
    );

    console.log(" Updated Settings:", settings);

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};