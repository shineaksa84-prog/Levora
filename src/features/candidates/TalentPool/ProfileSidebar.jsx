import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, Clock, MapPin, Building2, Linkedin, FileText, Star, BrainCircuit, Activity, MessageSquare, CheckCircle2, MoreHorizontal, ShieldCheck, AlertCircle } from 'lucide-react';
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
                    { id: 'interviews', label: 'Interviews', icon: ShieldCheck },
                    { id: 'closing', label: 'Closing', icon: Rocket },
                    { id: 'integrity', label: 'Integrity', icon: ShieldAlert },
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
                                <div className="bg-green-50/50 p-4 rounded-xl space-y-1 relative overflow-hidden">
                                    <div className="text-[10px] font-black uppercase text-green-400 tracking-widest">Sentiment Health</div>
                                    <div className="text-2xl font-black text-green-600">{candidate.sentimentScore}%</div>
                                    <div className="absolute bottom-0 left-0 h-1 bg-green-500" style={{ width: `${candidate.sentimentScore}%` }} />
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

                    {activeTab === 'interviews' && (
                        <motion.div
                            key="interviews"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(candidate.interviewScores || {}).map(([key, val]) => (
                                    <div key={key} className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                                        <div className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <div key={s} className={`w-2 h-2 rounded-full ${s <= val ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Interviewer Evidence</h4>
                                <div className="space-y-3">
                                    {(candidate.interviewerFeedback || []).map((fb, idx) => (
                                        <div key={idx} className="p-4 bg-white border border-border/50 rounded-2xl space-y-2 group hover:border-primary/50 transition-all">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">
                                                        {fb.interviewer.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-xs font-black">{fb.interviewer}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground">{fb.date}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed italic">"{fb.comment}"</p>
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3 text-green-500" />
                                                <span className="text-[8px] font-black uppercase text-green-600 tracking-tighter">Bias Verified</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                                <div className="text-[8px] font-black uppercase text-amber-700 leading-tight">
                                    Decision Velocity: {candidate.decisionVelocityDays} days since final interview.<br />
                                    <span className="opacity-60 underline cursor-pointer">Expedite Offer Protocol</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'closing' && (
                        <motion.div
                            key="closing"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <p className="text-[10px] font-black uppercase text-primary mb-1">Comp Alignment</p>
                                    <p className="text-xl font-black">{candidate.offerIntelligence?.compAlignmentScore}%</p>
                                </div>
                                <div className={`p-4 rounded-2xl border ${candidate.offerIntelligence?.counterOfferRisk === 'High' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                                    <p className="text-[10px] font-black uppercase mb-1">Counter-Risk</p>
                                    <p className="text-xl font-black">{candidate.offerIntelligence?.counterOfferRisk}</p>
                                </div>
                            </div>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Closing Checklist</h4>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Pre-Offer Call Completed', status: candidate.offerIntelligence?.preOfferCallCompleted },
                                        { label: 'Growth Path Synthesized', status: candidate.offerIntelligence?.growthPathShared },
                                        { label: 'HM Verbal Re-close', status: candidate.offerIntelligence?.reClosed },
                                        { label: 'Warming Sequence Active', status: candidate.offerIntelligence?.warmingStatus === 'Warmed' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                                            <span className="text-xs font-bold">{item.label}</span>
                                            {item.status ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-dashed border-muted-foreground/30" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Notice Period Heatmap</p>
                                <div className="flex gap-1 h-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <div key={i} className={`flex-1 rounded-full ${i <= 3 ? 'bg-primary' : 'bg-muted-foreground/10'}`} />
                                    ))}
                                </div>
                                <p className="text-[8px] font-bold text-muted-foreground mt-2 uppercase">Week 3 of 8 • Warming Pulse Active</p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'integrity' && (
                        <motion.div
                            key="integrity"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center space-y-2">
                                <ShieldCheck className="w-10 h-10 text-primary mx-auto opacity-50" />
                                <h4 className="text-2xl font-black">{candidate.operationsIntelligence?.dataIntegrityScore}%</h4>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Data Integrity Score</p>
                            </div>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Compliance Audit</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-white border border-border/50 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${candidate.operationsIntelligence?.sopCompliance ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="text-xs font-bold">SOP Adherence</span>
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-muted-foreground">
                                            {candidate.operationsIntelligence?.sopCompliance ? 'Compliant' : 'Gap Detected'}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 space-y-2">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">Missing Metadata</p>
                                        <div className="flex flex-wrap gap-2">
                                            {candidate.operationsIntelligence?.missingTags?.length > 0 ? (
                                                candidate.operationsIntelligence.missingTags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-red-100 text-red-600 text-[8px] font-black uppercase rounded-lg border border-red-200">
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[8px] font-black uppercase text-green-600">All Tags Present</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">Post-Hire Loop (90d)</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold">Quality assigned by HM</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <div key={s} className={`w-3 h-1 rounded-full ${s <= 4 ? 'bg-primary' : 'bg-muted-foreground/10'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'timeline' && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                {[
                                    { label: 'Application Acknowledged', date: '2 days ago', status: 'completed', icon: CheckCircle2 },
                                    { label: 'Timeline & Process Shared', date: '2 days ago', status: 'completed', icon: CheckCircle2 },
                                    { label: 'Interview Format Confirmed', date: 'Yesterday', status: 'completed', icon: CheckCircle2 },
                                    { label: 'Prep Resources Shared', date: 'Yesterday', status: 'completed', icon: CheckCircle2 },
                                    { label: 'First Interview', date: 'Today, 10:00 AM', status: 'active', icon: Clock },
                                    { label: 'Post-Interview Thank You', date: 'Scheduled: 1:00 PM', status: 'pending', icon: Mail },
                                    { label: 'Final Decision SLA', date: 'Deadline: Jan 10', status: 'pending', icon: Calendar },
                                ].map((item, idx) => (
                                    <div key={idx} className="relative flex gap-4">
                                        {idx !== 6 && <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-border/50" />}
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${item.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            item.status === 'active' ? 'bg-primary text-white shadow-lg' :
                                                'bg-muted text-muted-foreground'
                                            }`}>
                                            <item.icon className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black ${item.status === 'active' ? 'text-primary' : 'text-foreground'}`}>{item.label}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-tighter">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <section className="p-4 bg-muted/30 rounded-2xl space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Experience Concierge</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary">EG</div>
                                    <div>
                                        <p className="text-xs font-black">Elena G.</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Single Point of Contact</p>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}


