import { useState } from 'react';
import CandidateList from '../features/candidates/CandidateList';
import SmartActionsPanel from '../features/candidates/SmartActionsPanel';
import RecruiterDashboard from '../features/candidates/CRM/RecruiterDashboard';
import TalentPool from '../features/candidates/TalentPool/TalentPool';
import CRMIntelligence from '../features/candidates/CRM/CRMIntelligence';
import ArchivedCandidates from '../features/candidates/ArchivedCandidates';
import { LayoutGrid, Users, BarChart3, Globe, Archive, Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddCandidateModal from '../features/candidates/AddCandidateModal';
import MagneticButton from '../components/ui/MagneticButton';

export default function Candidates() {
    const [view, setView] = useState('dashboard'); // dashboard, list, pool, analytics, archive
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const tabs = [
        { id: 'dashboard', label: 'Command Center', icon: LayoutGrid, desc: 'Overview & Metrics' },
        { id: 'list', label: 'Pipeline', icon: Users, desc: 'Active Applications' },
        { id: 'pool', label: 'Talent Pool', icon: Globe, desc: 'Sourced Candidates' },
        { id: 'analytics', label: 'CRM Intelligence', icon: BarChart3, desc: 'Data Insights' },
        { id: 'archive', label: 'Archive', icon: Archive, desc: 'Historical Records' },
    ];

    return (
        <div className="min-h-[calc(100vh-6rem)] space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Talent Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        Candidates <span className="gradient-text italic">Command</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Manage the entire candidate lifecycle from sourcing to placement with precision.
                    </p>
                </div>
                <div>
                    <MagneticButton>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="cyber-button-primary flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Candidate
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* View Switcher */}
            <div className="flex glass-card p-1.5 rounded-[2rem] w-full overflow-x-auto no-scrollbar border-primary/10">
                {tabs.map((tab) => {
                    const isActive = view === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all whitespace-nowrap group min-w-fit font-bold ${isActive
                                ? 'bg-primary text-primary-foreground shadow-[0_0_30px_rgba(226,149,120,0.4)] scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            <div className="text-left">
                                <span className={`text-xs font-black uppercase tracking-wider block`}>{tab.label}</span>
                                {isActive && <span className="text-[9px] font-bold opacity-70 block tracking-tight">{tab.desc}</span>}
                            </div>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {view === 'dashboard' && <RecruiterDashboard key={`db-${refreshKey}`} />}
                    {view === 'list' && (
                        <div className="space-y-6">
                            <CandidateList key={`list-${refreshKey}`} />
                            <SmartActionsPanel />
                        </div>
                    )}
                    {view === 'pool' && <TalentPool key={`pool-${refreshKey}`} />}
                    {view === 'analytics' && <CRMIntelligence />}
                    {view === 'archive' && <ArchivedCandidates />}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {showAddModal && (
                    <AddCandidateModal
                        onClose={() => setShowAddModal(false)}
                        onSuccess={() => {
                            setRefreshKey(prev => prev + 1);
                            setView('list');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
