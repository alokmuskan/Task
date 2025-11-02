// src/store/useDashboardStore.js
import { create } from "zustand";
import api from "../lib/api";

export const useDashboardStore = create((set, get) => {
  // ---------- INITIAL STATE ----------
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

  // ---------- STORE ----------
  return {
    selectedLocation: "India",
    statsData: { ...initialStats },
    chartData: JSON.parse(JSON.stringify(initialChartData)),
    tourismInsights: { ...initialTourismInsights },
    isLoading: false,
    error: null,

    // ---------- ACTIONS ----------

    // Update selected location
    setLocation: (location) => set({ selectedLocation: location }),

    // Random refresh for demo (works for UI refresh)
    refreshStats: async () => {
      try {
        set({ isLoading: true, error: null });
        
        // Call backend refresh endpoint
        const { data } = await api.post("/api/dashboard/refresh");
        
        if (data?.statsData) {
          set({ 
            statsData: data.statsData,
            isLoading: false 
          });
        } else {
          // Fallback to client-side random refresh
          const random = (min, max) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

          const newStats = {
            totalVisitors: random(20000, 50000),
            topDestination: ["Bali", "Paris", "Tokyo", "Maldives", "New York"][random(0, 4)],
            revenue: random(30000, 80000),
            activeRegions: random(10, 30),
          };

          const newLine = get().chartData.line.map((d) => ({
            ...d,
            value: random(100, 700),
          }));

          const newBar = get().chartData.bar.map((d) => ({
            ...d,
            revenue: random(3000, 9000),
          }));

          const newPie = get().chartData.pie.map((d) => ({
            ...d,
            value: random(150, 500),
          }));

          set({
            statsData: newStats,
            chartData: { line: newLine, bar: newBar, pie: newPie },
            isLoading: false,
          });
        }
      } catch (err) {
        console.error("refreshStats error:", err);
        
        // Fallback to client-side refresh on error
        const random = (min, max) =>
          Math.floor(Math.random() * (max - min + 1)) + min;

        const newStats = {
          totalVisitors: random(20000, 50000),
          topDestination: ["Bali", "Paris", "Tokyo", "Maldives", "New York"][random(0, 4)],
          revenue: random(30000, 80000),
          activeRegions: random(10, 30),
        };

        set({ 
          statsData: newStats,
          isLoading: false,
          error: err.message 
        });
      }
    },

    // Reset to initial state
    resetTourismInsights: () => {
      set({
        statsData: { ...initialStats },
        chartData: JSON.parse(JSON.stringify(initialChartData)),
        tourismInsights: { ...initialTourismInsights },
        error: null,
      });

      // Visual reset with small delay
      setTimeout(() => {
        set({
          statsData: { ...initialStats },
          chartData: JSON.parse(JSON.stringify(initialChartData)),
          tourismInsights: { ...initialTourismInsights },
        });
      }, 50);
    },

    // ---------- SERVER LOADERS ----------
    loadDashboardFromServer: async () => {
      try {
        set({ isLoading: true, error: null });
        
        const { data } = await api.get("/api/dashboard");
        
        if (data?.statsData || data?.chartData) {
          // Transform backend data to match your format if needed
          const transformedChartData = data.chartData ? {
            line: data.chartData.line?.map(item => ({
              date: item.month || item.date,
              value: item.visitors || item.value
            })) || get().chartData.line,
            bar: data.chartData.bar || get().chartData.bar,
            pie: data.chartData.pie || get().chartData.pie,
          } : get().chartData;

          set({
            statsData: data.statsData || get().statsData,
            chartData: transformedChartData,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
        return true;
      } catch (err) {
        console.error("loadDashboardFromServer error:", err);
        set({ 
          isLoading: false, 
          error: err.message 
        });
        return false;
      }
    },

    loadAnalyticsFromServer: async () => {
      try {
        set({ isLoading: true, error: null });
        
        const { data } = await api.get("/api/analytics");

        if (data?.analytics?.monthlyStats) {
          // Transform analytics data to your line chart format
          const mapped = data.analytics.monthlyStats.map((d) => ({
            date: d.month,
            value: d.bookings,
          }));
          
          set((s) => ({ 
            chartData: { ...s.chartData, line: mapped },
            isLoading: false,
          }));
        } else if (data?.chartData) {
          set({ 
            chartData: data.chartData,
            isLoading: false,
          });
        } else if (data?.visitorsByYear) {
          const mapped = data.visitorsByYear.map((d) => ({
            date: d.year.toString(),
            value: d.visitors,
          }));
          set((s) => ({ 
            chartData: { ...s.chartData, line: mapped },
            isLoading: false,
          }));
        } else {
          set({ isLoading: false });
        }
        return true;
      } catch (err) {
        console.error("loadAnalyticsFromServer error:", err);
        set({ 
          isLoading: false, 
          error: err.message 
        });
        return false;
      }
    },
  };
});