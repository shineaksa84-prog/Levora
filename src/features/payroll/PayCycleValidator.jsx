import { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { getPayCycleValidations } from '../../lib/services/payrollService';

export default function PayCycleValidator() {
    const [data, setData] = useState({ validations: [], readyScore: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadValidations() {
            try {
                const res = await getPayCycleValidations();
                setData(res);
            } catch (err) {
                console.error("Failed to load validations", err);
            } finally {
                setLoading(false);
            }
        }
        loadValidations();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    const { validations, readyScore } = data;
    const criticalErrors = validations.filter(v => v.severity === 'Critical' && v.status === 'Failed').length;
    const highErrors = validations.filter(v => v.severity === 'High' && v.status === 'Failed').length;


    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className={`glass-card p-8 text-center border font-black ${readyScore === 100 ? 'bg-emerald-500/5 border-emerald-500' : 'bg-rose-500/5 border-rose-500'
                    } flex flex-col items-center justify-center h-64 shadow-lg relative overflow-hidden group`}>
                    <div className={`absolute inset-0 opacity-20 blur-xl ${readyScore === 100 ? 'bg-emerald-500/20' : 'bg-rose-500/20'} group-hover:opacity-30 transition-opacity`}></div>
                    <ShieldCheck className={`w-20 h-20 mb-4 relative z-10 ${readyScore === 100 ? 'text-emerald-500' : 'text-rose-500'}`} />
                    <h2 className="text-6xl font-black mb-2 tracking-tighter relative z-10 text-foreground">{readyScore}%</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 relative z-10">Readiness Score</p>

                    {readyScore < 100 && (
                        <div className="absolute bottom-0 left-0 w-full bg-rose-500 text-white py-2 text-[10px] font-black uppercase tracking-widest">
                            Action Required
                        </div>
                    )}
                </div>

                <div className="glass-card p-6 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Validation Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                            <span className="flex items-center gap-2 text-sm text-rose-600 font-bold">
                                <AlertCircle className="w-4 h-4" /> Critical Errors
                            </span>
                            <span className="font-black text-lg text-rose-600">{criticalErrors}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                            <span className="flex items-center gap-2 text-sm text-amber-600 font-bold">
                                <AlertTriangle className="w-4 h-4" /> Warnings
                            </span>
                            <span className="font-black text-lg text-amber-600">{highErrors}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <span className="flex items-center gap-2 text-sm text-emerald-600 font-bold">
                                <CheckCircle className="w-4 h-4" /> Passed
                            </span>
                            <span className="font-black text-lg text-emerald-600">{validations.filter(v => v.status === 'Passed').length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 glass-card flex flex-col overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <div>
                        <h2 className="text-xl font-black tracking-tight flex items-center gap-2 text-foreground">
                            Validation Report
                        </h2>
                        <p className="text-xs font-medium text-muted-foreground mt-1">Cycle: Nov 2023 • All systems operational</p>
                    </div>
                    <button className="cyber-button-primary text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                        Re-run Scan
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] sticky top-0 backdrop-blur-md">
                            <tr>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Rule</th>
                                <th className="px-6 py-4 text-right">Impact</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {validations.map(item => (
                                <tr key={item.id} className="hover:bg-muted/30 group transition-colors">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.category}</td>
                                    <td className="px-6 py-4 font-black text-foreground">{item.check}</td>
                                    <td className="px-6 py-4 text-right">
                                        {item.count > 0 ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black bg-muted border border-border text-foreground">
                                                {item.count} Records
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground/30 font-bold">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${item.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                            item.status === 'Warning' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                                                'bg-rose-500/10 text-rose-600 border-rose-500/20'
                                            }`}>
                                            {item.status === 'Passed' && <CheckCircle className="w-3 h-3" />}
                                            {item.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                                            {item.status === 'Failed' && <AlertCircle className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status !== 'Passed' && (
                                            <button className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-1 ml-auto hover:underline opacity-0 group-hover:opacity-100 transition-all">
                                                Resolve <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
