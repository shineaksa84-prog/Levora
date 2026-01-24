import { useState } from 'react';
import { Briefcase, Wand2, FileSearch, Sparkles, Plus, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JobList from '../features/jobs/JobList';
import JDGenerator from '../features/jobs/JDGenerator';
import ScreeningGenerator from '../features/jobs/ScreeningGenerator';
import AddJobModal from '../features/jobs/AddJobModal';

export default function Jobs() {
    const [activeTab, setActiveTab] = useState('list');
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const tabs = [
        { id: 'list', label: 'Active Jobs', icon: Briefcase, desc: 'Manage open positions' },
        { id: 'generator', label: 'AI JD Lab', icon: Wand2, desc: 'Generate & optimize JDs' },
        { id: 'screening', label: 'Screening Lab', icon: Target, desc: 'AI scorecards & questions' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header / Hero */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-vibrant-mesh p-10 border border-border/50">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-accent/80">Recruitment Engineering</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            Hiring <span className="text-primary italic">Command Center</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Centralized orchestration of job lifecycles, powered by advanced AI architectural tools.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Plus className="w-5 h-5" /> New Position
                    </button>
                </div>
            </div>

            {/* View Switcher Bar */}
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

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'list' && <JobList key={refreshKey} />}
                    {activeTab === 'generator' && <JDGenerator />}
                    {activeTab === 'screening' && <ScreeningGenerator />}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {showAddModal && (
                    <AddJobModal
                        onClose={() => setShowAddModal(false)}
                        onSuccess={() => {
                            setRefreshKey(prev => prev + 1);
                            setActiveTab('list');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
