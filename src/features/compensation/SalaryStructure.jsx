import React, { useState, useEffect } from 'react';
import {
    Layers, Settings2, Plus,
    ArrowRight, Info, AlertCircle,
    ChevronDown, Edit3, Trash2
} from 'lucide-react';
import { getFullSalaryStructure } from '../../lib/services/compensationService';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../lib/services/toastService';

export default function SalaryStructure() {
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getFullSalaryStructure();
        setStructures(data);
        setLoading(false);
    };

    const handleAddGrade = () => {
        const newGrade = {
            grade: `L${structures.length + 1}`,
            role: 'New Engineering Grade',
            count: 0,
            min: 80000,
            mid: 100000,
            max: 120000
        };
        setStructures([...structures, newGrade]);
        toast.success("New P75 Salary Band initialized.");
    };

    const handleDeleteGrade = (gradeCode) => {
        setStructures(structures.filter(s => s.grade !== gradeCode));
        toast.success(`Band ${gradeCode} decommissioned.`);
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading structures...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-6 rounded-[2rem] border border-border/50">
                <div>
                    <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Standardized Pay Grades
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium">Define and manage compensation bands across the organization</p>
                </div>
                <button
                    onClick={handleAddGrade}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Grade
                </button>
            </div>

            <div className="grid gap-4">
                {structures.map((grade, i) => (
                    <motion.div
                        key={grade.grade}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 group hover:border-primary/50 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                                    {grade.grade}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-none">{grade.role}</h3>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                                        {grade.count} Employees Enrolled
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 max-w-xl">
                                <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground mb-2">
                                    <span>Min: ${grade.min.toLocaleString()}</span>
                                    <span>Mid: ${grade.mid.toLocaleString()}</span>
                                    <span>Max: ${grade.max.toLocaleString()}</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-primary/40 rounded-full" />
                                    <div className="absolute top-0 bottom-0 left-[48%] w-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toast.info("Edit Matrix locked in demo mode.")}
                                    className="p-3 bg-muted/50 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteGrade(grade.grade)}
                                    className="p-3 bg-muted/50 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8 bg-blue-500/5 group">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg">
                        <Info className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-blue-600 transition-colors">Market Positioning Strategy</h3>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
                            Current structure is set to P75 (75th Percentile) of the tech sector.
                            AI recommends adjusting Grade P3 (+4%) to maintain competitive edge in specialized roles.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
