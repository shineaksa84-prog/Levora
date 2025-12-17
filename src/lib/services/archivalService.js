/**
 * Candidate Archival Service
 * Manages auto-archival of inactive candidates
 */

const ARCHIVAL_CONFIG = {
    INACTIVITY_DAYS: 90,
    REJECTED_DAYS: 30,
    STAGNANT_DAYS: 60
};

/**
 * Check for candidates that need archiving
 */
export const checkCandidatesForArchival = () => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const today = new Date();

    const candidatesToArchive = candidates.filter(candidate => {
        // Skip already archived
        if (candidate.status === 'Archived') return false;

        const lastActivity = new Date(candidate.lastActivity || candidate.appliedDate);
        const daysSinceActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

        // Criteria 1: Inactive for 90+ days
        if (daysSinceActivity > ARCHIVAL_CONFIG.INACTIVITY_DAYS) return true;

        // Criteria 2: Rejected for 30+ days
        if (candidate.status === 'Rejected') {
            const rejectedDate = new Date(candidate.rejectedDate || candidate.lastActivity);
            const daysSinceRejection = Math.floor((today - rejectedDate) / (1000 * 60 * 60 * 24));
            if (daysSinceRejection > ARCHIVAL_CONFIG.REJECTED_DAYS) return true;
        }

        // Criteria 3: Stuck in same stage for 60+ days (excluding Hired/Rejected)
        if (['Applied', 'Screening', 'Interview', 'Offer'].includes(candidate.status)) {
            const stageDate = new Date(candidate.stageDate || candidate.lastActivity);
            const daysInStage = Math.floor((today - stageDate) / (1000 * 60 * 60 * 24));
            if (daysInStage > ARCHIVAL_CONFIG.STAGNANT_DAYS) return true;
        }

        return false;
    });

    return candidatesToArchive;
};

/**
 * Archive specific candidates
 */
export const archiveCandidates = (candidateIds) => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const archivedCandidates = JSON.parse(localStorage.getItem('archivedCandidates') || '[]');

    const updatedCandidates = candidates.map(candidate => {
        if (candidateIds.includes(candidate.id)) {
            const archivedRecord = {
                ...candidate,
                originalStatus: candidate.status,
                status: 'Archived',
                archivedDate: new Date().toISOString(),
                archivalReason: getArchivalReason(candidate)
            };
            archivedCandidates.push(archivedRecord);
            return archivedRecord;
        }
        return candidate;
    });

    // In a real app, we might move them to a separate collection
    // For now, we'll keep them in main list but marked as Archived
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    localStorage.setItem('archivedCandidates', JSON.stringify(archivedCandidates));

    return candidateIds.length;
};

/**
 * Restore archived candidates
 */
export const restoreCandidates = (candidateIds) => {
    const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');

    const updatedCandidates = candidates.map(candidate => {
        if (candidateIds.includes(candidate.id) && candidate.status === 'Archived') {
            return {
                ...candidate,
                status: candidate.originalStatus || 'Applied',
                lastActivity: new Date().toISOString(),
                restoredDate: new Date().toISOString()
            };
        }
        return candidate;
    });

    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

    // Remove from archived list
    const archivedCandidates = JSON.parse(localStorage.getItem('archivedCandidates') || '[]');
    const remainingArchived = archivedCandidates.filter(c => !candidateIds.includes(c.id));
    localStorage.setItem('archivedCandidates', JSON.stringify(remainingArchived));

    return candidateIds.length;
};

/**
 * Get archival reason helper
 */
const getArchivalReason = (candidate) => {
    const today = new Date();
    const lastActivity = new Date(candidate.lastActivity || candidate.appliedDate);
    const daysSinceActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

    if (candidate.status === 'Rejected') return 'Rejected for > 30 days';
    if (daysSinceActivity > ARCHIVAL_CONFIG.INACTIVITY_DAYS) return 'Inactive for > 90 days';
    return 'Stagnant in stage for > 60 days';
};

/**
 * Get all archived candidates
 */
export const getArchivedCandidates = () => {
    return JSON.parse(localStorage.getItem('archivedCandidates') || '[]');
};
