import { useState, useEffect } from 'react';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { getRecruitmentFunnel } from '../../lib/services/analyticsService';

export default function RecruitmentFunnel() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getRecruitmentFunnel();
                setFunnelData(data);
            } catch (error) {
                console.error('Failed to load funnel:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !funnelData) {
        return (
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground text-sm">Loading recruitment intelligence...</p>
            </div>
        );
    }

    const stages = [
        { name: 'Applied', count: funnelData.stages.Applied, color: 'bg-blue-500' },
        { name: 'Screening', count: funnelData.stages.Screening, color: 'bg-purple-500' },
        { name: 'Interview', count: funnelData.stages.Interview, color: 'bg-indigo-500' },
        { name: 'Offer', count: funnelData.stages.Offer, color: 'bg-green-500' },
        { name: 'Hired', count: funnelData.stages.Hired, color: 'bg-emerald-500' }
    ];

    const maxCount = Math.max(...stages.map(s => s.count));

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Recruitment Funnel</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Candidate progression through hiring stages
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                        {funnelData.conversionRates.Overall}% conversion
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {stages.map((stage, index) => {
                    const widthPercent = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
                    const nextStage = stages[index + 1];
                    const conversionRate = nextStage && stage.count > 0
                        ? ((nextStage.count / stage.count) * 100).toFixed(1)
                        : null;

                    return (
                        <div key={stage.name}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{stage.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-muted-foreground">
                                        {stage.count} candidates
                                    </span>
                                    {conversionRate && (
                                        <span className="text-xs text-muted-foreground">
                                            {conversionRate}% →
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="relative h-10 bg-muted rounded-lg overflow-hidden">
                                <div
                                    className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-end px-4`}
                                    style={{ width: `${widthPercent}%` }}
                                >
                                    {stage.count > 0 && (
                                        <span className="text-white font-medium text-sm">
                                            {stage.count}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{funnelData.totalApplicants}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Applicants</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">{funnelData.totalHired}</p>
                    <p className="text-sm text-muted-foreground mt-1">Successfully Hired</p>
                </div>
            </div>
        </div>
    );
}
