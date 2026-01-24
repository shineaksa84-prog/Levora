import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Info, Loader2 } from 'lucide-react';
import { getInternalSalaryStats, getMarketSalaryBenchmarks } from '../../lib/services/analyticsService';

export default function SalaryBenchmark() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [internalStats, marketData] = await Promise.all([
                    getInternalSalaryStats(),
                    getMarketSalaryBenchmarks()
                ]);
                const combined = internalStats.map(item => {
                    const market = marketData[item.role] || 1500000;
                    const gap = Math.round(((item.internalAverage - market) / market) * 100);
                    return {
                        role: item.role,
                        internal: item.internalAverage,
                        market: market,
                        gap: gap
                    };
                });
                setData(combined);
            } catch (error) {
                console.error('Failed to fetch salary stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const formatK = (val) => `₹${(val / 100000).toFixed(1)}L`;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl shadow-sm gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse text-sm">Auditing internal compensation data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-primary" />
                        Compensation Benchmarking (Real-time Cloud Data)
                    </h2>
                    <span className="text-sm text-muted-foreground italic">Source: Internal Firestore & Market Medians</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((item) => (
                        <div key={item.role} className="p-4 rounded-xl border bg-background flex flex-col justify-between group hover:shadow-md transition-shadow">
                            <div>
                                <h4 className="font-bold text-gray-900 truncate" title={item.role}>{item.role}</h4>
                                <div className="flex items-end gap-2 mt-4 text-sm mb-6">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                                            <span>Our Avg</span>
                                            <span>Market</span>
                                        </div>
                                        <div className="h-24 flex items-end justify-between px-2 gap-4">
                                            {/* Bars */}
                                            <div className="w-8 bg-primary rounded-t-md relative group-hover:bg-primary/80 transition-colors" style={{ height: `${Math.min((item.internal / 4000000) * 100, 100)}%` }}>
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold whitespace-nowrap">{formatK(item.internal)}</span>
                                            </div>
                                            <div className="w-8 bg-muted rounded-t-md relative" style={{ height: `${Math.min((item.market / 4000000) * 100, 100)}%` }}>
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground whitespace-nowrap">{formatK(item.market)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center py-2 rounded font-bold text-xs ${item.gap < -10 ? 'bg-red-100 text-red-700' :
                                item.gap > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {item.gap === 0 ? 'At Par' : item.gap > 0 ? `${item.gap}% Above Market` : `${Math.abs(item.gap)}% Below Market`}
                            </div>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                            No employee compensation data found in Firestore.
                        </div>
                    )}
                </div>
            </div>

            {data.some(d => d.gap < -10) && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-orange-900">Compensation Alert</h4>
                            <p className="text-sm text-orange-800 mt-1">
                                Some roles are significantly below market standards. Priority review recommended for:
                                <span className="font-bold ml-1">{data.filter(d => d.gap < -10).map(d => d.role).join(', ')}</span>.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            const roles = data.filter(d => d.gap < -10).map(d => d.role).join(', ');
                            const prompt = `Create a salary correction approval workflow for ${roles}. Trigger: HR Proposal, Action: Manager Approval -> Finance Review -> Update Payroll.`;
                            if (window.confirm(`Auto-generate a salary correction workflow for ${roles}?`)) {
                                try {
                                    await workflowService.createWorkflowFromText(prompt);
                                    alert('Correction workflow generated in Automation Hub!');
                                } catch (e) { console.error(e); }
                            }
                        }}
                        className="shrink-0 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm"
                    >
                        Propose Corrections
                    </button>
                </div>
            )}
        </div>
    );
}
