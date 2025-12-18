/**
 * Candidate Archival Service
 * Manages auto-archival of inactive candidates using Firebase Firestore
 */

import { db } from '../firebase';
import {
    collection,
    getDocs,
    query,
    where,
    writeBatch,
    doc,
    serverTimestamp,
    addDoc,
    deleteDoc
} from 'firebase/firestore';

const ARCHIVAL_CONFIG = {
    INACTIVITY_DAYS: 90,
    REJECTED_DAYS: 30,
    STAGNANT_DAYS: 60
};

const CANDIDATES_COLLECTION = 'candidates';
const ARCHIVED_COLLECTION = 'archived_candidates';

/**
 * Check for candidates that need archiving from Firestore
 */
export const checkCandidatesForArchival = async () => {
    try {
        const snapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
        const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const today = new Date();

        const candidatesToArchive = candidates.filter(candidate => {
            // Skip already archived (though they shouldn't be in this collection if moved)
            if (candidate.status === 'Archived') return false;

            const lastActivityDate = candidate.lastActivity || candidate.appliedDate;
            const lastActivity = lastActivityDate ? new Date(lastActivityDate) : today;
            const daysSinceActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

            // Criteria 1: Inactive for 90+ days
            if (daysSinceActivity > ARCHIVAL_CONFIG.INACTIVITY_DAYS) return true;

            // Criteria 2: Rejected for 30+ days
            if (candidate.status === 'Rejected') {
                const rejectedDateStr = candidate.rejectedDate || candidate.lastActivity;
                const rejectedDate = rejectedDateStr ? new Date(rejectedDateStr) : today;
                const daysSinceRejection = Math.floor((today - rejectedDate) / (1000 * 60 * 60 * 24));
                if (daysSinceRejection > ARCHIVAL_CONFIG.REJECTED_DAYS) return true;
            }

            // Criteria 3: Stuck in same stage for 60+ days (excluding Hired/Rejected)
            if (['Applied', 'Screening', 'Interview', 'Offer'].includes(candidate.status || candidate.stage)) {
                const stageDateStr = candidate.stageDate || candidate.lastActivity;
                const stageDate = stageDateStr ? new Date(stageDateStr) : today;
                const daysInStage = Math.floor((today - stageDate) / (1000 * 60 * 60 * 24));
                if (daysInStage > ARCHIVAL_CONFIG.STAGNANT_DAYS) return true;
            }

            return false;
        });

        return candidatesToArchive;
    } catch (error) {
        console.error('Error checking for candidates to archive:', error);
        return [];
    }
};

/**
 * Archive specific candidates in Firestore
 */
export const archiveCandidates = async (candidateIds) => {
    try {
        const batch = writeBatch(db);
        const today = new Date().toISOString();

        // We need to fetch the candidate data first to move it to archived collection
        // For multiple IDs, we can use query with where('id', 'in', ...) if IDs are small
        // or just fetch all and filter if needed. Let's do individual fetches or a query.

        // Fetch candidates to be archived
        const snapshot = await getDocs(query(collection(db, CANDIDATES_COLLECTION)));
        const candidatesToMove = snapshot.docs
            .filter(doc => candidateIds.includes(doc.id))
            .map(doc => ({ docId: doc.id, data: doc.data() }));

        for (const item of candidatesToMove) {
            const archivedRef = doc(db, ARCHIVED_COLLECTION, item.docId);
            const candidateRef = doc(db, CANDIDATES_COLLECTION, item.docId);

            const archivedRecord = {
                ...item.data,
                originalStatus: item.data.status || item.data.stage || 'Applied',
                status: 'Archived',
                archivedDate: today,
                archivalReason: getArchivalReason(item.data),
                updatedAt: serverTimestamp()
            };

            batch.set(archivedRef, archivedRecord);
            batch.delete(candidateRef);
        }

        await batch.commit();
        return candidatesToMove.length;
    } catch (error) {
        console.error('Error archiving candidates:', error);
        throw error;
    }
};

/**
 * Restore archived candidates in Firestore
 */
export const restoreCandidates = async (candidateIds) => {
    try {
        const batch = writeBatch(db);
        const today = new Date().toISOString();

        // Fetch from archived collection
        const snapshot = await getDocs(query(collection(db, ARCHIVED_COLLECTION)));
        const archivedToMove = snapshot.docs
            .filter(doc => candidateIds.includes(doc.id))
            .map(doc => ({ docId: doc.id, data: doc.data() }));

        for (const item of archivedToMove) {
            const candidateRef = doc(db, CANDIDATES_COLLECTION, item.docId);
            const archivedRef = doc(db, ARCHIVED_COLLECTION, item.docId);

            const restoredRecord = {
                ...item.data,
                status: item.data.originalStatus || 'Applied',
                lastActivity: today,
                restoredDate: today,
                updatedAt: serverTimestamp()
            };

            // Remove archival specific fields
            delete restoredRecord.originalStatus;
            delete restoredRecord.archivedDate;
            delete restoredRecord.archivalReason;

            batch.set(candidateRef, restoredRecord);
            batch.delete(archivedRef);
        }

        await batch.commit();
        return archivedToMove.length;
    } catch (error) {
        console.error('Error restoring candidates:', error);
        throw error;
    }
};

/**
 * Get archival reason helper
 */
const getArchivalReason = (candidate) => {
    const today = new Date();
    const lastActivityDate = candidate.lastActivity || candidate.appliedDate;
    const lastActivity = lastActivityDate ? new Date(lastActivityDate) : today;
    const daysSinceActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

    if (candidate.status === 'Rejected') return 'Rejected for > 30 days';
    if (daysSinceActivity > ARCHIVAL_CONFIG.INACTIVITY_DAYS) return 'Inactive for > 90 days';
    return 'Stagnant in stage for > 60 days';
};

/**
 * Get all archived candidates from Firestore
 */
export const getArchivedCandidates = async () => {
    try {
        const snapshot = await getDocs(collection(db, ARCHIVED_COLLECTION));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching archived candidates:', error);
        return [];
    }
};
