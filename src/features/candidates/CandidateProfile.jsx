import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Download, Share2, Eye, EyeOff, MoreHorizontal,
    Mail, Phone, Linkedin, Github, Globe, MapPin, Calendar,
    FileText, MessageSquare, Sparkles, Star, TrendingUp,
    Shield, Clock, Tag, UserPlus, Send, History, Briefcase,
    CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CandidateTimeline from './CandidateTimeline';

export default function CandidateProfile() {
    const { id } = useParams();
    const [blindMode, setBlindMode] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // profile, timeline, notes, intelligence

    // Enhanced Mock data for CRM features
    const candidate = useMemo(() => ({
        id: 'C-10293',
        name: 'Alice Freeman',
        role: 'Senior React Developer',
        email: 'alice.freeman@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        avatar: 'AF',
        source: 'LinkedIn (Outreach)',
        appliedDate: '2 weeks ago',
        stage: 'Interview',
        noticePeriod: '30 Days',
        salaryFlexibility: 'Negotiable',
        expectedSalary: '$165,000',
        about: 'Experienced Frontend Developer with 8+ years of expertise in React, TypeScript, and modern web technologies. Passionate about building accessible and performant user interfaces.',
        skills: [
            { name: 'React', confidence: 5 },
            { name: 'TypeScript', confidence: 4 },
            { name: 'Node.js', confidence: 4 },
            { name: 'GraphQL', confidence: 3 },
            { name: 'Tailwind CSS', confidence: 5 }
        ],
        tags: ['Strong Backend', 'Quick Joiner', 'Fintech Exp'],
        engagementScore: 92,
        sentiment: 'Positive',
        relationshipHealth: 'Active',
        experience: [
            { role: 'Senior Frontend Engineer', company: 'Tech Corp', duration: '2020 - Present' },
            { role: 'Frontend Developer', company: 'Web Solutions', duration: '2017 - 2020' },
        ],
        history: [
            { role: 'Frontend Architect', date: '2023', outcome: 'Declined (Salary)' },
            { role: 'Senior Dev', date: '2022', outcome: 'Rejected (Round 2)' }
        ]
    }), []);

    const tabs = [
        { id: 'profile', label: 'Resume & Profile', icon: FileText },
        { id: 'timeline', label: 'Interaction Timeline', icon: History },
        { id: 'notes', label: 'Recruiter Notes', icon: MessageSquare },
        { id: 'intelligence', label: 'CRM Intelligence', icon: Sparkles },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Link to="/candidates" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all group">
                    <div className="p-1 rounded-full group-hover:bg-muted transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to Pipeline
                </Link>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setBlindMode(!blindMode)}
                        className={`px-4 py-2 border rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${blindMode ? 'bg-primary/10 text-primary border-primary/20 shadow-inner' : 'bg-white border-border hover:border-primary/50 text-muted-foreground shadow-sm'}`}
                    >
                        {blindMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {blindMode ? 'Blind Mode On' : 'Blind Mode Off'}
                    </button>
                    <button className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-bold text-muted-foreground hover:border-primary/50 transition-all shadow-sm active:scale-95 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF Export
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Hire Candidate
                    </button>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="glass-card overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-8 border-b border-border/50">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="relative">
                            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl rotate-3 ${blindMode ? 'bg-muted text-muted-foreground' : 'bg-primary text-white'}`}>
                                {blindMode ? '??' : candidate.avatar}
                            </div>
                            {!blindMode && (
                                <div className="absolute -bottom-1 -right-1 p-1 bg-green-500 rounded-lg border-2 border-white shadow-xl">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl font-black tracking-tight">{blindMode ? `Candidate ${candidate.id}` : candidate.name}</h1>
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                    {candidate.stage}
                                </span>
                                {candidate.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-lg text-muted-foreground font-medium">{candidate.role}</p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <MapPin className="w-4 h-4 text-primary/60" />
                                    {candidate.location}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <Clock className="w-4 h-4 text-primary/60" />
                                    Notice: {candidate.noticePeriod}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <Tag className="w-4 h-4 text-primary/60" />
                                    Source: {candidate.source}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                                <div className="text-xs font-black uppercase tracking-tighter text-muted-foreground opacity-50">Engagement Health</div>
                                <div className="text-4xl font-black text-primary leading-none">{candidate.engagementScore}%</div>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${candidate.sentiment === 'Positive' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                }`}>
                                <TrendingUp className="w-3 h-3" />
                                {candidate.sentiment} Sentiment
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-border/50 px-8 bg-muted/20 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'profile' && (
                                <div className="grid gap-8 lg:grid-cols-3">
                                    <div className="lg:col-span-2 space-y-8">
                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 mb-4 flex items-center gap-2">
                                                <Info className="w-4 h-4" /> About Candidate
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-lg">
                                                {candidate.about}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 mb-4 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" /> Professional Journey
                                            </h3>
                                            <div className="space-y-6">
                                                {candidate.experience.map((exp, i) => (
                                                    <div key={i} className="flex gap-4 relative">
                                                        {i !== candidate.experience.length - 1 && (
                                                            <div className="absolute left-6 top-12 bottom-[-24px] w-px bg-border/50" />
                                                        )}
                                                        <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center shrink-0 border border-border/50">
                                                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                                                        </div>
                                                        <div className="flex-1 pb-4">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="font-black text-foreground">{exp.role}</p>
                                                                    <p className="text-sm font-bold text-primary/80">{blindMode ? 'Confidential' : exp.company}</p>
                                                                </div>
                                                                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                                    {exp.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    <div className="space-y-8">
                                        <section className="p-6 bg-muted/30 rounded-3xl border border-border/50">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Skill Confidence</h3>
                                            <div className="space-y-4">
                                                {candidate.skills.map(skill => (
                                                    <div key={skill.name} className="space-y-1.5">
                                                        <div className="flex justify-between text-xs font-bold">
                                                            <span>{skill.name}</span>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={`w-3 h-3 ${i < skill.confidence ? 'text-primary fill-primary' : 'text-muted'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-primary"
                                                                style={{ width: `${(skill.confidence / 5) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <section className="p-6 bg-muted/30 rounded-3xl border border-border/50">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Contact Logic</h3>
                                            {!blindMode ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 text-sm font-bold group">
                                                        <div className="p-2 bg-white rounded-xl border border-border group-hover:border-primary transition-colors cursor-pointer">
                                                            <Mail className="w-4 h-4 text-primary" />
                                                        </div>
                                                        {candidate.email}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm font-bold group">
                                                        <div className="p-2 bg-white rounded-xl border border-border group-hover:border-primary transition-colors cursor-pointer">
                                                            <Link2 className="w-4 h-4 text-primary" />
                                                        </div>
                                                        Social: LinkedIn
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 p-3 bg-background rounded-2xl border border-border border-dashed">
                                                    <Shield className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-xs font-bold text-muted-foreground">Active Blind Mode</span>
                                                </div>
                                            )}
                                        </section>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'timeline' && <CandidateTimeline />}

                            {activeTab === 'notes' && (
                                <div className="space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <EyeOff className="w-4 h-4" /> Private Recruiter Notes
                                            </h3>
                                            <div className="p-6 bg-yellow-50/50 rounded-3xl border border-yellow-100 min-h-[200px]">
                                                <p className="text-sm text-yellow-900 font-medium italic">
                                                    "Alice mentioned she is currently interviewing with Meta for a Similar role.
                                                    Salary flexibility exists but prefers base &gt; $160k. Strong leadership potential."
                                                </p>
                                                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-yellow-700 uppercase">
                                                    <Clock className="w-3 h-3" /> Updated 4 hours ago
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" /> Shared Discussion
                                            </h3>
                                            <div className="p-6 bg-muted/30 rounded-3xl border border-border/50 min-h-[200px] flex flex-col justify-end">
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">RK</div>
                                                        <div className="bg-white p-3 rounded-2xl border border-border text-xs shadow-sm shadow-black/5">
                                                            Great tech screen. Culture fit seems 10/10.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Write a message..."
                                                        className="flex-1 bg-white px-4 py-2 text-xs font-bold border border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10"
                                                    />
                                                    <button className="p-2 bg-primary text-white rounded-xl active:scale-95 transition-transform">
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'intelligence' && (
                                <div className="space-y-8">
                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <div className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">AI Availability Prediction</div>
                                                <div className="text-3xl font-black text-primary mb-2">High Availability</div>
                                                <p className="text-xs text-muted-foreground font-medium">Likely to close within 14 days based on engagement velocity.</p>
                                            </div>
                                            <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 group-hover:rotate-12 transition-transform" />
                                        </div>
                                        <div className="p-8 bg-muted/30 rounded-3xl border border-border/50">
                                            <div className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Historical Application Relevancy</div>
                                            <div className="text-3xl font-black text-foreground mb-2">94% Reusable</div>
                                            <p className="text-xs text-muted-foreground font-medium">Matches 4 other open roles in current pipeline.</p>
                                        </div>
                                        <div className="p-8 bg-muted/30 rounded-3xl border border-border/50">
                                            <div className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Sentiment Drift</div>
                                            <div className="text-3xl font-black text-green-600 mb-2">+12% Upward</div>
                                            <p className="text-xs text-muted-foreground font-medium">Increasingly positive feedback in last 2 touchpoints.</p>
                                        </div>
                                    </div>

                                    <section className="p-8 bg-background border border-border rounded-3xl overflow-hidden shadow-xl shadow-black/5">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Past Application Outcomes</h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {candidate.history.map((h, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50 group hover:border-primary/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                                                            <AlertCircle className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black">{h.role}</div>
                                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{h.date} Applied</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-black text-red-600 uppercase tracking-tighter bg-red-50 px-2 py-1 rounded-md border border-red-100">
                                                        {h.outcome}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Helper icon
function Link2({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    )
}
