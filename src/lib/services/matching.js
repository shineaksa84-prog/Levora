import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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

    // Mock data methods (replace with actual Firestore queries)
    async getCandidateProfile(candidateId) {
        return {
            id: candidateId,
            name: "John Doe",
            skills: ["JavaScript", "React", "Node.js", "Python"],
            experience: "3 years",
            education: "B.Tech Computer Science"
        };
    }

    async getJobRequirements(jobId) {
        return {
            id: jobId,
            title: "Senior React Developer",
            requiredSkills: ["React", "JavaScript", "TypeScript"],
            preferredSkills: ["Node.js", "AWS"],
            minExperience: "2 years"
        };
    }

    async getOpenJobs() {
        return [
            { id: "job1", title: "Senior React Developer", status: "open" },
            { id: "job2", title: "Full Stack Engineer", status: "open" },
            { id: "job3", title: "Python Developer", status: "open" }
        ];
    }

    async getAllCandidates() {
        return [
            { id: "cand1", name: "John Doe", status: "active" },
            { id: "cand2", name: "Jane Smith", status: "active" },
            { id: "cand3", name: "Mike Johnson", status: "active" }
        ];
    }
}

export const matchingService = new MatchingService();
export default MatchingService;
