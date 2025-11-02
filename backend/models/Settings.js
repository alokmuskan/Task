// backend/models/Settings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  theme: { type: String, default: "light" },
  notifications: { type: Boolean, default: true },
  autoUpdates: { type: Boolean, default: true },
  language: { type: String, default: "en" },
  currency: { type: String, default: "USD" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Settings", settingsSchema);