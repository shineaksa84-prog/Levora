import { useState } from 'react';
import { Target, BookOpen, TrendingUp, Award, Grid, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoalsDashboard from '../features/performance/GoalsDashboard';
import OKRManager from '../features/performance/OKRManager';
import LearningHub from '../features/learning/LearningHub';
import SkillsMatrix from '../features/learning/SkillsMatrix';
import PerformanceReviews from '../features/performance/PerformanceReviews';
import NineBoxGrid from '../features/performance/NineBoxGrid';
import SuccessionPlanner from '../features/performance/SuccessionPlanner';

export default function Performance() {
    const [activeTab, setActiveTab] = useState('goals');

    const tabs = [
        { id: 'goals', label: 'Dashboard', icon: Target, desc: 'Performance Overview' },
        { id: 'matrix', label: 'OKR Matrix', icon: Grid, desc: 'Strategic Alignment' },
        { id: 'reviews', label: 'Reviews', icon: TrendingUp, desc: 'Feedback Cycles' },
        { id: 'calibration', label: 'Calibration', icon: Grid, desc: 'Talent Matrix' },
        { id: 'succession', label: 'Succession', icon: Crown, desc: 'Leadership Continuity' },
        { id: 'learning', label: 'Learning Lab', icon: BookOpen, desc: 'Skill Synthesis' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Executive Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-vibrant-mesh p-10 border border-border/50">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/80">Performance Engineering</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            Workforce <span className="text-primary italic">Optimization</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Mapping the convergence of potential, performance, and leadership resilience.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-6 py-4 glass-card hover:bg-white/5 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95">
                            Export Analytics
                        </button>
                        <button className="px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Initiate Cycle B4
                        </button>
                    </div>
                </div>
            </div>

            {/* View Switcher */}
            <div className="flex glass-card p-1.5 rounded-[2rem] w-full overflow-x-auto no-scrollbar border-primary/10">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all whitespace-nowrap group ${isActive
                                ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            <div className="text-left">
                                <div className="text-xs font-black uppercase tracking-widest leading-none mb-0.5">{tab.label}</div>
                                <div className={`text-[8px] font-bold uppercase tracking-tighter opacity-60 ${isActive ? 'text-primary-foreground/80' : ''}`}>{tab.desc}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'goals' && <GoalsDashboard />}
                    {activeTab === 'matrix' && <OKRManager />}
                    {activeTab === 'learning' && <LearningHub />}
                    {activeTab === 'skills' && <SkillsMatrix />}
                    {activeTab === 'reviews' && <PerformanceReviews />}
                    {activeTab === 'calibration' && <NineBoxGrid />}
                    {activeTab === 'succession' && <SuccessionPlanner />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
