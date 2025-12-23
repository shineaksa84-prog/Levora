import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, Clock, MapPin, Building2, Linkedin, FileText, Star, BrainCircuit, Activity, MessageSquare } from 'lucide-react';
import { getAvailabilityExplanation } from '../../../lib/services/talentPoolService';

export default function ProfileSidebar({ candidate, onClose }) {
    const [activeTab, setActiveTab] = useState('overview'); // overview, timeline, intelligence

    if (!candidate) return null;

    const explanation = getAvailabilityExplanation(candidate);

    return (
        <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-border/50"
        >
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-muted/10 shrink-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-black text-primary">
                            {candidate.avatar}
                        </div>
                        <div>
                            <h2 className="text-xl font-black">{candidate.name}</h2>
                            <p className="text-sm font-medium text-muted-foreground">{candidate.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-colors">
                        Connect
                    </button>
                    <button className="flex-1 py-2 bg-white border border-border rounded-xl text-xs font-black uppercase tracking-widest hover:bg-muted transition-colors">
                        Add to Job
                    </button>
                    <button className="p-2 bg-white border border-border rounded-xl hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Navigation tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-white">
                {[
                    { id: 'overview', label: 'Overview', icon: FileText },
                    { id: 'timeline', label: 'Timeline', icon: Activity },
                    { id: 'intelligence', label: 'Intelligence', icon: BrainCircuit },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                                ? 'bg-muted text-primary'
                                : 'text-muted-foreground hover:bg-muted/50'
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Contact Card */}
                            <section className="bg-muted/30 rounded-xl p-4 space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Contact Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <Mail className="w-4 h-4 text-primary" />
                                        {candidate.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <Phone className="w-4 h-4 text-primary" />
                                        +1 (555) 000-0000
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {candidate.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <Linkedin className="w-4 h-4 text-primary" />
                                        linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}
                                    </div>
                                </div>
                            </section>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50/50 p-4 rounded-xl space-y-1">
                                    <div className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Match Score</div>
                                    <div className="text-2xl font-black text-blue-600">{candidate.matchScore}%</div>
                                </div>
                                <div className="bg-purple-50/50 p-4 rounded-xl space-y-1">
                                    <div className="text-[10px] font-black uppercase text-purple-400 tracking-widest">Availability</div>
                                    <div className="text-2xl font-black text-purple-600">{candidate.availabilityScore}</div>
                                </div>
                            </div>

                            {/* Quick Summary */}
                            <section className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Recruiter Summary</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {candidate.name} is a high-potential candidate with {candidate.tenureMonths} months of tenure.
                                    Strong background in {candidate.role} roles. Currently flagged as a {candidate.isSilverMedalist ? 'Silver Medalist' : 'Standard'} candidate.
                                </p>
                            </section>
                        </motion.div>
                    )}

                    {activeTab === 'intelligence' && (
                        <motion.div
                            key="intelligence"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <BrainCircuit className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Availability Analysis</h3>
                                        <div className="text-xs text-muted-foreground">AI Confidence: High</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {explanation.map((reason, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs font-medium text-foreground/80 bg-white/50 p-2 rounded-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                            {reason}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <section className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Market Signals</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-xl">
                                        <span className="text-xs font-bold">Salary Expectation</span>
                                        <span className="text-xs font-medium text-muted-foreground">within budget</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-xl">
                                        <span className="text-xs font-bold">Competitor Interest</span>
                                        <span className="text-xs font-medium text-red-400">High</span>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {activeTab === 'timeline' && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center py-10"
                        >
                            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                            <p className="text-sm font-bold text-muted-foreground">Timeline Integrated View</p>
                            <p className="text-xs text-muted-foreground/60">Using shared CandidateTimeline component</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// Helper icon
function MoreHorizontal({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
    )
}
