import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useStore = create(subscribeWithSelector((set, get) => ({
    // --- Dashboard Stats ---
    dashboardStats: [],
    setDashboardStats: (stats) => set({ dashboardStats: stats }),

    // --- User Profile ---
    userProfile: null,
    setUserProfile: (profile) => set({ userProfile: profile }),

    // --- Real-time Activity ---
    recentActivities: [],
    addActivity: (activity) => set((state) => ({
        recentActivities: [activity, ...state.recentActivities].slice(0, 10)
    })),
    setRecentActivities: (activities) => set({ recentActivities: activities }),

    // --- Notifications ---
    notifications: [],
    addNotification: (notification) => {
        const id = Date.now();
        set((state) => ({
            notifications: [...state.notifications, { ...notification, id }]
        }));
        // Auto-remove after 5 seconds
        setTimeout(() => {
            get().removeNotification(id);
        }, 5000);
    },
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
    })),

    // --- Real-time Metrics ---
    metrics: {
        humanCapitalBase: 0,
        activeCandidates: 0,
        strategicOpenings: 0,
        acquisitionVelocity: '0 Days'
    },
    updateMetrics: (newMetrics) => set((state) => ({
        metrics: { ...state.metrics, ...newMetrics }
    })),

    // --- Global Communication ---
    globalBroadcast: null,
    setGlobalBroadcast: (broadcast) => set({ globalBroadcast: broadcast })
})));

export default useStore;
