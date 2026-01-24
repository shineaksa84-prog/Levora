/**
 * Retention Service
 * Manages attrition risk profiles and active retention protocols
 */

let MOCK_ATTRITION_DATA = [
    { id: 1, name: 'Nikola Tesla', role: 'Energy Architect', risk: 88, sentiment: 'Critical', signal: 'Engagement Drift', avatar: 'NT' },
    { id: 2, name: 'Ada Lovelace', role: 'Lead Logician', risk: 42, sentiment: 'Stable', signal: 'High Velocity', avatar: 'AL' },
    { id: 3, name: 'Alan Turing', role: 'Encryption Lead', risk: 65, sentiment: 'Warning', signal: 'Vacation Peak', avatar: 'AT' },
    { id: 4, name: 'Grace Hopper', role: 'Systems Engineer', risk: 12, sentiment: 'Optimal', signal: 'Promotion Path', avatar: 'GH' },
    { id: 5, name: 'Hedy Lamarr', role: 'Signal Specialist', risk: 91, sentiment: 'Critical', signal: 'Peer Disconnect', avatar: 'HL' },
];

let ACTIVE_PROTOCOLS = [];

export const retentionService = {
    getRiskProfiles: async () => {
        return Promise.resolve([...MOCK_ATTRITION_DATA]);
    },

    getActiveProtocols: async () => {
        return Promise.resolve([...ACTIVE_PROTOCOLS]);
    },

    initiateRetentionProtocol: async (subjectId) => {
        if (!ACTIVE_PROTOCOLS.includes(subjectId)) {
            ACTIVE_PROTOCOLS.push(subjectId);
        }

        // Lower risk immediately as intervention is active (simulated)
        MOCK_ATTRITION_DATA = MOCK_ATTRITION_DATA.map(p =>
            p.id === subjectId ? { ...p, risk: Math.max(p.risk - 15, 10), sentiment: 'Stabilizing' } : p
        );

        return Promise.resolve({ success: true, subjectId });
    },

    generateExecutiveBrief: async () => {
        return Promise.resolve({
            summary: "Retention risk focused in R&D Department.",
            actionItems: ["Review Comp Bands for Engineers", "Initiate Skip-Level Meetings"],
            projectedSavings: "$240k"
        });
    }
};
