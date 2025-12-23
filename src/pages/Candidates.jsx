import { useState } from 'react';
import CandidateList from '../features/candidates/CandidateList';
import SmartActionsPanel from '../features/candidates/SmartActionsPanel';
import RecruiterDashboard from '../features/candidates/CRM/RecruiterDashboard';
import TalentPool from '../features/candidates/TalentPool/TalentPool';
import { LayoutGrid, Users, BarChart3, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Candidates() {
    const [view, setView] = useState('dashboard'); // dashboard, list, analytics

    return (
        <div className="relative min-h-[calc(100vh-6rem)] space-y-6">
            {/* View Switcher */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex bg-muted/50 p-1 rounded-2xl border border-border/50">
                    {[
                        { id: 'dashboard', label: 'Command Center', icon: LayoutGrid },
                        { id: 'list', label: 'Candidate Pipeline', icon: Users },
                        { id: 'pool', label: 'Talent Pool', icon: Globe },
                        { id: 'analytics', label: 'CRM Insights', icon: BarChart3 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all ${view === tab.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {view === 'dashboard' && <RecruiterDashboard />}
                    {view === 'list' && (
                        <>
                            <CandidateList />
                            <SmartActionsPanel />
                        </>
                    )}
                    {view === 'pool' && <TalentPool />}
                    {view === 'analytics' && (
                        <div className="glass-card p-12 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto">
                                <BarChart3 className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black italic">CRM Intelligence Suite</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto font-medium text-sm">
                                Deep ROI tracking, Source Prediction, and funnel velocity analytics are currently being synthesized.
                            </p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
