import { useState, useEffect } from 'react';
import { Crown, Users, AlertTriangle, ArrowUpRight, ShieldCheck, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../lib/services/toastService';
import { getSuccessionPlan } from '../../lib/services/performanceService';

export default function SuccessionPlanner() {
    const navigate = useNavigate();
    const [keyRoles, setKeyRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getSuccessionPlan();
                setKeyRoles(data);
            } catch (err) {
                console.error("Failed to load succession plan", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleInitiateScout = (role) => {
        toast.info(`Strategic Talent Scout protocol engaged for ${role.role}. Scanning external marketplace...`);
        navigate('/sourcing', { state: { role: role.role, context: 'succession' } });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center glass-card p-8 bg-secondary/5 border-secondary/20">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Crown className="w-8 h-8 text-secondary shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                        Succession Command <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-secondary/20 text-secondary px-3 py-1 rounded-full ml-2">Protocol 4.0</span>
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">
                        Ensuring leadership continuity through bio-metric readiness and predictive career mapping.
                    </p>
                </div>
                <div className="hidden lg:flex items-center gap-5">
                    <div className="text-center">
                        <p className="text-xl font-black text-secondary leading-none">82%</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-1">Continuity index</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <button
                        onClick={() => handleInitiateScout({ role: 'Global Pipeline' })}
                        className="px-5 py-3 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
                    >
                        Initiate Talent Scout
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {keyRoles.map((role, idx) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card flex flex-col h-full group border-white/5 hover:border-primary/20 bg-card/40"
                    >
                        <div className="p-6 border-b border-white/5 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-black text-lg tracking-tight leading-tight group-hover:text-primary transition-colors">{role.role}</h3>
                                <div className={`p-1.5 rounded-lg ${role.risk === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] shadow-lg">
                                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-xs font-black">
                                        {role.incumbent.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">Current Incumbent</p>
                                    <p className="text-sm font-bold mt-1">{role.incumbent}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${role.risk === 'High' ? 'bg-destructive text-destructive-foreground' : 'bg-white/10 text-muted-foreground'
                                        }`}>
                                        {role.risk} Risk
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 space-y-5">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Validated Successors</p>

                            <div className="space-y-3">
                                {role.successors.length > 0 ? (
                                    role.successors.map((succ, sIdx) => (
                                        <div key={sIdx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20" style={{ width: `${succ.confidence}%` }} />
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-black text-primary text-[10px]">
                                                    {succ.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-xs block leading-none">{succ.name}</span>
                                                    <span className="text-[9px] text-muted-foreground font-medium mt-1 block uppercase tracking-tighter">Match Confidence: {succ.confidence}%</span>
                                                </div>
                                            </div>
                                            <span className={`text-[8px] font-black px-2 py-1 rounded-lg tracking-widest uppercase ${succ.readiness === 'Ready Now' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                }`}>
                                                {succ.readiness}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 rounded-2xl border-2 border-dashed border-white/5 bg-destructive/5 space-y-3">
                                        <AlertTriangle className="w-8 h-8 mx-auto text-destructive/40" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-destructive/60">Succession Deficit</p>
                                            <p
                                                onClick={() => handleInitiateScout(role)}
                                                className="text-[8px] font-medium text-muted-foreground mt-1 underline cursor-pointer hover:text-white transition-colors"
                                            >
                                                Emergency External Search Initiated
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            onClick={() => toast.info(`Expanding roadmap for ${role.role}...`)}
                            className="p-4 bg-white/5 text-center border-t border-white/5 group-hover:bg-primary/5 transition-colors cursor-pointer"
                        >
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">Expand Strategic Roadmap</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
