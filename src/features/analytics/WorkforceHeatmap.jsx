import { useState, useEffect } from 'react';
import { MapPin, Globe, Zap, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWorkforceHubs } from '../../lib/services/analyticsService';

export default function WorkforceHeatmap() {
    const [hubs, setHubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHubs() {
            try {
                const data = await getWorkforceHubs();
                setHubs(data);
            } catch (err) {
                console.error("Failed to load hubs", err);
            } finally {
                setLoading(false);
            }
        }
        loadHubs();
    }, []);

    if (loading) return (
        <div className="glass-card p-8 bg-card/40 border-white/5 flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="glass-card p-8 bg-card/40 border-white/5 relative overflow-hidden h-full">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Global Workforce Heatmap
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Real-time geographic sentiment & load indices</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] font-black text-primary uppercase">Live Hubs</span>
                    </div>
                </div>
            </div>

            <div className="relative aspect-video bg-white/5 rounded-[2rem] border border-white/5 overflow-hidden group">
                {/* Mock Map Background Grids */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #E29578 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                {hubs.map((hub) => (
                    <motion.div
                        key={hub.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: hub.id * 0.1, type: 'spring' }}
                        className="absolute cursor-pointer group/pin"
                        style={{ top: hub.coord.t, left: hub.coord.l }}
                    >
                        <div className="relative">
                            {/* Pulse effect based on load */}
                            <div className={`absolute -inset-4 rounded-full animate-ping opacity-20 ${hub.load > 80 ? 'bg-destructive' : 'bg-primary'}`} />

                            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-xl flex items-center justify-center ${hub.sentiment > 85 ? 'bg-emerald-500' : hub.sentiment > 75 ? 'bg-primary' : 'bg-amber-500'
                                }`}>
                                <div className="w-1 h-1 bg-white rounded-full" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none">
                                <div className="glass-card p-3 bg-card border-primary/30 shadow-2xl">
                                    <p className="font-black text-xs leading-none mb-2">{hub.name}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter">
                                            <span className="text-muted-foreground">Staff Density</span>
                                            <span className="text-foreground">{hub.staff} units</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${(hub.staff / 80) * 100}%` }} />
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter">
                                            <span className="text-muted-foreground">Sentiment Index</span>
                                            <span className="text-emerald-400">{hub.sentiment}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {hubs.slice(0, 4).map(hub => (
                    <div key={hub.id} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{hub.name}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black">{hub.sentiment}%</span>
                            <span className={`text-[8px] font-black uppercase ${hub.sentiment > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {hub.sentiment > 80 ? 'Optimal' : 'Drifting'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
