/**
 * Agency Partner Service
 * Handles agency agreements, commissions, and candidate submissions
 */

const AGENCIES = [
    {
        id: 'agency_1',
        name: 'TechHunters Inc.',
        commissionRate: 15,
        payoutCycle: 'Net 30',
        activePlacements: 4,
        totalBilled: 125000,
        status: 'Active'
    },
    {
        id: 'agency_2',
        name: 'Global Staffing Solutions',
        commissionRate: 12,
        payoutCycle: 'Net 15',
        activePlacements: 2,
        totalBilled: 45000,
        status: 'Probation'
    }
];

const SUBMISSIONS = [
    { id: 1, name: 'John Doe', role: 'Senior React Dev', status: 'Interviewing', agencyId: 'agency_1', submittedAt: '2024-11-20' },
    { id: 2, name: 'Jane Smith', role: 'UX Lead', status: 'Offer Extension', agencyId: 'agency_1', submittedAt: '2024-11-22' },
    { id: 3, name: 'Alice Wong', role: 'DevOps Engineer', status: 'Sourced', agencyId: 'agency_2', submittedAt: '2024-11-25' },
];

export async function getAgencyData(agencyId) {
    // In a real app, this would fetch from Firebase
    const agency = AGENCIES.find(a => a.id === agencyId) || AGENCIES[0];
    return agency;
}

export async function getAgencySubmissions(agencyId) {
    return SUBMISSIONS.filter(s => s.agencyId === agencyId);
}

export async function submitCandidate(agencyId, candidateData) {
    const newSubmission = {
        id: Date.now(),
        ...candidateData,
        agencyId,
        status: 'Sourced',
        submittedAt: new Date().toISOString().split('T')[0]
    };
    // Mock persistence
    console.log('Candidate submitted:', newSubmission);
    return newSubmission;
}

export default {
    getAgencyData,
    getAgencySubmissions,
    submitCandidate
};
