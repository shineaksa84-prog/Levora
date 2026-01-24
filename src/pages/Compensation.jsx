import { useState } from 'react';
import { DollarSign, Heart, Layers, Zap, Brain, Sparkles } from 'lucide-react';
import { toast } from '../lib/services/toastService';
import Payroll from '../features/compensation/Payroll';
import Benefits from '../features/compensation/Benefits';
import SalaryStructure from '../features/compensation/SalaryStructure';
import VariablePay from '../features/compensation/VariablePay';
import CompIntelligence from '../features/compensation/CompIntelligence';
import PayrollDatabase from '../features/payroll/PayrollDatabase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Compensation() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('payroll');

    const isAdmin = user?.role === 'admin' || user?.role === 'payroll';

    const tabs = [
        { id: 'payroll', label: 'Payroll & Salary', icon: DollarSign },
        { id: 'benefits', label: 'Benefits & Insurance', icon: Heart },
        { id: 'structure', label: 'Salary Structure', icon: Layers },
        { id: 'variable', label: 'Variable Pay', icon: Zap },
        { id: 'intelligence', label: 'Comp Intelligence', icon: Brain },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-vibrant-mesh p-10 border border-border/50">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/80">Executive Compensation Suite</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            Global <span className="text-primary italic">Pay & Benefits</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Managing total rewards, salary structures, and compensation analytics for 120+ employees.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => toast.success("Payroll Report generated. Downloading PDF...")}
                            className="px-6 py-4 bg-white/70 backdrop-blur-xl border border-border/50 rounded-2xl font-black text-sm hover:bg-white transition-all shadow-xl active:scale-95"
                        >
                            Payroll Report
                        </button>
                        <button
                            onClick={() => setActiveTab('payroll')}
                            className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Initiate Cycle
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Switcher */}
            <div className="flex bg-muted/50 p-1.5 rounded-[2rem] border border-border/50 w-full overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-2xl shadow-primary/30'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'payroll' && (isAdmin ? <PayrollDatabase /> : <Payroll />)}
                    {activeTab === 'benefits' && <Benefits />}
                    {activeTab === 'structure' && <SalaryStructure />}
                    {activeTab === 'variable' && <VariablePay />}
                    {activeTab === 'intelligence' && <CompIntelligence />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
