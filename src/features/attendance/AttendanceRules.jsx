import { useState } from 'react';
import { Clock, MapPin, Settings, Save, AlertCircle, PlayCircle } from 'lucide-react';

const INITIAL_RULES = [
    { id: 1, name: 'General Shift', start: '09:00', end: '18:00', grace: '15 mins', type: 'Onsite', active: true },
    { id: 2, name: 'Engineering Flexi', start: '10:00', end: '19:00', grace: '30 mins', type: 'Hybrid', active: true },
    { id: 3, name: 'Support Night', start: '20:00', end: '05:00', grace: '0 mins', type: 'Remote', active: true },
];

export default function AttendanceRules() {
    const [rules, setRules] = useState(INITIAL_RULES);
    const [testTime, setTestTime] = useState('09:20');
    const [testResult, setTestResult] = useState(null);

    const testRule = (time) => {
        // Simple logic simulation
        const [hours, mins] = time.split(':').map(Number);
        const totalMins = hours * 60 + mins;
        const startMins = 9 * 60; // 09:00
        const grace = 15;

        let status = 'On Time';
        if (totalMins > startMins + grace && totalMins <= startMins + 60) status = 'Late (Half Day Deductible)';
        else if (totalMins > startMins + 60) status = 'Absent (Full Day Deductible)';
        else if (totalMins > startMins) status = 'Late (Grace Period)';

        setTestResult(status);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-10 h-[calc(100vh-200px)] animate-in fade-in duration-700">
            <div className="lg:col-span-2 space-y-10 overflow-y-auto no-scrollbar pb-10">
                {/* Governance Matrix */}
                <div className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black flex items-center gap-6 uppercase tracking-tighter">
                            <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
                                <Settings className="w-6 h-6 text-primary" />
                            </div>
                            Shift <span className="text-primary italic">Governance</span>
                        </h2>
                        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 group/btn relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                <Save className="w-4 h-4" /> Initialize Protocol
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {rules.map((rule) => (
                            <div key={rule.id} className="border border-border rounded-[2.5rem] p-8 hover:border-primary/50 transition-all bg-background/50 relative overflow-hidden group/item shadow-inner">
                                <div className="absolute left-0 top-0 w-1 h-full bg-primary/10 group-hover/item:bg-primary transition-all"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex items-center gap-8">
                                        <div className="w-14 h-14 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-xl group-hover/item:rotate-3 transition-transform">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{rule.name}</h3>
                                            <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">
                                                <span className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg"><Clock className="w-3 h-3 text-primary" /> {rule.start} — {rule.end}</span>
                                                <span className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg"><AlertCircle className="w-3 h-3 text-primary" /> Grace: {rule.grace}</span>
                                                <span className={`px-3 py-1 rounded-lg border ${rule.type === 'Remote' ? 'border-primary/30 text-primary' : 'border-border text-foreground'}`}>
                                                    {rule.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer group/toggle">
                                            <input type="checkbox" checked={rule.active} className="sr-only peer" readOnly />
                                            <div className="w-12 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Policy Node Extensions */}
                                <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 gap-8 relative z-10">
                                    <div className="group/sub">
                                        <span className="text-muted-foreground block text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Overtime Policy</span>
                                        <span className="text-xs font-black text-foreground uppercase tracking-wider italic">Standard Vector (1.5x after 45hrs)</span>
                                    </div>
                                    <div className="group/sub">
                                        <span className="text-muted-foreground block text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Regularization Limit</span>
                                        <span className="text-xs font-black text-foreground uppercase tracking-wider italic">03 per temporal cycle</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {/* Neural Simulator Hub */}
                <div className="bg-foreground text-background rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative group overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[120px] animate-pulse"></div>
                    <h3 className="text-sm font-black text-white mb-8 flex items-center gap-4 uppercase tracking-[0.2em] relative z-10">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <PlayCircle className="w-5 h-5 text-primary" />
                        </div>
                        Logic Simulator
                    </h3>
                    <p className="text-[10px] font-black text-white/40 mb-10 uppercase tracking-widest leading-relaxed relative z-10 italic">
                        Stress-test shift logic against synthetic check-in vectors based on <span className="text-white">Active General Protocols</span>.
                    </p>

                    <div className="space-y-8 relative z-10">
                        <div className="group/input">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-3 block ml-2">Temporal Input Vector</label>
                            <input
                                type="time"
                                value={testTime}
                                onChange={(e) => {
                                    setTestTime(e.target.value);
                                    setTestResult(null);
                                }}
                                className="w-full bg-white/5 p-5 rounded-2xl border border-white/10 text-white font-black tracking-tighter text-2xl outline-none focus:border-primary/50 transition-all shadow-inner"
                            />
                        </div>

                        <button
                            onClick={() => testRule(testTime)}
                            className="w-full bg-primary text-primary-foreground font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
                                <PlayCircle className="w-4 h-4" /> Run Vector Simulation
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        </button>

                        {testResult && (
                            <div className={`p-8 rounded-[2rem] border animate-in slide-in-from-bottom-5 duration-500 text-center relative overflow-hidden ${testResult.includes('Late') ? 'bg-primary/10 border-primary/20 text-primary' :
                                testResult.includes('Absent') ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                }`}>
                                <h4 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">{testResult.split('(')[0]}</h4>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60 leading-relaxed block">
                                    {testResult.includes('(') ? `${testResult.split('(')[1].replace(')', '')}` : 'Protocol Match'}
                                </span>
                                <div className="absolute top-0 right-0 w-16 h-16 bg-current opacity-10 rounded-full -mr-8 -mt-8"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Auto-Correction Logic Node */}
                <div className="bg-card border border-border rounded-[3rem] p-8 relative overflow-hidden group shadow-xl">
                    <div className="absolute left-0 top-0 w-1 h-full bg-primary/20"></div>
                    <h4 className="text-[10px] font-black text-foreground mb-6 uppercase tracking-[0.2em]">Optimization Directives</h4>
                    <ul className="text-[10px] font-black text-muted-foreground space-y-4 uppercase tracking-widest leading-relaxed">
                        <li className="flex items-start gap-3 group/li transition-all hover:translate-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></span>
                            <span>Enable <span className="text-foreground">"Smart Grace"</span> to negate &lt; 5 min institutional drift on adverse weather cycles.</span>
                        </li>
                        <li className="flex items-start gap-3 group/li transition-all hover:translate-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></span>
                            <span>Synchronize <span className="text-foreground">"Remote Work"</span> protocols to attendance vectors to eliminate false negatives.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
