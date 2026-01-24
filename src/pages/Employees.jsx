import { useState } from 'react';
import { Users, Network, Activity, UserPlus, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeList from '../features/employees/EmployeeList';
import OrgChart from '../features/employees/OrgChart';
import LifecycleDashboard from '../features/employees/LifecycleDashboard';
import ProfileManager from '../features/employees/ProfileManager';

export default function Employees() {
    const [activeTab, setActiveTab] = useState('directory');

    const tabs = [
        { id: 'directory', label: 'Directory', icon: Users, desc: 'Complete workforce records' },
        { id: 'org', label: 'Organization', icon: Network, desc: 'Visual hierarchy & teams' },
        { id: 'lifecycle', label: 'Lifecycle', icon: Activity, desc: 'Career path & transitions' },
        { id: 'management', label: 'Admin Tools', icon: UserPlus, desc: 'Profile & role settings' },
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
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-accent/80">Human Capital Management</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                            Workforce <span className="text-primary italic">Intelligence</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-sm">
                            Real-time management of your global team, organizational structure, and employee journey.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="bg-white/70 backdrop-blur-xl border border-border/50 rounded-2xl pl-11 pr-4 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-primary/10 transition-all w-64 shadow-xl"
                            />
                        </div>
                        <button className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                            <UserPlus className="w-5 h-5" /> Hire
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-start p-6 rounded-[2rem] border transition-all text-left group relative overflow-hidden ${isActive
                                    ? 'bg-white border-primary shadow-2xl shadow-primary/5'
                                    : 'bg-muted/30 border-border/50 hover:bg-white hover:border-primary/20'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="tab-active-bg"
                                    className="absolute inset-0 bg-primary/5 z-0"
                                />
                            )}
                            <div className={`p-3 rounded-2xl mb-4 relative z-10 transition-colors ${isActive ? 'bg-primary text-white' : 'bg-white text-muted-foreground group-hover:text-primary'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="relative z-10">
                                <h3 className={`font-black text-sm uppercase tracking-widest ${isActive ? 'text-primary' : 'text-foreground/60'}`}>
                                    {tab.label}
                                </h3>
                                <p className="text-[10px] font-medium text-muted-foreground mt-1">
                                    {tab.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'directory' && <EmployeeList />}
                    {activeTab === 'org' && <OrgChart />}
                    {activeTab === 'lifecycle' && <LifecycleDashboard />}
                    {activeTab === 'management' && <ProfileManager />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
