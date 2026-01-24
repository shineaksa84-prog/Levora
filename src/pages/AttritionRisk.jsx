import { useState, useEffect } from 'react';
import { ShieldAlert, TrendingDown, Users, Zap, Brain, Sparkles, Activity, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../lib/services/toastService';
import { retentionService } from '../lib/services/retentionService';

export default function AttritionRisk() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeProtocols, setActiveProtocols] = useState([]);
    const [riskData, setRiskData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [data, protocols] = await Promise.all([
            retentionService.getRiskProfiles(),
            retentionService.getActiveProtocols()
        ]);
        setRiskData(data);
        setActiveProtocols(protocols);
        setLoading(false);
    };

    const handleInitiateRetention = async (subject) => {
        if (activeProtocols.includes(subject.id)) {
            toast.info(`Retention sequence already active for ${subject.name}.`);
            return;
        }

        await retentionService.initiateRetentionProtocol(subject.id);
        setActiveProtocols([...activeProtocols, subject.id]);

        // Refresh data to show updated risk/sentiment
        const updatedData = await retentionService.getRiskProfiles();
        setRiskData(updatedData);

        toast.success(`Strategic Retention Protocol 91-B initialized for ${subject.name}. Mitigation sequence in progress.`);
    };

    const handleGenerateBrief = async () => {
        toast.promise(
            retentionService.generateExecutiveBrief(),
            {
                loading: 'Generating Executive Neural Brief...',
                success: (data) => `Brief Generated: ${data.summary}`,
                error: 'Failed to generate brief'
            }
        );
    };

    const filteredData = riskData.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading Intelligence...</div>;

    return (
        <div className="space-y-8 pb-12">
            {/* Protocol Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-vibrant-mesh p-10 border border-primary/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-xl shadow-xl">
                                <ShieldAlert className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.3em] text-primary/80">Intelligence Protocol 91-B</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
                            Attrition <span className="text-primary italic">Prediction</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-lg leading-relaxed">
                            Leveraging neural behavioral markers to identify institutional flight risks before they materialize.
                        </p>
                    </div>

                    <div className="flex gap-4 p-6 glass-card bg-white/5 border-white/5">
                        <div className="text-center px-4">
                            <p className="text-3xl font-black text-primary leading-none">{14 + activeProtocols.length}%</p>
                            <p className="text--[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Predicted Churn</p>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center px-4">
                            <p className="text-3xl font-black text-emerald-400 leading-none">-${240 + (activeProtocols.length * 45)}k</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Avoided Loss</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Control Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan Personnel by Neural ID..."
                        className="w-full pl-12 pr-6 py-4 glass-card bg-card/40 border-white/10 focus:border-primary/50 outline-none font-bold text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-8 py-4 glass-card hover:bg-white/5 border-white/10 flex items-center justify-center gap-3 group transition-all">
                    <Filter className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Global Filter</span>
                </button>
            </div>

            {/* Risk Protocol Cards */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.map((subject, idx) => {
                    const isProtocolActive = activeProtocols.includes(subject.id);
                    return (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`glass-card p-6 bg-card/40 border-white/5 group hover:border-primary/30 transition-all flex flex-col relative overflow-hidden ${isProtocolActive ? 'ring-2 ring-emerald-500/30 bg-emerald-500/5' : ''
                                }`}
                        >
                            {/* Static scan lines effect */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%]" />

                            <div className="flex justify-between items-start relative z-10 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center font-black text-primary shadow-xl">
                                        {subject.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black tracking-tight leading-none text-lg">{subject.name}</h4>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1.5">{subject.role}</p>
                                    </div>
                                </div>
                                <div className={`p-2 rounded-lg border ${subject.sentiment === 'Critical' ? 'bg-destructive/10 border-destructive/20 text-destructive' :
                                    subject.sentiment === 'Warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                                        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    }`}>
                                    <Brain className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10 flex-1">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Attrition Risk Score</p>
                                        <p className={`text-xl font-black ${subject.risk > 80 ? 'text-destructive' : subject.risk > 50 ? 'text-amber-500' : 'text-emerald-400'
                                            }`}>{subject.risk}%</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${subject.risk}%` }}
                                            className={`h-full ${subject.risk > 80 ? 'bg-destructive' : subject.risk > 50 ? 'bg-amber-500' : 'bg-emerald-400'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1 leading-none">Primary Signal</p>
                                        <p className="text-[10px] font-black">{subject.signal}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1 leading-none">Sentiment Index</p>
                                        <p className={`text-[10px] font-black ${subject.sentiment === 'Critical' ? 'text-destructive' : 'text-foreground'
                                            }`}>{subject.sentiment}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleInitiateRetention(subject)}
                                className={`mt-8 w-full py-4 glass-card font-black text-[10px] uppercase tracking-[0.2em] border-white/10 transition-all relative z-10 ${isProtocolActive
                                    ? 'bg-emerald-500 text-white border-transparent cursor-default'
                                    : 'bg-white/5 hover:bg-primary hover:text-primary-foreground hover:border-transparent'
                                    }`}
                            >
                                {isProtocolActive ? 'Protocol Active' : 'Initiate Retention Sequence'}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Neural Summary Banner */}
            <div className="glass-card p-8 bg-primary/5 border-primary/20 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-primary shadow-glow" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-black tracking-tight leading-none mb-1">AI Protocol Advice</h3>
                    <p className="text-sm font-medium text-muted-foreground">"Focus retention efforts on the **Energy Architecture** hub. Signal drift suggests cross-departmental contagion risks in HQ."</p>
                </div>
                <button
                    onClick={handleGenerateBrief}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    Generate Executive Brief
                </button>
            </div>
        </div>
    );
}


