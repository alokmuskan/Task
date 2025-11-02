import { useEffect, useState } from "react";
import api from "../lib/api";
import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        setSettings(data.settings);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  //  Sync theme changes when context updates
  useEffect(() => {
    if (settings && theme !== settings.theme) {
      setSettings((prev) => ({ ...prev, theme }));
    }
  }, [theme]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newSettings = {
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    };
    setSettings(newSettings);

    //  Update global theme dynamically
    if (name === "theme") {
      setTheme(value);
    }
  };

  const saveSettings = async () => {
    try {
      await api.post("/api/settings", settings);
      alert("Settings updated!");
    } catch (err) {
      console.error("Error updating settings:", err);
      alert("Failed to update settings");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading settings...</p>;

  return (
    <div
      className={`min-h-screen p-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <SettingsIcon className="text-sky-600" /> App Settings
      </h2>

      <motion.div
        className={`p-6 rounded-2xl shadow-md space-y-4 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-300">
            Theme
          </label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg p-2 w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <span>Enable Notifications</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="autoUpdates"
            checked={settings.autoUpdates}
            onChange={handleChange}
          />
          <span>Enable Auto Updates</span>
        </div>

        <button
          onClick={saveSettings}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}
