// src/store/useDashboardStore.js
import { create } from "zustand";
import api from "../lib/api"; // <-- new

export const useDashboardStore = create((set, get) => {
  // (keep your existing initial state here, e.g. statsData, chartData, tourismInsights, etc.)
  const initialStats = {
    totalVisitors: 24320,
    topDestination: "Bihar",
    revenue: 52430,
    activeRegions: 18,
  };

  const initialChartData = {
    line: [
      { date: "Jan", value: 120 }, { date: "Feb", value: 200 }, { date: "Mar", value: 180 },
      { date: "Apr", value: 260 }, { date: "May", value: 300 }, { date: "Jun", value: 350 },
      { date: "Jul", value: 420 }, { date: "Aug", value: 460 }, { date: "Sep", value: 500 },
      { date: "Oct", value: 550 }, { date: "Nov", value: 600 }, { date: "Dec", value: 650 },
    ],
    bar: [
      { month: "Jan", revenue: 4000 },
      { month: "Feb", revenue: 3000 },
      { month: "Mar", revenue: 5000 },
      { month: "Apr", revenue: 4500 },
      { month: "May", revenue: 6000 },
    ],
    pie: [
      { name: "Beaches", value: 400 },
      { name: "Mountains", value: 300 },
      { name: "Historical Sites", value: 300 },
      { name: "Adventure Sports", value: 200 },
    ],
  };

  const initialTourismInsights = {
    satisfactionRate: 92,
    avgStayDuration: 4.5,
    mostVisitedCity: "Jaipur",
    ecoFriendlyTours: 35,
  };

  return {
    selectedLocation: "India",
    statsData: { ...initialStats },
    chartData: JSON.parse(JSON.stringify(initialChartData)),
    tourismInsights: { ...initialTourismInsights },

    // existing actions you already have (refreshStats, resetTourismInsights etc.)
    setLocation: (location) => set({ selectedLocation: location }),

    refreshStats: () =>
      set((state) => {
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min;

        const newStats = {
          totalVisitors: random(20000, 50000),
          topDestination: ["Bali", "Paris", "Tokyo", "Maldives", "New York"][
            random(0, 4)
          ],
          revenue: random(30000, 80000),
          activeRegions: random(10, 30),
        };

        const newLine = state.chartData.line.map((d) => ({
          ...d,
          value: random(100, 700),
        }));

        const newBar = state.chartData.bar.map((d) => ({
          ...d,
          revenue: random(3000, 9000),
        }));

        const newPie = state.chartData.pie.map((d) => ({
          ...d,
          value: random(150, 500),
        }));

        return {
          statsData: newStats,
          chartData: { line: newLine, bar: newBar, pie: newPie },
        };
      }),

    resetTourismInsights: () =>
      set({
        statsData: { ...initialStats },
        chartData: JSON.parse(JSON.stringify(initialChartData)),
        tourismInsights: { ...initialTourismInsights },
      }),

    // ---------- NEW: server loaders ----------
    // Fetch dashboard/stats data from backend
    loadDashboardFromServer: async () => {
      try {
        // hit your backend dashboard route (create it in backend if not present)
        const { data } = await api.get("/api/dashboard");
        // expected shape: { statsData: {...}, chartData: {...} }
        if (data?.statsData || data?.chartData) {
          set({
            statsData: data.statsData || get().statsData,
            chartData: data.chartData || get().chartData,
          });
        }
        return true;
      } catch (err) {
        console.error("loadDashboardFromServer error:", err);
        return false;
      }
    },

    // Fetch analytics (or alternate endpoint) - for example /api/analytics
    loadAnalyticsFromServer: async () => {
      try {
        const { data } = await api.get("/api/analytics");
        // adapt this depending on your backend shape
        // e.g. data might return { visitorsByYear, chartData }
        if (data?.chartData) {
          set({ chartData: data.chartData });
        } else if (data?.visitorsByYear) {
          // optional mapping: convert visitorsByYear -> chartData.line
          const mapped = (data.visitorsByYear || []).map((d) => ({
            date: d.year.toString(),
            value: d.visitors,
          }));
          set((s) => ({ chartData: { ...s.chartData, line: mapped } }));
        }
        return true;
      } catch (err) {
        console.error("loadAnalyticsFromServer error:", err);
        return false;
      }
    },
  };
});
