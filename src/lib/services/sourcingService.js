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
}

export const sourcingService = new SourcingService();
export default SourcingService;
