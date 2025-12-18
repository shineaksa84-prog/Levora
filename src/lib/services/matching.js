import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { geminiService } from '../ai/gemini';

/**
 * Candidate Matching Service
 * Semantic matching between candidates and jobs
 */
class MatchingService {
    constructor() {
        this.matchesCollection = 'matches';
    }

    /**
     * Match a single candidate to a job
     */
    async matchCandidateToJob(candidateId, jobId) {
        try {
            // Fetch candidate and job data (mock for now)
            const candidateProfile = await this.getCandidateProfile(candidateId);
            const jobRequirements = await this.getJobRequirements(jobId);

            // Use Gemini for semantic matching
            const matchResult = await geminiService.matchCandidateToJob(
                candidateProfile,
                jobRequirements
            );

            // Store match result
            const matchData = {
                candidateId,
                jobId,
                ...matchResult,
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, this.matchesCollection), matchData);

            return {
                success: true,
                matchId: docRef.id,
                ...matchResult
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Match candidate to all open jobs
     */
    async matchCandidateToAllJobs(candidateId) {
        try {
            const openJobs = await this.getOpenJobs();
            const matches = [];

            for (const job of openJobs) {
                const match = await this.matchCandidateToJob(candidateId, job.id);
                if (match.success) {
                    matches.push({
                        jobId: job.id,
                        jobTitle: job.title,
                        ...match
                    });
                }
            }

            // Sort by match score
            matches.sort((a, b) => b.overallScore - a.overallScore);

            return {
                success: true,
                matches,
                topMatch: matches[0] || null
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Find best candidates for a job
     */
    async findBestCandidatesForJob(jobId, limit = 10) {
        try {
            const candidates = await this.getAllCandidates();
            const matches = [];

            for (const candidate of candidates) {
                const match = await this.matchCandidateToJob(candidate.id, jobId);
                if (match.success) {
                    matches.push({
                        candidateId: candidate.id,
                        candidateName: candidate.name,
                        ...match
                    });
                }
            }

            // Sort by match score and limit
            matches.sort((a, b) => b.overallScore - a.overallScore);

            return {
                success: true,
                matches: matches.slice(0, limit)
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Get stored matches for a candidate
     */
    async getCandidateMatches(candidateId) {
        try {
            const q = query(
                collection(db, this.matchesCollection),
                where('candidateId', '==', candidateId)
            );

            const snapshot = await getDocs(q);
            const matches = [];

            snapshot.forEach((doc) => {
                matches.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, matches };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Firestore data methods
    async getCandidateProfile(candidateId) {
        try {
            // First try matching by Firestore Doc ID
            let docRef = doc(db, 'candidates', candidateId);
            let snap = await getDoc(docRef);

            if (snap.exists()) {
                return { id: snap.id, ...snap.data() };
            }

            // Fallback: Query by internal 'id' field
            const q = query(collection(db, 'candidates'), where('id', '==', candidateId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
            }

            return null;
        } catch (error) {
            console.error('Error fetching candidate profile:', error);
            return null;
        }
    }

    async getJobRequirements(jobId) {
        try {
            // First try matching by Firestore Doc ID
            let docRef = doc(db, 'jobs', jobId);
            let snap = await getDoc(docRef);

            if (snap.exists()) {
                return { id: snap.id, ...snap.data() };
            }

            // Fallback: Query by internal 'id' field
            const q = query(collection(db, 'jobs'), where('id', '==', String(jobId)));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
            }

            return null;
        } catch (error) {
            console.error('Error fetching job requirements:', error);
            return null;
        }
    }

    async getOpenJobs() {
        try {
            const q = query(collection(db, 'jobs'), where('status', '==', 'Open'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching open jobs:', error);
            return [];
        }
    }

    async getAllCandidates() {
        try {
            const querySnapshot = await getDocs(collection(db, 'candidates'));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching all candidates:', error);
            return [];
        }
    }
}

export const matchingService = new MatchingService();
export default MatchingService;
