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
        jobs: { success: 0, failed: 0 }
    };

    try {
        const batch = writeBatch(db);
        let operationCount = 0;
        const BATCH_LIMIT = 450; // Firestore limit is 500

        // 1. Migrate Candidates
        const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        if (candidates.length > 0) {
            // Check if collection is empty to avoid duplicates (naive check)
            const snapshot = await getDocs(collection(db, 'candidates'));
            if (snapshot.empty) {
                candidates.forEach(candidate => {
                    const docRef = doc(collection(db, 'candidates')); // Auto-ID
                    // Or use existing ID: doc(db, 'candidates', String(candidate.id))
                    // Let's preserve IDs if possible, but they are likely simple numbers '1', '2'.
                    // Better to let Firestore generate IDs and store 'localId' for mapping if needed.
                    // Actually, if we want to preserve relationships (referrerId), we should try to keep IDs or map them.
                    // For simplicity in this migration, let's assume we can re-use the ID if it's a string, 
                    // or just dump it as is.
                    // The existing IDs are likely numbers (1, 2) or 'EMP...' strings.

                    const newRef = doc(db, 'candidates', String(candidate.id));
                    batch.set(newRef, candidate);
                    results.candidates.success++;
                    operationCount++;
                });
            } else {
                console.warn('Candidates collection not empty, skipping migration to avoid duplicates');
            }
        }

        // 2. Migrate Jobs (if any local jobs exist - usually hardcoded in this app but let's check)
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        if (jobs.length > 0) {
            jobs.forEach(job => {
                const newRef = doc(db, 'jobs', String(job.id));
                batch.set(newRef, job);
                results.jobs.success++;
                operationCount++;
            });
        }

        // 3. Migrate Employees (if any)
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        if (employees.length > 0) {
            employees.forEach(emp => {
                const newRef = doc(db, 'employees', String(emp.id)); // Use employee ID as doc ID
                batch.set(newRef, emp);
                results.employees.success++;
                operationCount++;
            });
        }

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
