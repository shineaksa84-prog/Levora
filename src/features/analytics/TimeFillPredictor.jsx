import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { geminiService } from '../../lib/ai/gemini';
import { getTimeToHireMetrics } from '../../lib/services/analyticsService';

export default function TimeFillPredictor() {
    const [loading, setLoading] = useState(false);
    const [historicalAvg, setHistoricalAvg] = useState(45);
    const [inputs, setInputs] = useState({
        role: 'Senior Engineer',
        department: 'Engineering',
        level: 'L5',
        priority: 'High'
    });

    const [prediction, setPrediction] = useState({
        days: 45,
        confidence: 85,
        range: '38-52 days',
        factors: [
            { name: 'Role Complexity', impact: 'High', effect: '+10 days' },
            { name: 'Market Demand', impact: 'Very High', effect: '+15 days' },
            { name: 'Internal Priority', impact: 'Positive', effect: '-5 days' }
        ]
    });

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const metrics = await getTimeToHireMetrics();
                if (metrics.average > 0) {
                    setHistoricalAvg(metrics.average);
                    setPrediction(prev => ({ ...prev, days: metrics.average }));
                }
            } catch (error) {
                console.error('Error fetching historical metrics:', error);
            }
        };
        fetchMeta();
    }, []);

    const predict = async () => {
        setLoading(true);
        try {
            const result = await geminiService.predictTimeFill(inputs, historicalAvg);
            setPrediction(result);
        } catch (error) {
            console.error('Prediction failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 pb-8">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col h-full">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Forecast Time-to-Fill
                </h2>

                <div className="space-y-5 flex-1">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Role</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                            value={inputs.role}
                            onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                        >
                            <option>Mid-Level Engineer</option>
                            <option>Senior Engineer</option>
                            <option>Engineering Manager</option>
                            <option>Product Manager</option>
                            <option>Designer</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Level / Seniority</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                            value={inputs.level}
                            onChange={(e) => setInputs({ ...inputs, level: e.target.value })}
                        >
                            <option value="L3">Entry (L3)</option>
                            <option value="L4">Mid (L4)</option>
                            <option value="L5">Senior (L5)</option>
                            <option value="Executive">Executive</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Hiring Priority</label>
                        <div className="flex gap-4">
                            {['Standard', 'High', 'Critical'].map(p => (
                                <label key={p} className={`flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 transition-all ${inputs.priority === p ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        checked={inputs.priority === p}
                                        onChange={() => setInputs({ ...inputs, priority: p })}
                                        className="text-primary"
                                    />
                                    <span className="text-sm font-medium">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={predict}
                    disabled={loading}
                    className="w-full mt-6 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing Market & Company Velocity...
                        </>
                    ) : (
                        <>
                            <TrendingUp className="w-5 h-5" /> Calculate AI Forecast
                        </>
                    )}
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-primary"></div>

                <div className="mb-2 text-muted-foreground uppercase tracking-wider text-xs font-bold">Estimated Time to Hire</div>
                <div className="text-6xl font-extrabold text-foreground mb-1 tracking-tight">
                    {prediction.days} <span className="text-2xl text-muted-foreground font-medium">days</span>
                </div>
                <div className="text-lg font-medium text-primary bg-primary/10 px-4 py-1 rounded-full mb-8">
                    Range: {prediction.range}
                </div>

                <div className="w-full max-w-sm bg-muted/30 rounded-xl border border-border p-4 text-left">
                    <h3 className="font-semibold text-xs mb-3 text-muted-foreground uppercase tracking-wider">Contributing Factors</h3>
                    <div className="space-y-3">
                        {prediction.factors.map((factor, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700">{factor.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm ${factor.effect.includes('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {factor.effect}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/40 px-3 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Based on market intelligence & internal velocity (Avg: {historicalAvg}d)
                </div>
            </div>
        </div>
    );
}
