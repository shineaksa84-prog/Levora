import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Download, Share2, Eye, EyeOff, MoreHorizontal,
    Mail, Phone, Linkedin, Github, Globe, MapPin, Calendar,
    FileText, MessageSquare, Sparkles, Star, TrendingUp,
    Shield, Clock, Tag, UserPlus, Send, History, Briefcase,
    CheckCircle2, AlertCircle, Info, Copy, ShieldCheck, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CandidateTimeline from './CandidateTimeline';
import BackgroundVerification from '../compliance/BackgroundVerification';

export default function CandidateProfile() {
    const { id } = useParams();
    const [blindMode, setBlindMode] = useState(false);
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem(`pinned_tab_${id}`) || 'profile');
    const [copiedField, setCopiedField] = useState(null);

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
        ],
        // Mocking the new recruiter context fields
        recruiterContext: {
            dwellTimeDays: 8,
            avgStageDays: 4,
            duplicateExists: true,
            duplicateName: 'John D.',
            feedbackStatus: [
                { interviewer: 'Sarah Chen', status: 'Submitted', time: '2h ago' },
                { interviewer: 'Mike Ross', status: 'Pending', time: 'Overdue by 1d' },
                { interviewer: 'Elena G.', status: 'Skipped', time: 'N/A' }
            ],
            followUpDate: '2026-01-08T10:00:00.000Z',
            flags: {
                compMismatch: 'Borderline',
                noticeRisk: 'Medium',
                locationIssue: 'No',
                offerRisk: false,
                prevInterviewed: true
            }
        },
        offerIntelligence: {
            compAlignmentScore: 82,
            counterOfferRisk: 'Medium',
            reClosed: false,
            warmingStatus: 'Pending Nudge'
        },
        operationsIntelligence: {
            dataIntegrityScore: 94,
            sopCompliance: true,
            missingTags: ['Portfolio Missing']
        }
    }), []);

    const [flags, setFlags] = useState(candidate.recruiterContext.flags);

    const toggleFlag = (key, options) => {
        const currentIndex = options.indexOf(flags[key]);
        const nextIndex = (currentIndex + 1) % options.length;
        setFlags(prev => ({ ...prev, [key]: options[nextIndex] }));
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeys = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key.toLowerCase() === 'n') setActiveTab('notes');
            if (e.key.toLowerCase() === 'f') setActiveTab('evaluation');
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, []);

    // Tab Pinning
    useEffect(() => {
        localStorage.setItem(`pinned_tab_${id}`, activeTab);
    }, [activeTab, id]);

    const tabs = [
        { id: 'profile', label: 'Resume & Profile', icon: User },
        { id: 'timeline', label: 'Interaction Timeline', icon: Calendar },
        { id: 'evaluation', label: 'Evaluation Tracker', icon: Star },
        { id: 'outreach', label: 'AI Outreach Engine', icon: Mail },
        { id: 'notes', label: 'Recruiter Notes', icon: MessageSquare },
        { id: 'closing', label: 'Closing & Offers', icon: Briefcase },
        { id: 'intelligence', label: 'Intelligence', icon: Sparkles },
        { id: 'integrity', label: 'Ops & Integrity', icon: ShieldCheck },
    ];

    const [outreachConfig, setOutreachConfig] = useState({ channel: 'Email', tone: 'Professional' });
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateOutreach = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const content = {
                Email: {
                    Professional: `Subject: Opportunity at Levora - ${candidate.role}\n\nHi ${candidate.name.split(' ')[0]},\n\nI'm reaching out from Levora. We've been impressed by your background in ${candidate.skills[0].name} and think you'd be a great fit for our ${candidate.role} opening. Would you be open to a brief chat next week?\n\nBest,\nRecruiter`,
                    Casual: `Subject: Career next steps?\n\nHey ${candidate.name.split(' ')[0]}!\n\nSaw your profile and loved what you're doing. We're looking for a ${candidate.role} and your ${candidate.skills[0].name} skills caught my eye. Let's grab a virtual coffee?`,
                    Direct: `Subject: Levora is Hiring: ${candidate.role}\n\n${candidate.name},\n\nWe have a ${candidate.role} role open. Your experience at ${candidate.experience[0].company} makes you a top candidate. Are you interested in discussing this?`
                },
                LinkedIn: {
                    Professional: `Hi ${candidate.name.split(' ')[0]}, I'm impressed by your experience as a ${candidate.role}. I'd love to connect and share more about what we're building at Levora.`,
                    Casual: `Hey ${candidate.name.split(' ')[0]}! 👋 Loving your work in ${candidate.skills[0].name}. We're scaling our team—would love to chat!`,
                    Direct: `Hi ${candidate.name}, interested in a ${candidate.role} role at Levora? Let's connect.`
                }
            };
            setGeneratedContent(content[outreachConfig.channel][outreachConfig.tone]);
            setIsGenerating(false);
        }, 800);
    };

    return (
        <div className="min-h-screen pb-20 space-y-6">
            {/* Duplicate Profile Alert */}
            {candidate.recruiterContext.duplicateExists && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-amber-900">Similar Profile Detected</p>
                            <p className="text-xs font-bold text-amber-700/80">
                                A profile for <span className="underline cursor-pointer">{candidate.recruiterContext.duplicateName}</span> exists (Interviewed 3 months ago).
                            </p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/10">
                        View Context
                    </button>
                </motion.div>
            )}

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Link to="/app" className="hover:text-foreground transition-colors">Dashboard</Link>
                    <span>/</span>
                    <Link to="/candidates" className="hover:text-foreground transition-colors">Candidates</Link>
                    <span>/</span>
                    <span className="text-foreground font-bold">{blindMode ? candidate.id : candidate.name}</span>
                </div>
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
                                    {candidate.recruiterContext.dwellTimeDays} days in stage
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${candidate.recruiterContext.dwellTimeDays > candidate.recruiterContext.avgStageDays ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        (Avg: {candidate.recruiterContext.avgStageDays}d)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <Tag className="w-4 h-4 text-primary/60" />
                                    Source: {candidate.source}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <TrendingUp className="w-4 h-4 text-primary/60" />
                                    Market Median: ${candidate.recruiterContext.marketSalaryRange.median.toLocaleString()}
                                </div>
                            </div>

                            {/* Strategic Header Flags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <button
                                    onClick={() => toggleFlag('compMismatch', ['No', 'Yes', 'Borderline'])}
                                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${flags.compMismatch === 'Yes' ? 'bg-red-50 border-red-200 text-red-600' : flags.compMismatch === 'Borderline' ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-border text-muted-foreground'}`}
                                >
                                    💰 Comp: {flags.compMismatch}
                                </button>
                                <button
                                    onClick={() => toggleFlag('noticeRisk', ['Low', 'Medium', 'High'])}
                                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${flags.noticeRisk === 'High' ? 'bg-red-50 border-red-200 text-red-600' : flags.noticeRisk === 'Medium' ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-border text-muted-foreground'}`}
                                >
                                    ⏳ Notice: {flags.noticeRisk}
                                </button>
                                <button
                                    onClick={() => toggleFlag('locationIssue', ['No', 'Yes'])}
                                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${flags.locationIssue === 'Yes' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-border text-muted-foreground'}`}
                                >
                                    📍 Location Issue: {flags.locationIssue}
                                </button>
                                {flags.prevInterviewed && (
                                    <div className="px-3 py-1.5 rounded-xl border bg-violet-50 border-violet-200 text-violet-600 text-[10px] font-black uppercase tracking-widest">
                                        🔁 Previously Interviewed
                                    </div>
                                )}
                                <button
                                    onClick={() => setFlags(prev => ({ ...prev, offerRisk: !prev.offerRisk }))}
                                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${flags.offerRisk ? 'bg-red-600 border-red-700 text-white shadow-lg shadow-red-900/20' : 'bg-white border-border text-muted-foreground hover:border-red-200'}`}
                                >
                                    ⚠️ Offer Risk
                                </button>
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
                            {activeTab === 'outreach' && (
                                <div className="grid gap-8 lg:grid-cols-3">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="p-8 bg-white border border-border rounded-3xl space-y-6 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-primary" /> AI Outreach Generator
                                                </h3>
                                                <div className="flex gap-2">
                                                    {['Email', 'LinkedIn'].map(ch => (
                                                        <button
                                                            key={ch}
                                                            onClick={() => setOutreachConfig(prev => ({ ...prev, channel: ch }))}
                                                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${outreachConfig.channel === ch ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'}`}
                                                        >
                                                            {ch}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 p-4 bg-muted/20 rounded-2xl border border-border">
                                                {['Professional', 'Casual', 'Direct'].map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setOutreachConfig(prev => ({ ...prev, tone: t }))}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${outreachConfig.tone === t ? 'bg-white border border-primary text-primary shadow-sm' : 'text-muted-foreground hover:bg-white/50'}`}
                                                    >
                                                        {t} Tone
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="relative group">
                                                <textarea
                                                    value={generatedContent}
                                                    onChange={(e) => setGeneratedContent(e.target.value)}
                                                    placeholder="Focusing on skills, seniority and growth track..."
                                                    className="w-full h-48 bg-muted/10 border border-border rounded-2xl p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                                                />
                                                {isGenerating && (
                                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                                                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs animate-pulse">
                                                            <Sparkles className="w-4 h-4" /> Synthesizing Outreach...
                                                        </div>
                                                    </div>
                                                )}
                                                {!generatedContent && !isGenerating && (
                                                    <button
                                                        onClick={generateOutreach}
                                                        className="absolute bottom-6 right-6 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                                                    >
                                                        Generate Message
                                                    </button>
                                                )}
                                            </div>

                                            {generatedContent && (
                                                <div className="flex gap-3">
                                                    <button className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                                                        Open in {outreachConfig.channel}
                                                    </button>
                                                    <button
                                                        onClick={() => copyToClipboard(generatedContent, 'outreach')}
                                                        className="px-6 py-4 bg-white border border-border rounded-2xl text-xs font-black uppercase tracking-widest hover:border-primary transition-colors"
                                                    >
                                                        {copiedField === 'outreach' ? 'Copied!' : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <section className="p-8 bg-muted/30 rounded-3xl border border-border/50">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Outreach Insights</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs font-bold">
                                                    <span className="text-muted-foreground">Est. Reply Prob.</span>
                                                    <span className="text-green-600">82% (High)</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs font-bold">
                                                    <span className="text-muted-foreground">Best Time to Send</span>
                                                    <span className="text-primary">Tue, 10:30 AM</span>
                                                </div>
                                                <div className="pt-4 border-t border-border/50">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">Past Interactions</p>
                                                    <div className="space-y-3">
                                                        {candidate.recruiterContext.outreachHistory.map((h, i) => (
                                                            <div key={i} className="flex gap-3">
                                                                <div className="p-2 bg-white rounded-lg border border-border/50 h-fit">
                                                                    <Mail className="w-3 h-3 text-primary/60" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-[10px] font-black">{h.date} - {h.type}</div>
                                                                    <div className="text-[8px] font-bold text-muted-foreground truncate w-32">{h.subject}</div>
                                                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${h.outcome === 'Replied' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>{h.outcome}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )}

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
                                                    <div
                                                        onClick={() => copyToClipboard(candidate.email, 'email')}
                                                        className="flex items-center gap-3 text-sm font-bold group cursor-pointer"
                                                    >
                                                        <div className="p-2 bg-white rounded-xl border border-border group-hover:border-primary transition-colors">
                                                            <Mail className={`w-4 h-4 ${copiedField === 'email' ? 'text-green-500' : 'text-primary'}`} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-muted-foreground text-[10px] font-black uppercase">Email</span>
                                                            {candidate.email}
                                                        </div>
                                                        {copiedField === 'email' && <span className="ml-auto text-[10px] text-green-600 bg-green-50 px-2 rounded-md">Copied!</span>}
                                                    </div>
                                                    <div
                                                        onClick={() => copyToClipboard(candidate.phone, 'phone')}
                                                        className="flex items-center gap-3 text-sm font-bold group cursor-pointer"
                                                    >
                                                        <div className="p-2 bg-white rounded-xl border border-border group-hover:border-primary transition-colors">
                                                            <Phone className={`w-4 h-4 ${copiedField === 'phone' ? 'text-green-500' : 'text-primary'}`} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-muted-foreground text-[10px] font-black uppercase">Phone</span>
                                                            {candidate.phone}
                                                        </div>
                                                        {copiedField === 'phone' && <span className="ml-auto text-[10px] text-green-600 bg-green-50 px-2 rounded-md">Copied!</span>}
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

                            {activeTab === 'timeline' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="flex items-center gap-3">
                                            <Calendar className={`w-5 h-5 ${new Date() > new Date(candidate.recruiterContext.followUpDate) ? 'text-amber-500' : 'text-primary'}`} />
                                            <div>
                                                <p className="text-sm font-black">Next Follow-up Reminder</p>
                                                <p className={`text-xs font-bold ${new Date() > new Date(candidate.recruiterContext.followUpDate) ? 'text-amber-600' : 'text-muted-foreground'}`}>
                                                    Scheduled for {new Date(candidate.recruiterContext.followUpDate).toLocaleDateString()}
                                                    {new Date() > new Date(candidate.recruiterContext.followUpDate) && " (Missed)"}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black uppercase px-3 py-1 bg-white border border-border rounded-lg shadow-sm">
                                            Reschedule
                                        </button>
                                    </div>
                                    <CandidateTimeline />
                                </div>
                            )}

                            {activeTab === 'evaluation' && (
                                <div className="space-y-8">
                                    <section>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-6">
                                            <Star className="w-4 h-4" /> Interview Feedback Tracker
                                        </h3>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {candidate.recruiterContext.feedbackStatus.map((fb, i) => (
                                                <div key={i} className="p-6 bg-muted/20 border border-border/50 rounded-3xl relative overflow-hidden group">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center font-bold text-xs">
                                                                {fb.interviewer[0]}
                                                            </div>
                                                            <div className="text-xs font-black">{fb.interviewer}</div>
                                                        </div>
                                                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${fb.status === 'Submitted' ? 'bg-green-100 text-green-700' :
                                                            fb.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-muted text-muted-foreground'
                                                            }`}>
                                                            {fb.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] font-bold text-muted-foreground mt-2">
                                                        {fb.time}
                                                    </p>
                                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
                                                        <div className={`h-full ${fb.status === 'Submitted' ? 'bg-green-500 w-full' : fb.status === 'Pending' ? 'bg-amber-500 w-1/2' : 'bg-muted-foreground w-0'}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="p-8 bg-white border border-border rounded-3xl">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Detailed Scorecards</h3>
                                                <p className="text-xs font-medium text-muted-foreground">Technical depth and cultural alignment verification.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-primary/20">
                                                New Evaluation (F)
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {['Technical Depth', 'Communication', 'Leadership', 'Problem Solving'].map(category => (
                                                <div key={category} className="flex items-center justify-between p-4 bg-muted/10 rounded-2xl border border-dashed border-border">
                                                    <span className="text-sm font-bold">{category}</span>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <Star key={star} className="w-4 h-4 text-primary fill-primary" />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div className="space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                    <EyeOff className="w-4 h-4" /> Private Recruiter Notes
                                                </h3>
                                                <span className="text-[8px] font-black uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">Last updated by RK</span>
                                            </div>
                                            <div className="p-6 bg-yellow-50/50 rounded-3xl border border-yellow-100 min-h-[200px]">
                                                <p className="text-sm text-yellow-900 font-medium italic">
                                                    "Alice mentioned she is currently interviewing with Meta for a Similar role.
                                                    Salary flexibility exists but prefers base {'>'} $160k. Strong leadership potential."
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
                                                        placeholder="Write a message... (N)"
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

                            {activeTab === 'closing' && (
                                <div className="space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="p-8 bg-violet-50 rounded-3xl border border-violet-100 space-y-4">
                                            <div>
                                                <h3 className="text-sm font-black uppercase tracking-widest text-violet-700">Compensation Alignment</h3>
                                                <p className="text-3xl font-black text-violet-900 mt-2">{candidate.offerIntelligence.compAlignmentScore}%</p>
                                            </div>
                                            <div className="h-2 w-full bg-violet-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-violet-600" style={{ width: `${candidate.offerIntelligence.compAlignmentScore}%` }} />
                                            </div>
                                            <p className="text-xs font-bold text-violet-700/70">Candidate expectations are within 10% of budget range.</p>
                                        </div>
                                        <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Closing Status</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${candidate.offerIntelligence.reClosed ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`} />
                                                    <span className="text-sm font-bold">Verbal Re-close: {candidate.offerIntelligence.reClosed ? 'Confirmed' : 'Pending'}</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase px-2 py-1 bg-white rounded-lg border border-border">{candidate.offerIntelligence.warmingStatus}</span>
                                            </div>
                                            <div className="flex gap-2 pt-4">
                                                <button className="flex-1 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">Send Strategic Offer</button>
                                                <button className="px-4 py-3 bg-white border border-border rounded-2xl text-xs font-black uppercase tracking-widest text-red-600">Mark High Risk</button>
                                            </div>
                                        </div>
                                    </div>

                                    <section className="p-8 bg-white border border-border rounded-3xl">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Warming Sequence (Notice Period)</h3>
                                        <div className="space-y-4">
                                            {[
                                                { step: 'Day 1: Welcome Kit & Growth Roadmap', status: 'Done' },
                                                { step: 'Day 5: HM Coffee Chat (Virtual)', status: 'Pending' },
                                                { step: 'Day 15: Tech Stack Deep Dive', status: 'Scheduled' }
                                            ].map((seq, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-muted/10 rounded-2xl border border-border">
                                                    <span className="text-sm font-bold text-muted-foreground">{seq.step}</span>
                                                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${seq.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>{seq.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'integrity' && (
                                <div className="space-y-8">
                                    <div className="p-8 bg-green-50 rounded-3xl border border-green-100 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-green-700">Data Integrity Score</h3>
                                            <div className="flex items-end gap-2 mt-2">
                                                <p className="text-5xl font-black text-green-900 leading-none">{candidate.operationsIntelligence.dataIntegrityScore}%</p>
                                                <p className="text-xs font-black text-green-700/60 pb-1.5 uppercase tracking-widest">Structural Health</p>
                                            </div>
                                        </div>
                                        <div className={`p-4 rounded-2xl ${candidate.operationsIntelligence.sopCompliance ? 'bg-green-600' : 'bg-red-600'} text-white text-center`}>
                                            <p className="text-[10px] font-black uppercase tracking-tighter">SOP Status</p>
                                            <p className="text-lg font-black uppercase">{candidate.operationsIntelligence.sopCompliance ? 'Compliant' : 'Non-Compliant'}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <section className="p-8 bg-white border border-border rounded-3xl">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Audit Checklist</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { task: 'Structured Scorecard Attached', status: true },
                                                    { task: 'Comp Benchmarked to Role', status: true },
                                                    { task: 'Sourcing Source Tagged', status: true },
                                                    { task: 'Diversity Meta-Tags Present', status: false },
                                                    { task: 'Notice Period Verified', status: true }
                                                ].map((task, i) => (
                                                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                                        <span className="text-sm font-bold">{task.task}</span>
                                                        {task.status ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <section className="p-8 bg-muted/10 border border-border border-dashed rounded-3xl">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Missing Integrity Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {candidate.operationsIntelligence.missingTags.map(tag => (
                                                    <span key={tag} className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                                                        <Tag className="w-3 h-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                                {candidate.operationsIntelligence.missingTags.length === 0 && (
                                                    <p className="text-sm font-bold text-muted-foreground italic">No missing tags detected.</p>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Helper icons
function Link2({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    )
}

