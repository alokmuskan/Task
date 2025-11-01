import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    theme: { type: String, default: "light" },
    notificationsEnabled: { type: Boolean, default: true },
    language: { type: String, default: "en" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
