import { useState } from 'react';
import { Clock, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function TimeFillPredictor() {
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

    const predict = () => {
        // Mock prediction logic - in a real app this would query a backend ML model
        const baseDays = 30;
        const levelMod = inputs.level === 'Executive' ? 30 : inputs.level === 'L5' ? 15 : 0;
        const priorityMod = inputs.priority === 'High' ? -10 : 0;
        const marketMod = 12; // simulated randomness

        const total = baseDays + levelMod + priorityMod + marketMod;

        setPrediction({
            days: total,
            confidence: Math.floor(Math.random() * (95 - 75) + 75),
            range: `${total - 7}-${total + 7} days`,
            factors: [
                { name: 'Role Complexity', impact: 'High', effect: `+${levelMod} days` },
                { name: 'Market Demand', impact: 'High', effect: `+${marketMod} days` },
                { name: 'Priority', impact: inputs.priority, effect: `${priorityMod} days` }
            ]
        });
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col h-full">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Forecast Time-to-Fill
                </h2>

                <div className="space-y-5 flex-1">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Role</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background"
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
                            className="w-full p-2.5 rounded-lg border border-input bg-background"
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
                                <label key={p} className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 hover:bg-muted/50 transition-colors">
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
                    className="w-full mt-6 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                    <TrendingUp className="w-5 h-5" /> Calculate Forecast
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-primary"></div>

                <div className="mb-2 text-muted-foreground uppercase tracking-wider text-xs font-bold">Estimated Time to Hire</div>
                <div className="text-6xl font-extrabold text-foreground mb-1 tracking-tight">
                    {prediction.days} <span className="text-2xl text-muted-foreground font-medium">days</span>
                </div>
                <div className="text-lg font-medium text-primary bg-primary/10 px-4 py-1 rounded-full mb-8">
                    Range: {prediction.range}
                </div>

                <div className="w-full max-w-sm bg-muted/30 rounded-xl border border-border p-4 text-left">
                    <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase">Contributing Factors</h3>
                    <div className="space-y-3">
                        {prediction.factors.map((factor, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700">{factor.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded ${factor.effect.includes('+') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                        {factor.effect}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="w-4 h-4" />
                    Based on market data & internal velocity from last 12 mo.
                </div>
            </div>
        </div>
    );
}
