// backend/controllers/settingsController.js
let settings = {
  theme: "light",
  notifications: true,
  autoUpdates: true,
};

export const getSettings = async (req, res) => {
  try {
    res.status(200).json({ settings });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { theme, notifications, autoUpdates } = req.body;

    settings = {
      theme: theme || settings.theme,
      notifications: notifications ?? settings.notifications,
      autoUpdates: autoUpdates ?? settings.autoUpdates,
    };

    console.log("✅ Updated Settings:", settings);

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};
