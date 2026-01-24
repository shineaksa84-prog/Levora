/**
 * Offer Negotiation Service
 * Manages offer negotiations, counter-offers, and approval workflows
 */

const MOCK_NEGOTIATIONS = [
    {
        id: 'neg1',
        candidateId: 'c3',
        candidateName: 'Charlie Brown',
        role: 'UX Designer',
        status: 'In Negotiation',
        stage: 'Counter Offer Received',
        initialOffer: {
            baseSalary: 120000,
            bonus: 15000,
            equity: 5000,
            benefits: 'Standard Package',
            startDate: '2025-02-01',
            offeredAt: '2024-12-10'
        },
        counterOffer: {
            baseSalary: 135000,
            bonus: 20000,
            equity: 8000,
            benefits: 'Standard Package + Remote Work Stipend',
            requestedAt: '2024-12-12',
            justification: 'Current market rate for senior UX designers with 8+ years experience in SF Bay Area'
        },
        finalOffer: null,
        approvalStatus: 'Pending',
        budgetVariance: 23000,
        competitorOffers: [
            { company: 'Tech Corp', baseSalary: 140000, bonus: 25000, equity: 10000 }
        ],
        negotiationNotes: [
            { date: '2024-12-10', note: 'Initial offer sent', author: 'Sarah Chen' },
            { date: '2024-12-12', note: 'Candidate countered with higher comp request', author: 'Sarah Chen' },
            { date: '2024-12-13', note: 'Escalated to hiring manager for approval', author: 'Sarah Chen' }
        ],
        timeline: {
            offerSent: '2024-12-10',
            counterReceived: '2024-12-12',
            approvalRequested: '2024-12-13',
            expectedDecision: '2024-12-18'
        }
    },
    {
        id: 'neg2',
        candidateId: 'c1',
        candidateName: 'Alice Freeman',
        role: 'Senior React Developer',
        status: 'Accepted',
        stage: 'Offer Accepted',
        initialOffer: {
            baseSalary: 150000,
            bonus: 20000,
            equity: 10000,
            benefits: 'Premium Package',
            startDate: '2025-01-15',
            offeredAt: '2024-12-05'
        },
        counterOffer: null,
        finalOffer: {
            baseSalary: 150000,
            bonus: 20000,
            equity: 10000,
            benefits: 'Premium Package',
            acceptedAt: '2024-12-07'
        },
        approvalStatus: 'Approved',
        budgetVariance: 0,
        competitorOffers: [],
        negotiationNotes: [
            { date: '2024-12-05', note: 'Initial offer sent', author: 'Mike Ross' },
            { date: '2024-12-07', note: 'Candidate accepted without negotiation', author: 'Mike Ross' }
        ],
        timeline: {
            offerSent: '2024-12-05',
            counterReceived: null,
            approvalRequested: null,
            acceptedAt: '2024-12-07',
            timeToAcceptance: 2
        }
    }
];

/**
 * Get all active negotiations
 */
export const getActiveNegotiations = async () => {
    return Promise.resolve(MOCK_NEGOTIATIONS.filter(n => n.status !== 'Accepted' && n.status !== 'Rejected'));
};

/**
 * Get all negotiations (including completed)
 */
export const getAllNegotiations = async () => {
    return Promise.resolve(MOCK_NEGOTIATIONS);
};

/**
 * Get negotiation by candidate ID
 */
export const getNegotiationByCandidate = async (candidateId) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.candidateId === candidateId);
    return Promise.resolve(negotiation || null);
};

/**
 * Create new offer
 */
export const createOffer = async (offerData) => {
    const newNegotiation = {
        id: `neg${Date.now()}`,
        candidateId: offerData.candidateId,
        candidateName: offerData.candidateName,
        role: offerData.role,
        status: 'Offer Sent',
        stage: 'Initial Offer',
        initialOffer: {
            ...offerData.offer,
            offeredAt: new Date().toISOString().split('T')[0]
        },
        counterOffer: null,
        finalOffer: null,
        approvalStatus: 'Not Required',
        budgetVariance: 0,
        competitorOffers: [],
        negotiationNotes: [
            {
                date: new Date().toISOString().split('T')[0],
                note: 'Initial offer sent',
                author: offerData.author || 'System'
            }
        ],
        timeline: {
            offerSent: new Date().toISOString().split('T')[0],
            counterReceived: null,
            approvalRequested: null,
            expectedDecision: offerData.offer.startDate
        }
    };

    MOCK_NEGOTIATIONS.push(newNegotiation);
    return Promise.resolve(newNegotiation);
};

/**
 * Submit counter offer
 */
export const submitCounterOffer = async (negotiationId, counterOfferData) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.id === negotiationId);

    if (!negotiation) {
        throw new Error('Negotiation not found');
    }

    negotiation.counterOffer = {
        ...counterOfferData,
        requestedAt: new Date().toISOString().split('T')[0]
    };
    negotiation.status = 'In Negotiation';
    negotiation.stage = 'Counter Offer Received';
    negotiation.budgetVariance = calculateBudgetVariance(negotiation.initialOffer, counterOfferData);

    negotiation.negotiationNotes.push({
        date: new Date().toISOString().split('T')[0],
        note: 'Counter offer received from candidate',
        author: 'System'
    });

    return Promise.resolve(negotiation);
};

