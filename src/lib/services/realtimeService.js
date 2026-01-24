import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy, limit, doc } from 'firebase/firestore';
import useStore from '../store/useStore';

/**
 * Service to manage real-time subscriptions and sync them with the global store.
 */
class RealtimeService {
    constructor() {
        this.unsubscribeFunctions = {};
    }

    /**
     * Starts listening to core metrics and updates the store accordingly.
     */
    initMetricsListeners() {
        console.log('[RealtimeService] Initializing Neural Listeners...');

        // 1. Listen to Active Employees
        this.unsubscribeFunctions.employees = onSnapshot(
            query(collection(db, 'employees'), where('status', '==', 'Active')),
            (snapshot) => {
                const count = snapshot.size;
                useStore.getState().updateMetrics({ humanCapitalBase: count });
                console.log(`[RealtimeService] Sync: Human Capital Base = ${count}`);
            }
        );

        // 2. Listen to Active Candidates
        this.unsubscribeFunctions.candidates = onSnapshot(
            query(collection(db, 'candidates'), where('stage', 'not-in', ['Rejected', 'Hired'])),
            (snapshot) => {
                const count = snapshot.size;
                useStore.getState().updateMetrics({ activeCandidates: count });
            }
        );

        // 3. Listen to Strategic Openings
        this.unsubscribeFunctions.jobs = onSnapshot(
            query(collection(db, 'jobs'), where('status', '==', 'Active')),
            (snapshot) => {
                const count = snapshot.size;
                useStore.getState().updateMetrics({ strategicOpenings: count });
            }
        );

        // 4. Listen to Recent Activities
        this.unsubscribeFunctions.activities = onSnapshot(
            query(collection(db, 'activities'), orderBy('timestamp', 'desc'), limit(10)),
            (snapshot) => {
                const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                useStore.getState().setRecentActivities(activities);

                // Optional: Push a notification for very recent activities
                const latest = activities[0];
                if (latest && (Date.now() - latest.timestamp?.toMillis() < 5000)) {
                    useStore.getState().addNotification({
                        title: 'Ecosystem Event',
                        message: `${latest.user} ${latest.action} ${latest.target}`,
                        type: 'info'
                    });
                }
            }
        );

        // 5. Listen to Global Broadcasts
        this.unsubscribeFunctions.broadcast = onSnapshot(
            doc(db, 'system', 'broadcast'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    if (data.active) {
                        useStore.getState().setGlobalBroadcast(data);
                        useStore.getState().addNotification({
                            title: 'System Pulse',
                            message: data.message,
                            type: 'warning'
                        });
                    }
                }
            }
        );
    }

    /**
     * Stop all active listeners.
     */
    cleanup() {
        Object.values(this.unsubscribeFunctions).forEach(unsub => unsub());
        this.unsubscribeFunctions = {};
    }
}

export const realtimeService = new RealtimeService();
export default realtimeService;
