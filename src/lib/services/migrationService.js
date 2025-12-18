/**
 * Migration Service
 * Handles migrating data from localStorage to Firebase Firestore
 */
import { db } from '../firebase';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';

export const migrateToCloud = async () => {
    const results = {
        candidates: { success: 0, failed: 0 },
        employees: { success: 0, failed: 0 },
        jobs: { success: 0, failed: 0 },
        notifications: { success: 0, failed: 0 },
        metrics: { success: 0, failed: 0 },
        archived: { success: 0, failed: 0 }
    };

    try {
        const batch = writeBatch(db);
        let operationCount = 0;
        const BATCH_LIMIT = 450; // Firestore limit is 500

        // Helper to check and add to batch
        const addToBatch = (items, collectionName, resultKey) => {
            if (items.length > 0) {
                items.forEach(item => {
                    if (operationCount < BATCH_LIMIT) {
                        const docId = String(item.id || item.employeeId || Math.random().toString(36).substr(2, 9));
                        const newRef = doc(db, collectionName, docId);
                        batch.set(newRef, item);
                        results[resultKey].success++;
                        operationCount++;
                    }
                });
            }
        };

        // 1. Migrate Candidates (Only if empty to avoid duplicates)
        const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        const candSnapshot = await getDocs(collection(db, 'candidates'));
        if (candSnapshot.empty) {
            addToBatch(candidates, 'candidates', 'candidates');
        }

        // 2. Migrate Jobs
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const jobsSnapshot = await getDocs(collection(db, 'jobs'));
        if (jobsSnapshot.empty) {
            addToBatch(jobs, 'jobs', 'jobs');
        }

        // 3. Migrate Employees
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const empSnapshot = await getDocs(collection(db, 'employees'));
        if (empSnapshot.empty) {
            addToBatch(employees, 'employees', 'employees');
        }

        // 4. Migrate Notifications
        const notifications = JSON.parse(localStorage.getItem('user_notifications') || '[]');
        addToBatch(notifications, 'user_notifications', 'notifications');

        // 5. Migrate Applicant Metrics
        const metrics = JSON.parse(localStorage.getItem('applicantMetrics') || '[]');
        addToBatch(metrics, 'applicant_metrics', 'metrics');

        // 6. Migrate Archived Candidates
        const archived = JSON.parse(localStorage.getItem('archivedCandidates') || '[]');
        addToBatch(archived, 'archived_candidates', 'archived');

        // Commit if there are operations
        if (operationCount > 0) {
            await batch.commit();
        }

        return { success: true, results };

    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, error: error.message };
    }
};
