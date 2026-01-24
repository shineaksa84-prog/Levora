import { geminiService } from '../ai/gemini';
import { matchingService } from './matching';

class SourcingService {
    constructor() {
        this.prospects = [];
        this.activeSequences = new Map();
    }

    /**
     * Search deep ecosystems
     */
    async searchEcosystem(query, type = 'github') {
        const results = await geminiService.generateDeepSourcingResults(query, type);

        // Enrich with internal proximity (mock logic)
        return results.map(res => ({
            ...res,
            id: `${type}-${Math.random().toString(36).substr(2, 9)}`,
            source: type,
            isProspect: true
        }));
    }

    /**
     * Get Proximity Path (6-degrees)
     * Demonstrates how the company is connected to the prospect
     */
    async getProximityPath(prospectId) {
        // Mock connection paths for demo
        const paths = [
            ["Levora (You)", "Sarah Kern (Engineering)", "Sarah Chen (Prospect)"],
            ["Levora (You)", "Alex Rivera (Alumni)", "Alex Rivera (Prospect)"],
            ["Levora (You)", "Marc Andreessen (Investor)", "Marcus Thorne (Prospect)"],
            ["Levora (You)", "Netflix (Partner Corp)", "Lisa Wong (Prospect)"]
        ];
        return paths[Math.floor(Math.random() * paths.length)];
    }

    /**
     * Start Engagement Sequence
     */
    async createOutreachSequence(prospect) {
        const companyContext = {
            name: "Levora AI",
            mission: "Human-centric HR Intelligence",
            culture: "High autonomy, high innovation"
        };

        const sequence = await geminiService.generateOmniChannelSequence(prospect, companyContext);

        this.activeSequences.set(prospect.id, {
            prospectId: prospect.id,
            status: 'Drafting',
            steps: sequence,
            createdAt: new Date().toISOString()
        });

        return sequence;
    }

    /**
     * Get Boolean Tree for Natural Query
     */
    async getBooleanSearchTree(naturalQuery) {
        return await geminiService.parseNaturalToBoolean(naturalQuery);
    }

    /**
     * Get Campaigns (MOCK)
     */
    async getCampaigns() {
        if (!this.campaigns) {
            this.campaigns = [
                {
                    id: 1,
                    name: 'Senior Systems Architect',
                    platform: 'LinkedIn Recruiter',
                    sent: 450,
                    openRate: 68,
                    responseRate: 24,
                    status: 'Active',
                    sentiment: 'High'
                },
                {
                    id: 2,
                    name: 'UX Design Lead',
                    platform: 'Dribbble / Behance',
                    sent: 120,
                    openRate: 85,
                    responseRate: 42,
                    status: 'Active',
                    sentiment: 'Very High'
                }
            ];
        }
        return Promise.resolve(this.campaigns);
    }

    /**
     * Create Campaign (MOCK)
     */
    async createCampaign() {
        if (!this.campaigns) await this.getCampaigns();

        const platforms = ['LinkedIn Recruiter', 'GitHub Direct', 'AngelList', 'StackOverflow'];
        const roles = ['DevOps Engineer', 'Product Manager', 'Data Scientist', 'AI Researcher'];

        const newCampaign = {
            id: Date.now(),
            name: roles[Math.floor(Math.random() * roles.length)],
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            sent: 0,
            openRate: 0,
            responseRate: 0,
            status: 'Active',
            sentiment: 'Neutral'
        };

        this.campaigns.unshift(newCampaign);
        return Promise.resolve(newCampaign);
    }
}

export const sourcingService = new SourcingService();
export default SourcingService;