/**
 * Request approval for counter offer
 */
export const requestApproval = async (negotiationId, approverData) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.id === negotiationId);

    if (!negotiation) {
        throw new Error('Negotiation not found');
    }

    negotiation.approvalStatus = 'Pending';
    negotiation.timeline.approvalRequested = new Date().toISOString().split('T')[0];

    negotiation.negotiationNotes.push({
        date: new Date().toISOString().split('T')[0],
        note: `Approval requested from ${approverData.approverName}`,
        author: approverData.requestedBy || 'System'
    });

    return Promise.resolve(negotiation);
};

/**
 * Approve/Reject counter offer
 */
export const processApproval = async (negotiationId, decision, approverNotes) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.id === negotiationId);

    if (!negotiation) {
        throw new Error('Negotiation not found');
    }

    negotiation.approvalStatus = decision === 'approve' ? 'Approved' : 'Rejected';

    negotiation.negotiationNotes.push({
        date: new Date().toISOString().split('T')[0],
        note: `Counter offer ${decision === 'approve' ? 'approved' : 'rejected'}. ${approverNotes || ''}`,
        author: 'Approver'
    });

    if (decision === 'approve') {
        negotiation.stage = 'Revised Offer Sent';
    }

    return Promise.resolve(negotiation);
};

/**
 * Finalize offer (accept/reject)
 */
export const finalizeOffer = async (negotiationId, decision, finalTerms = null) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.id === negotiationId);

    if (!negotiation) {
        throw new Error('Negotiation not found');
    }

    negotiation.status = decision === 'accept' ? 'Accepted' : 'Rejected';
    negotiation.stage = decision === 'accept' ? 'Offer Accepted' : 'Offer Declined';

    if (decision === 'accept') {
        negotiation.finalOffer = {
            ...(finalTerms || negotiation.counterOffer || negotiation.initialOffer),
            acceptedAt: new Date().toISOString().split('T')[0]
        };

        const offerDate = new Date(negotiation.timeline.offerSent);
        const acceptDate = new Date();
        const daysToAccept = Math.floor((acceptDate - offerDate) / (1000 * 60 * 60 * 24));

        negotiation.timeline.acceptedAt = new Date().toISOString().split('T')[0];
        negotiation.timeline.timeToAcceptance = daysToAccept;
    }

    negotiation.negotiationNotes.push({
        date: new Date().toISOString().split('T')[0],
        note: `Candidate ${decision === 'accept' ? 'accepted' : 'declined'} offer`,
        author: 'System'
    });

    return Promise.resolve(negotiation);
};

/**
 * Add competitor offer for benchmarking
 */
export const addCompetitorOffer = async (negotiationId, competitorData) => {
    const negotiation = MOCK_NEGOTIATIONS.find(n => n.id === negotiationId);

    if (!negotiation) {
        throw new Error('Negotiation not found');
    }

    negotiation.competitorOffers.push(competitorData);

    negotiation.negotiationNotes.push({
        date: new Date().toISOString().split('T')[0],
        note: `Competitor offer from ${competitorData.company} added for benchmarking`,
        author: 'System'
    });

    return Promise.resolve(negotiation);
};

/**
 * Calculate budget variance
 */
const calculateBudgetVariance = (initialOffer, counterOffer) => {
    const initialTotal = (initialOffer.baseSalary || 0) + (initialOffer.bonus || 0) + (initialOffer.equity || 0);
    const counterTotal = (counterOffer.baseSalary || 0) + (counterOffer.bonus || 0) + (counterOffer.equity || 0);
    return counterTotal - initialTotal;
};

/**
 * Get negotiation metrics
 */
export const getNegotiationMetrics = async () => {
    const all = await getAllNegotiations();

    const accepted = all.filter(n => n.status === 'Accepted');
    const inNegotiation = all.filter(n => n.status === 'In Negotiation');
    const rejected = all.filter(n => n.status === 'Rejected');

    const avgTimeToAcceptance = accepted.length > 0
        ? Math.round(accepted.reduce((sum, n) => sum + (n.timeline.timeToAcceptance || 0), 0) / accepted.length)
        : 0;

    const avgBudgetVariance = all.length > 0
        ? Math.round(all.reduce((sum, n) => sum + Math.abs(n.budgetVariance), 0) / all.length)
        : 0;

    return {
        total: all.length,
        accepted: accepted.length,
        inNegotiation: inNegotiation.length,
        rejected: rejected.length,
        acceptanceRate: all.length > 0 ? Math.round((accepted.length / all.length) * 100) : 0,
        avgTimeToAcceptance,
        avgBudgetVariance
    };
};

export default {
    getActiveNegotiations,
    getAllNegotiations,
    getNegotiationByCandidate,
    createOffer,
    submitCounterOffer,
    requestApproval,
    processApproval,
    finalizeOffer,
    addCompetitorOffer,
    getNegotiationMetrics
};
