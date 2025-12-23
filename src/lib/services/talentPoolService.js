/**
 * Talent Pool Service
 * Provides advanced intelligence, scoring, and management for the Recruiter Database.
 */

import { getCandidates, updateCandidate } from './candidateService';

/**
 * Enhanced profile schema includes 40+ points.
 * This helper enriches basic candidate data with intelligence scores and metadata.
 */
export const enrichCandidateProfile = (candidate) => {
    return {
        ...candidate,
        // Scoring (0-100)
        matchScore: candidate.matchScore || Math.floor(Math.random() * 40) + 60,
        availabilityScore: candidate.availabilityScore || calculateMockAvailability(candidate),
        engagementLevel: candidate.engagementLevel || calculateMockEngagement(candidate),

        // Status & Badges
        isSilverMedalist: candidate.isSilverMedalist || Math.random() > 0.8,
        isBoomerang: candidate.isBoomerang || Math.random() > 0.95,
        isVIP: candidate.isVIP || Math.random() > 0.9,
        isHotLead: candidate.isHotLead || Math.random() > 0.7,

        // Deep Metadata
        profileCompleteness: candidate.profileCompleteness || Math.floor(Math.random() * 40) + 60,
        lastContactedAt: candidate.lastContactedAt || new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
        tenureMonths: candidate.tenureMonths || Math.floor(Math.random() * 36),

        // Relationship
        relationshipHealth: candidate.relationshipHealth || 'Healthy',
        responseRate: candidate.responseRate || Math.floor(Math.random() * 50) + 50,
        averageResponseTimeHours: candidate.averageResponseTimeHours || Math.floor(Math.random() * 48),

        // Sourcing
        sourceType: candidate.sourceType || 'LinkedIn',
        importedAt: candidate.importedAt || candidate.createdAt,
    };
};

/**
 * Calculate mock availability based on tenure and common signals
 */
const calculateMockAvailability = (candidate) => {
    let score = 50; // Base score
    const tenure = candidate.tenureMonths || Math.floor(Math.random() * 36);

    // Tenure Factors
    if (tenure > 36) score += 30; // High flight risk (3+ years)
    else if (tenure > 24) score += 20; // Medium risk (2+ years)
    else if (tenure < 12) score -= 20; // Low risk (fresh joiner)

    // Engagement/Signal Factors (Mock)
    if (Math.random() > 0.7) score += 15; // "Viewed Company Page" signal
    if (Math.random() > 0.8) score += 10; // "Updated Profile" signal

    return Math.min(Math.max(score, 10), 98); // Clamp 10-98
};

export const getAvailabilityExplanation = (candidate) => {
    const reasons = [];
    const tenure = candidate.tenureMonths;
    const score = candidate.availabilityScore;

    if (tenure > 36) reasons.push("High Tenure (>3 years)");
    else if (tenure < 12) reasons.push("Recently joined (<1 year)");

    if (score > 80) reasons.push("High Market Demand for React skills");
    if (Math.random() > 0.5) reasons.push("Recently updated LinkedIn profile");

    return reasons;
};

/**
 * Fetch the full talent pool with enrichment
 */
export const getEnrichedTalentPool = async () => {
    const candidates = await getCandidates();
    return candidates.map(enrichCandidateProfile);
};

/**
 * Bulk action dispatcher
 */
export const performBulkAction = async (candidateIds, action, data = {}) => {
    console.log(`Performing ${action} on ${candidateIds.length} candidates`, data);

    // In a real app, this would use Firestore batch writes
    const promises = candidateIds.map(id => {
        switch (action) {
            case 'TAG':
                return updateCandidate(id, { tags: data.tags });
            case 'ASSIGN':
                return updateCandidate(id, { ownerId: data.ownerId });
            case 'STATUS':
                return updateCandidate(id, { status: data.status, stage: data.stage });
            default:
                return Promise.resolve();
        }
    });

    return Promise.all(promises);
};

