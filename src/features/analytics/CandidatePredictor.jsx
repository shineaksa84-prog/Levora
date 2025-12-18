import { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertCircle, CheckCircle2, MoreHorizontal, ArrowUpRight, Loader2 } from 'lucide-react';
import { getCandidatePredictorData } from '../../lib/services/analyticsService';

export default function CandidatePredictor() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCandidatePredictorData();
                setCandidates(data);
            } catch (error) {
                console.error('Failed to fetch predictor data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredCandidates = filter === 'All' ? candidates : candidates.filter(c => c.priority === filter);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl shadow-sm gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse text-sm">Calculating join probabilities...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                            Join Probability & Outreach Priority
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">AI-driven insights to prioritize your outreach efforts based on cloud engagement data.</p>
                    </div>
                    <div className="flex gap-2">
                        {['All', 'High', 'Medium', 'Low'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${filter === f ? 'bg-primary text-primary-foreground font-medium' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {filteredCandidates.length > 0 ? (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Candidate</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Join Probability</th>
                                    <th className="px-4 py-3">Key Signals</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3 rounded-r-lg text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {filteredCandidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-4 py-4 font-medium flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            {candidate.name}
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">{candidate.role}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${candidate.probability > 80 ? 'bg-green-500' : candidate.probability > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                        style={{ width: `${candidate.probability}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold w-8">{candidate.probability}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {candidate.signals.map(s => (
                                                    <span key={s} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 whitespace-nowrap">
                                                        {s}
                                                    </span>
                                                ))}
                                                {candidate.signals.length === 0 && <span className="text-muted-foreground italic text-xs">-</span>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${candidate.priority === 'High' ? 'bg-green-100 text-green-700' :
                                                candidate.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {candidate.priority === 'High' && <ArrowUpRight className="w-3 h-3" />}
                                                {candidate.priority}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <button className="text-muted-foreground hover:text-primary transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto opacity-10 mb-3" />
                            <p>No candidates available for prediction.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
