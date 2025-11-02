import { Search, Bell, User, Sun, Moon, X, Download, FileText, Image as ImageIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import html2canvas from "html2canvas"; // Library to capture DOM elements as images
import jsPDF from "jspdf"; // Library to generate PDF files

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

  // ========== EXPORT TO PDF HANDLER ==========
  /**
   * Exports the dashboard to a PDF file
   * Process:
   * 1. Captures the main content area as a canvas (screenshot)
   * 2. Converts canvas to image data
   * 3. Creates a PDF document with the image
   * 4. Auto-downloads the PDF with timestamp in filename
   */
  const exportToPDF = async () => {
    setIsExporting(true); // Show loading state
    setShowExportMenu(false); // Close dropdown menu
    
    try {
      // Step 1: Select the main content area (excludes sidebar and topbar)
      const element = document.querySelector("main") || document.body;
      
      // Step 2: Capture the element as a high-quality canvas
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution for better quality
        useCORS: true, // Allow cross-origin images
        logging: false, // Disable console logs
        backgroundColor: theme === "dark" ? "#111827" : "#ffffff", // Match theme background
      });

      // Step 3: Convert canvas to PNG image data
      const imgData = canvas.toDataURL("image/png");
      
      // Step 4: Create PDF with dimensions matching the canvas
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait", // Auto-detect orientation
        unit: "px", // Use pixels as unit
        format: [canvas.width, canvas.height], // Match canvas dimensions
      });

      // Step 5: Add the captured image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      
      // Step 6: Download PDF with timestamp (e.g., tourism-dashboard-2025-11-02.pdf)
      const timestamp = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      pdf.save(`tourism-dashboard-${timestamp}.pdf`);
      
      console.log("✅ PDF exported successfully!");
    } catch (error) {
      console.error("❌ Error exporting to PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false); // Reset loading state
    }
  };

  // ========== EXPORT TO IMAGE HANDLER ==========
  /**
   * Exports the dashboard to a PNG image file
   * Process:
   * 1. Captures the main content area as a canvas
   * 2. Converts canvas to a blob (binary data)
   * 3. Creates a download link and triggers download
   * 4. Auto-downloads the image with timestamp in filename
   */
  const exportToImage = async () => {
    setIsExporting(true); // Show loading state
    setShowExportMenu(false); // Close dropdown menu
    
    try {
      // Step 1: Select the main content area
      const element = document.querySelector("main") || document.body;
      
      // Step 2: Capture the element as a high-quality canvas
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution for crisp images
        useCORS: true, // Allow cross-origin images
        logging: false, // Disable console logs
        backgroundColor: theme === "dark" ? "#111827" : "#ffffff", // Match theme background
      });

      // Step 3: Convert canvas to blob and trigger download
      canvas.toBlob((blob) => {
        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a hidden download link
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        link.download = `tourism-dashboard-${timestamp}.png`; // Set filename
        link.href = url; // Set download URL
        link.click(); // Trigger download
        
        // Clean up: revoke the temporary URL to free memory
        URL.revokeObjectURL(url);
        console.log("✅ Image exported successfully!");
      });
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
      className={`flex items-center justify-between border-b px-6 py-4 sticky top-0 z-50 shadow-sm transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
    >
      {/* ========== SEARCH BAR ========== */}
      <div
        className={`flex items-center w-1/3 rounded-xl px-3 py-2 border focus-within:ring-2 transition-all duration-200 relative
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200 focus-within:ring-sky-600"
              : "bg-gray-50 border-gray-300 text-gray-700 focus-within:ring-sky-400"
          }`}
      >
        {/* Search Icon */}
        <Search
          size={18}
          className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        />
        
        {/* Search Input Field */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search destinations, metrics..."
          className={`bg-transparent w-full outline-none placeholder:text-gray-400 ${
            theme === "dark" ? "text-gray-100" : "text-gray-700"
          }`}
        />
        
        {/* Clear Search Button (only shows when there's text) */}
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ========== ACTION BUTTONS (Export / Refresh / Theme) ========== */}
      <div className="flex gap-3 relative">
        
        {/* ===== EXPORT BUTTON WITH DROPDOWN ===== */}
        <div className="relative">
          {/* Export Button - Opens dropdown menu */}
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting} // Disable while exporting
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition
              ${
                isExporting
                  ? "opacity-50 cursor-not-allowed" // Dimmed when loading
                  : theme === "dark"
                  ? "bg-sky-700 hover:bg-sky-600 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export"}
          </button>

          {/* Export Dropdown Menu - Shows PDF and Image options */}
          {showExportMenu && (
            <div
              className={`absolute top-full mt-2 right-0 rounded-xl shadow-lg border overflow-hidden z-50 min-w-[160px]
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
            >
              {/* Export as PDF Option */}
              <button
                onClick={exportToPDF}
                className={`w-full flex items-center gap-3 px-4 py-3 transition
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <FileText size={16} className="text-red-500" />
                <span className="text-sm font-medium">Export as PDF</span>
              </button>
              
              {/* Export as Image Option */}
              <button
                onClick={exportToImage}
                className={`w-full flex items-center gap-3 px-4 py-3 transition
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <ImageIcon size={16} className="text-blue-500" />
                <span className="text-sm font-medium">Export as Image</span>
              </button>
            </div>
          )}
        </div>

        {/* ===== REFRESH BUTTON ===== */}
        <button
          className={`px-4 py-2 rounded-xl transition
            ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Refresh
        </button>
        
        {/* ===== THEME TOGGLE BUTTON ===== */}
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded-md transition ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          aria-label="Toggle theme"
        >
          {/* Show Sun icon in dark mode, Moon icon in light mode */}
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* ========== NOTIFICATIONS & PROFILE ========== */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className={`p-2 rounded-md transition ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          aria-label="Notifications"
        >
          <Bell
            size={18}
            className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold 
              ${
                theme === "dark"
                  ? "bg-sky-700 text-white"
                  : "bg-sky-600 text-white"
              }`}
          >
            AR
          </div>
          
          {/* Admin label (hidden on small screens) */}
          <span
            className={`hidden sm:inline text-sm font-medium ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Admin
          </span>
          
          {/* User icon (hidden on small screens) */}
          <User
            size={18}
            className={`hidden sm:inline ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
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