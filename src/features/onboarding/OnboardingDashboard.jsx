import { useState, useEffect } from 'react';
import {
    CheckSquare,
    Clock,
    AlertCircle,
    CheckCircle,
    User,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { generateOnboardingTasks, getOnboardingProgress } from '../../lib/services/onboardingAutomation';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    FileText,
    Laptop,
    Users,
    Calendar,
    Sparkles,
    Target
} from 'lucide-react';
import WorkflowBuilder from './WorkflowBuilder';
import DocumentVault from './DocumentVault';
import AssetAllocation from './AssetAllocation';
import BuddyAssignment from './BuddyAssignment';
import OrientationScheduler from './OrientationScheduler';

export default function OnboardingDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Workflows', icon: Layout, desc: 'Task Orchestration' },
        { id: 'documents', label: 'Document Vault', icon: FileText, desc: 'Digital Filing' },
        { id: 'assets', label: 'Asset Allocation', icon: Laptop, desc: 'Hardware & Access' },
        { id: 'mentorship', label: 'Mentorship', icon: Users, desc: 'Buddy System' },
        { id: 'orientation', label: 'Orientation', icon: Calendar, desc: 'Event Schedule' },
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
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary/80">Talent Integration</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            New Hire <span className="text-primary italic">Command Center</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Orchestrating the journey from 'Signed Offer' to 'Fully Productive'.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-6 py-4 glass-card hover:bg-white/5 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95">
                            View Pipeline
                        </button>
                        <button className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Initiate Onboarding
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
                                ? 'bg-primary text-white shadow-2xl shadow-primary/40 scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                            <div className="text-left">
                                <div className="text-xs font-black uppercase tracking-widest leading-none mb-0.5">{tab.label}</div>
                                <div className={`text-[8px] font-bold uppercase tracking-tighter opacity-60 ${isActive ? 'text-white/80' : ''}`}>{tab.desc}</div>
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
                    {activeTab === 'overview' && <WorkflowBuilder />}
                    {activeTab === 'documents' && <DocumentVault />}
                    {activeTab === 'assets' && <AssetAllocation />}
                    {activeTab === 'mentorship' && <BuddyAssignment />}
                    {activeTab === 'orientation' && <OrientationScheduler />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
