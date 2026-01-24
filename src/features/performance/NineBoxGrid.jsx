import { useState, useEffect } from 'react';
import { Grid, MousePointer2, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTalentCalibrationMatrix } from '../../lib/services/performanceService';

export default function NineBoxGrid() {
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [matrix, setMatrix] = useState({ boxes: [], employees: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMatrix() {
            try {
                const data = await getTalentCalibrationMatrix();
                setMatrix(data);
            } catch (err) {
                console.error("Failed to load matrix", err);
            } finally {
                setLoading(false);
            }
        }
        loadMatrix();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center glass-card p-6 bg-primary/5">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Grid className="w-6 h-6 text-primary" />
                        Aero Talent Calibration <span className="text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary px-2 py-1 rounded ml-2">Neural Matrix</span>
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Synthesizing <strong>Potential</strong> vs <strong>Performance</strong> indices.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <MousePointer2 className="w-3.5 h-3.5 text-primary" /> Select Node for Insight
                </div>
            </div>

            <div className="glass-card p-8 bg-card/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                {/* Axes Labels */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                    Architectural Potential
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                    Operational Performance
                </div>

                <div className="grid grid-cols-3 gap-4 pl-12 pb-12">
                    {matrix.boxes.map(box => {
                        const boxEmps = (matrix.employees || []).filter(e => e.box === box.id);
                        return (
                            <div key={box.id} className={`border rounded-2xl h-36 p-4 relative group transition-all hover:shadow-[0_0_30px_rgba(226,149,120,0.1)] ${box.color}`}>
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/80">
                                        {box.name}
                                    </span>
                                    <span className="text-[8px] font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                                        {box.id}
                                    </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {boxEmps.map(emp => (
                                        <motion.div
                                            key={emp.id}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            onClick={() => setSelectedEmp(emp)}
                                            className="w-10 h-10 rounded-xl bg-card border border-primary/20 flex items-center justify-center text-[10px] font-black shadow-lg cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all"
                                            title={emp.name}
                                        >
                                            {emp.avatar}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedEmp && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 bg-primary/10 border-primary/20 flex justify-between items-center"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-lg">
                            {selectedEmp.avatar}
                        </div>
                        <div>
                            <h4 className="text-lg font-black tracking-tight">{selectedEmp.name}</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{selectedEmp.role}</p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-tighter">
                                    Zone: {matrix.boxes.find(b => b.id === selectedEmp.box)?.name}
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase italic px-2 py-0.5 border border-white/10 rounded">
                                    {matrix.boxes.find(b => b.id === selectedEmp.box)?.level}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 text-xs font-black uppercase tracking-widest">
                        <button className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">View Bio-Profile</button>
                        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Strategic Dev-Plan</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