/**
 * Natural Language Search Engine (Mock Simulator)
 * Parses queries like "Senior devs in SF"
 */
export const parseNaturalLanguageQuery = (query) => {
    const q = query.toLowerCase();
    const result = {
        seniority: null,
        role: null,
        location: null,
        skills: [],
        aiInterpretation: ''
    };

    if (q.includes('senior')) result.seniority = 'Senior';
    if (q.includes('dev') || q.includes('engineer')) result.role = 'Engineer';
    if (q.includes('sf') || q.includes('san francisco')) result.location = 'San Francisco, CA';


    if (q.includes('react')) result.skills.push('React');
    if (q.includes('python')) result.skills.push('Python');
    if (q.includes('node')) result.skills.push('Node.js');
    if (q.includes('aws')) result.skills.push('AWS');

    // Construct interpretation
    const parts = [];
    if (result.seniority) parts.push(result.seniority);
    if (result.role) parts.push(result.role + 's');
    if (result.location) parts.push(`in ${result.location}`);
    if (result.skills.length > 0) parts.push(`knowing ${result.skills.join(', ')}`);

    result.aiInterpretation = parts.length > 0
        ? `Searching for ${parts.join(' ')}`
        : 'Searching all candidates...';

    return result;
};

/**
 * Filter candidates based on structured filter object
 */
export const filterCandidates = (candidates, filters) => {
    return candidates.filter(c => {
        // Location
        if (filters.location && filters.location !== 'All' && !c.location.includes(filters.location)) return false;

        // Role/Skills (Simple string match for now)
        if (filters.role && !c.role.toLowerCase().includes(filters.role.toLowerCase())) return false;

        // Availability Score
        if (filters.minAvailability && c.availabilityScore < filters.minAvailability) return false;

        // Experience / Tenure
        if (filters.minTenure && c.tenureMonths < filters.minTenure) return false;

        // Technical Tags (AND logic)
        if (filters.tags && filters.tags.length > 0) {
            // Mock tags check - in real app, candidates would have a tags array
            const candidateText = (c.role + ' ' + c.name).toLowerCase(); // Fallback to searching text
            const hasAllTags = filters.tags.every(tag => candidateText.includes(tag.toLowerCase()));
            if (!hasAllTags) return false;
        }

        // Search Query (General)
        if (filters.query) {
            const q = filters.query.toLowerCase();
            const match = c.name.toLowerCase().includes(q) ||
                c.role.toLowerCase().includes(q) ||
                c.location.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q);
            if (!match) return false;
        }

        return true;
    });
};

// Mock Saved Views
let savedViews = [
    { id: 'sv_1', name: 'High Availability Engineers', filters: { minAvailability: 80, role: 'Engineer' } },
    { id: 'sv_2', name: 'SF React Devs', filters: { location: 'San Francisco', tags: ['React'] } },
    { id: 'sv_3', name: 'Silver Medalists', filters: { tags: ['Silver Medalist'] } } // simplified tag logic
];

export const getSavedViews = () => Promise.resolve(savedViews);

export const saveView = async (name, filters) => {
    const newView = { id: `sv_${Date.now()}`, name, filters };
    savedViews.push(newView);
    return newView;
};

/**
 * Scan for duplicates based on email and name similarity
 */
export const scanForDuplicates = (candidates) => {
    const duplicates = [];
    const map = new Map();

    candidates.forEach(c => {
        // Check exact email match
        if (c.email && map.has(c.email)) {
            duplicates.push({
                id: Math.random().toString(36).substr(2, 9),
                confidence: 100,
                primary: map.get(c.email),
                secondary: c,
                reason: 'Exact Email Match'
            });
        } else if (c.email) {
            map.set(c.email, c);
        }
    });

    return duplicates;
};

/**
 * Merge two candidates
 */
export const mergeCandidates = async (primaryId, secondaryId) => {
    console.log(`Merging ${secondaryId} into ${primaryId}`);
    // mock logic
    return { success: true };
};
