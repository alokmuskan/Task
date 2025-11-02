import { Search, Bell, User, Sun, Moon, X, Download, FileText, Image as ImageIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import domtoimage from "dom-to-image"; // Better library for modern CSS
import jsPDF from "jspdf";

export default function Topbar() {
  // ========== STATE MANAGEMENT ==========
  const { theme, setTheme } = useTheme(); // Get current theme (dark/light) and setter function
  const { searchQuery, setSearchQuery } = useSearch(); // Get search query from context
  const [query, setQuery] = useState(searchQuery || ""); // Local state for search input
  const [showExportMenu, setShowExportMenu] = useState(false); // Toggle export dropdown menu
  const [isExporting, setIsExporting] = useState(false); // Track export progress (loading state)

  // ========== THEME TOGGLE HANDLER ==========
  /**
   * Toggles between dark and light theme
   * - Updates theme in context
   * - Saves preference to localStorage
   * - Updates document class for global dark mode styling
   */
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Update context
    localStorage.setItem("theme", newTheme); // Persist theme preference
    document.documentElement.classList.toggle("dark", newTheme === "dark"); // Apply dark class to <html>
  };

  // ========== SEARCH HANDLERS ==========
  /**
   * Handles search input changes
   * - Updates local query state
   * - Updates global search context
   * - Dispatches custom event for components to listen to search changes
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update local input value
    setSearchQuery(value); // Update global search context
    // Dispatch custom event that other components (Dashboard, TouristStats) can listen to
    window.dispatchEvent(
      new CustomEvent("searchDestination", { detail: value })
    );
  };

  /**
   * Clears the search input and resets filtered data
   * - Resets local and global search states
   * - Dispatches empty search event to restore original data
   */
  const handleClearSearch = () => {
    setQuery(""); // Clear local input
    setSearchQuery(""); // Clear global search
    window.dispatchEvent(new CustomEvent("searchDestination", { detail: "" })); // Reset filters
  };

  // ========== EXPORT TO PDF HANDLER (Using dom-to-image) ==========
  /**
   * Exports the dashboard to a PDF file using dom-to-image library
   * This library handles modern CSS (oklch, color-mix, etc.) much better
   * Process:
   * 1. Captures the main content area as PNG data URL
   * 2. Creates a PDF document with the image
   * 3. Auto-downloads the PDF with timestamp in filename
   */
  const exportToPDF = async () => {
    setIsExporting(true); // Show loading state
    setShowExportMenu(false); // Close dropdown menu
    
    try {
      // Step 1: Select the main content area (excludes sidebar and topbar)
      const element = document.querySelector("main");
      
      if (!element) {
        throw new Error("Main content not found");
      }

      // Step 2: Convert the element to a PNG image using dom-to-image
      // This library handles modern CSS functions like oklch() properly
      const dataUrl = await domtoimage.toPng(element, {
        quality: 0.95, // High quality image
        bgcolor: theme === "dark" ? "#111827" : "#ffffff", // Match theme background
        style: {
          transform: "scale(1)", // Ensure no scaling issues
          transformOrigin: "top left"
        }
      });

      // Step 3: Create an image object to get dimensions
      const img = new Image();
      img.src = dataUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Step 4: Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px",
        format: [img.width, img.height]
      });

      // Step 5: Add the image to PDF
      pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
      
      // Step 6: Download PDF with timestamp (e.g., tourism-dashboard-2025-11-02.pdf)
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`tourism-dashboard-${timestamp}.pdf`);
      
      console.log("✅ PDF exported successfully!");
    } catch (error) {
      console.error("❌ Error exporting to PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false); // Reset loading state
    }
  };

  // ========== EXPORT TO IMAGE HANDLER (Using dom-to-image) ==========
  /**
   * Exports the dashboard to a PNG image file using dom-to-image
   * Process:
   * 1. Converts the main content to a blob (binary image data)
   * 2. Creates a download link and triggers download
   * 3. Auto-downloads the image with timestamp in filename
   */
  const exportToImage = async () => {
    setIsExporting(true); // Show loading state
    setShowExportMenu(false); // Close dropdown menu
    
    try {
      // Step 1: Select the main content area
      const element = document.querySelector("main");
      
      if (!element) {
        throw new Error("Main content not found");
      }

      // Step 2: Convert element to blob using dom-to-image
      const blob = await domtoimage.toBlob(element, {
        quality: 0.95, // High quality
        bgcolor: theme === "dark" ? "#111827" : "#ffffff", // Match theme
        style: {
          transform: "scale(1)",
          transformOrigin: "top left"
        }
      });

      // Step 3: Create download link and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `tourism-dashboard-${timestamp}.png`;
      link.href = url;
      link.click();
      
      // Clean up: revoke the temporary URL to free memory
      URL.revokeObjectURL(url);
      console.log("✅ Image exported successfully!");
    } catch (error) {
      console.error("❌ Error exporting to image:", error);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false); // Reset loading state
    }
  };

  // ========== COMPONENT RENDER ==========
  return (
    <header
      className={`flex items-center justify-between border-b px-8 py-4 sticky top-0 z-50 shadow-sm transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      {/* ========== SEARCH BAR ========== */}
      <div
        className={`flex items-center w-1/3 min-w-[300px] rounded-xl px-4 py-2.5 border focus-within:ring-2 transition-all duration-200 relative
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200 focus-within:ring-sky-600"
              : "bg-gray-50 border-gray-300 text-gray-700 focus-within:ring-sky-400"
          }`}
      >
        {/* Search Icon */}
        <Search
          size={20}
          className={`mr-3 flex-shrink-0 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        />
        
        {/* Search Input Field */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search destinations, metrics..."
          className={`bg-transparent w-full outline-none placeholder:text-gray-400 text-sm ${
            theme === "dark" ? "text-gray-100" : "text-gray-700"
          }`}
        />
        
        {/* Clear Search Button (only shows when there's text) */}
        {query && (
          <button
            onClick={handleClearSearch}
            className={`absolute right-3 transition hover:scale-110 ${
              theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ========== ACTION BUTTONS (Export / Refresh / Theme) ========== */}
      <div className="flex items-center gap-80">
        
        {/* ===== EXPORT BUTTON WITH DROPDOWN ===== */}
        <div className="relative">
          {/* Export Button - Opens dropdown menu */}
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting} // Disable while exporting
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${
                isExporting
                  ? "opacity-50 cursor-not-allowed" // Dimmed when loading
                  : theme === "dark"
                  ? "bg-sky-700 hover:bg-sky-600 hover:shadow-lg text-white"
                  : "bg-sky-500 hover:bg-sky-600 hover:shadow-lg text-white"
              }`}
          >
            <Download size={18} className="flex-shrink-0" />
            <span>{isExporting ? "Exporting..." : "Export"}</span>
          </button>

          {/* Export Dropdown Menu - Shows PDF and Image options */}
          {showExportMenu && (
            <div
              className={`absolute top-full mt-2 right-0 rounded-xl shadow-xl border overflow-hidden z-50 min-w-[180px]
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
            >
              {/* Export as PDF Option */}
              <button
                onClick={exportToPDF}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <FileText size={18} className="text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium">Export as PDF</span>
              </button>
              
              {/* Export as Image Option */}
              <button
                onClick={exportToImage}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <ImageIcon size={18} className="text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium">Export as Image</span>
              </button>
            </div>
          )}
        </div>

        {/* ===== REFRESH BUTTON ===== */}
        {/* <button
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all
            ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
        >
          Refresh
        </button> */}
        
        {/* ===== THEME TOGGLE BUTTON ===== */}
        <button
          onClick={handleThemeToggle}
          className={`p-2.5 rounded-xl transition-all ${
            theme === "dark" 
              ? "hover:bg-gray-800 border border-gray-700" 
              : "hover:bg-gray-100 border border-gray-200"
          }`}
          aria-label="Toggle theme"
        >
          {/* Show Sun icon in dark mode, Moon icon in light mode */}
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* ========== NOTIFICATIONS & PROFILE ========== */}
      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        <button
          className={`p-2.5 rounded-xl transition-all relative ${
            theme === "dark" 
              ? "hover:bg-gray-800 border border-gray-700" 
              : "hover:bg-gray-100 border border-gray-200"
          }`}
          aria-label="Notifications"
        >
          <Bell
            size={20}
            className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          />
          {/* Notification Badge (optional) */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Section */}
        <div className={`flex items-center gap-5 pl-4 border-l ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          {/* Avatar with initials */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
              ${
                theme === "dark"
                  ? "bg-sky-700 text-white"
                  : "bg-sky-600 text-white"
              }`}
          >
            AR
          </div>
          
          {/* Admin label and icon (hidden on small screens) */}
          <div className="hidden sm:flex items-center gap-5">
            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}>
                Admin
              </span>
              <span className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                Super Admin
              </span>
            </div>
            <User
              size={20}
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* ========== CLICK OUTSIDE TO CLOSE EXPORT MENU ========== */}
      {/* Invisible overlay that closes dropdown when clicked */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </header>
  );
}