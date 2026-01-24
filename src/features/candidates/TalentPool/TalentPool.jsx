import { useState, useMemo, useEffect } from 'react';
import {
    Search, Filter, Settings, Download, Mail, Phone,
    MoreHorizontal, Star, Zap, Clock, MapPin,
    CheckSquare, Square, ChevronDown, ChevronRight,
    ArrowUpDown, UserPlus, Trash2, Tag, Share2,
    Calendar, MessageSquare, Shield, AlertCircle,
    Info, Sparkles, TrendingUp, Globe, Link as LinkIcon,
    BarChart3, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getEnrichedTalentPool, parseNaturalLanguageQuery, scanForDuplicates, filterCandidates, saveView, getSavedViews } from '../../../lib/services/talentPoolService';
import { ScanLine, BookmarkIcon, BookMarked } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';
import ComparisonBench from './ComparisonBench';
import OutreachGenerator from '../../recruitment/OutreachGenerator';
import FeedbackGenerator from '../../recruitment/FeedbackGenerator';
import InterviewScorecard from '../../recruitment/InterviewScorecard';
import OfferGenerator from '../../recruitment/OfferGenerator';
import { toast } from '../../../lib/services/toastService';

export default function TalentPool() {
    const navigate = useNavigate();
    const [view, setView] = useState('table'); // table, grid
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null); // Sidebar state
    const [searchQuery, setSearchQuery] = useState('');
    const [aiInterpretation, setAiInterpretation] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [density, setDensity] = useState('standard'); // compact, standard, comfortable
    const [showOutreach, setShowOutreach] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showScorecard, setShowScorecard] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [activeCandidate, setActiveCandidate] = useState(null);

    // New State for Phase 2
    const [savedViews, setSavedViews] = useState([]);
    const [currentFilters, setCurrentFilters] = useState({
        location: 'All',
        role: '',
        minAvailability: 0,
        minTenure: 0,
        tags: [],
        query: ''
    });

    // Column visibility toggle
    const [visibleColumns, setVisibleColumns] = useState([
        'selection', 'name', 'role', 'status', 'location', 'match', 'availability', 'lastContact', 'actions'
    ]);

    useEffect(() => {
        loadData();
    }, []);

    // Filter Logic
    useEffect(() => {
        const filtered = filterCandidates(candidates, currentFilters);
        setFilteredCandidates(filtered);
    }, [candidates, currentFilters]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [data, views] = await Promise.all([
                getEnrichedTalentPool(),
                getSavedViews()
            ]);
            setCandidates(data);
            setSavedViews(views);
        } catch (error) {
            toast.error("Failed to load talent intelligence.");
        } finally {
            setLoading(false);
        }
    };

    const handleClearFilters = () => {
        setCurrentFilters({
            location: 'All',
            role: '',
            minAvailability: 0,
            minTenure: 0,
            tags: [],
            query: '',
            isSilverMedalist: false,
            readyForRevisit: false,
            sourceType: 'All'
        });
        setSearchQuery('');
        setAiInterpretation(null);
        toast.info("Filters reset to default.");
    };

    const handleSearch = (val) => {
        setSearchQuery(val);
        // Update Filters with Raw Query
        setCurrentFilters(prev => ({ ...prev, query: val }));

        if (val.length > 5) {
            const parsed = parseNaturalLanguageQuery(val);
            setAiInterpretation(parsed);

            // Auto-apply AI derived filters (mock)
            // In a real app, you might ask user confirmation before overwriting specific filters
            setCurrentFilters(prev => ({
                ...prev,
                query: val, // Keep text search
                // Apply ONLY if confident (mock logic here just sets them)
                role: parsed.role || prev.role,
                location: parsed.location ? 'San Francisco, CA' : prev.location // Mock mapping 
            }));
        } else {
            setAiInterpretation(null);
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === candidates.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(candidates.map(c => c.id));
        }
    };

    const getStatusColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        if (score >= 40) return 'bg-blue-500';
        return 'bg-gray-400';
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
            {/* 3. Advanced Filtering Panel */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="glass-card flex flex-col h-full border-r border-border/50"
                    >
                        <div className="p-6 border-b border-border/50 flex items-center justify-between">
                            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                                <Filter className="w-4 h-4 text-primary" />
                                Smart Filters
                            </h3>
                            <button
                                onClick={handleClearFilters}
                                className="text-[10px] font-black uppercase text-primary hover:text-primary/70 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground opacity-60">Base Dimensions</h4>
                                <div className="space-y-3">
                                    <div className="space-y-1.5 pt-4 border-t border-border/30">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sourcing Channel</label>
                                        <select
                                            value={currentFilters.sourceType}
                                            onChange={(e) => setCurrentFilters(prev => ({ ...prev, sourceType: e.target.value }))}
                                            className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                                        >
                                            <option value="All">All Channels</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Alumni">Alumni Database</option>
                                            <option value="Niche Community">Niche Community</option>
                                            <option value="GitHub">GitHub</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase">Min. Experience</label>
                                        <input type="range" className="w-full" />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground opacity-60">Strategic Intelligence</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 group cursor-pointer">
                                        <button
                                            onClick={() => setCurrentFilters(prev => ({ ...prev, isSilverMedalist: !prev.isSilverMedalist }))}
                                            className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${currentFilters.isSilverMedalist ? 'border-amber-500 bg-amber-500' : 'border-border group-hover:border-primary'}`}
                                        >
                                            {currentFilters.isSilverMedalist && <CheckSquare className="w-3 h-3 text-white" />}
                                        </button>
                                        <span className={`text-xs font-bold transition-colors ${currentFilters.isSilverMedalist ? 'text-amber-600' : 'text-muted-foreground'}`}>Silver Medalists</span>
                                    </label>
                                    <label className="flex items-center gap-2 group cursor-pointer">
                                        <button
                                            onClick={() => setCurrentFilters(prev => ({ ...prev, readyForRevisit: !prev.readyForRevisit }))}
                                            className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${currentFilters.readyForRevisit ? 'border-primary bg-primary' : 'border-border group-hover:border-primary'}`}
                                        >
                                            {currentFilters.readyForRevisit && <CheckSquare className="w-3 h-3 text-white" />}
                                        </button>
                                        <span className={`text-xs font-bold transition-colors ${currentFilters.readyForRevisit ? 'text-primary' : 'text-foreground'}`}>Quarterly Revisit (90d+)</span>
                                    </label>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground opacity-60">Technical DNA</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded-lg bg-muted border border-border/50 text-[10px] font-black uppercase hover:border-primary/50 transition-all cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden space-y-4">
                {/* 2. Selection & Quick Actions Toolbar */}
                <header className="space-y-4 shrink-0">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Find senior engineers in fintech who might be open to moving..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-card border border-border/50 rounded-[1.25rem] pl-11 pr-12 py-4 text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Tooltip text="Use Boolean: (React OR Vue) AND Node NOT Python">
                                    <Info className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-help" />
                                </Tooltip>
                            </div>
                            {aiInterpretation && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 right-0 -bottom-10 flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 rounded-xl"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {aiInterpretation.aiInterpretation}
                                </motion.div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`p-4 rounded-2xl border transition-all active:scale-95 ${isFilterOpen ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-card border-border/50 hover:border-primary/50'}`}
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => alert(`Found ${scanForDuplicates(candidates).length} potential duplicates.`)}
                                className="p-4 bg-card border border-border/50 rounded-2xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all active:scale-95"
                                title="Scan for Duplicates"
                            >
                                <ScanLine className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => toast.success("Exporting analysis to CSV...")}
                                className="flex items-center gap-2 p-4 bg-card border border-border/50 rounded-2xl font-black text-sm hover:border-primary/50 transition-all active:scale-95 text-foreground"
                            >
                                <Download className="w-5 h-5" />
                                <span className="hidden lg:inline">Export Analysis</span>
                            </button>
                            {/* Saved Views Dropdown Mock */}
                            <div className="relative group">
                                <button className="p-4 bg-card border border-border/50 rounded-2xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all">
                                    <BookMarked className="w-5 h-5" />
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl p-2 hidden group-hover:block z-50">
                                    <div className="text-[10px] font-black uppercase text-muted-foreground px-2 py-1">Saved Views</div>
                                    {savedViews.map(sv => (
                                        <button
                                            key={sv.id}
                                            onClick={() => setCurrentFilters(prev => ({ ...prev, ...sv.filters }))}
                                            className="w-full text-left px-2 py-2 text-xs font-medium hover:bg-muted rounded-lg transition-colors"
                                        >
                                            {sv.name}
                                        </button>
                                    ))}
                                    <div className="h-px bg-border my-1" />
                                    <button
                                        onClick={() => {
                                            const name = prompt("Name this view:");
                                            if (name) saveView(name, currentFilters).then(sv => setSavedViews(prev => [...prev, sv]));
                                        }}
                                        className="w-full text-left px-2 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg"
                                    >
                                        + Save Current View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {selectedIds.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-foreground text-background p-4 rounded-[1.5rem] flex items-center justify-between shadow-2xl"
                            >
                                <div className="flex items-center gap-6 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-sm">
                                            {selectedIds.length}
                                        </span>
                                        <span className="text-xs font-black uppercase tracking-widest opacity-80">Selected</span>
                                    </div>
                                    <div className="h-4 w-px bg-white/20" />
                                    <div className="text-[10px] font-bold text-white/60">AVG MATCH: <span className="text-white">84%</span></div>
                                    <div className="text-[10px] font-bold text-white/60">GHOSTING RISK: <span className="text-red-400">Low</span></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowComparison(true)}
                                        className="px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:scale-105"
                                    >
                                        Bench Candidates
                                    </button>
                                    <button
                                        onClick={() => toast.success(`Campaign sent to ${selectedIds.length} candidates.`)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Direct Outreach
                                    </button>
                                    <button
                                        onClick={() => toast.info("Bulk tagging interface initialized.")}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Bulk Tag
                                    </button>
                                    <div
                                        onClick={() => toast.error("Bulk delete action restricted.")}
                                        className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </div>
                                    <button
                                        onClick={() => setSelectedIds([])}
                                        className="p-2 bg-white/10 hover:bg-white/30 rounded-xl transition-all"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>

                {/* 4. High-Density Table View */}
                <section className="flex-1 glass-card overflow-hidden flex flex-col relative">
                    <div className="flex-1 overflow-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border/50">
                                <tr>
                                    <th className="p-4 w-12">
                                        <button onClick={toggleSelectAll} className="text-muted-foreground hover:text-primary transition-colors">
                                            {selectedIds.length === candidates.length ? <CheckSquare className="w-5 h-5 text-primary" /> : <Square className="w-5 h-5" />}
                                        </button>
                                    </th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Candidate Profile</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Match Score</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Source</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Availability</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Insights</th>
                                    <th className="p-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Synchronizing Intelligence...</p>
                                        </td>
                                    </tr>
                                ) : filteredCandidates.map((candidate) => (
                                    <motion.tr
                                        key={candidate.id}
                                        onClick={() => setSelectedCandidate(candidate)}
                                        className={`group border-b border-border/30 hover:bg-primary/5 transition-all cursor-pointer ${selectedIds.includes(candidate.id) || selectedCandidate?.id === candidate.id ? 'bg-primary/5' : ''}`}
                                    >
                                        <td className="p-4">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleSelection(candidate.id); }}
                                                className={`transition-colors ${selectedIds.includes(candidate.id) ? 'text-primary' : 'text-muted-foreground/30 hover:text-primary'}`}
                                            >
                                                {selectedIds.includes(candidate.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-black text-sm text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                        {candidate.avatar}
                                                    </div>
                                                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${getStatusColor(candidate.availabilityScore)}`} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-black group-hover:text-primary transition-colors">{candidate.name}</span>
                                                        {candidate.isSilverMedalist && (
                                                            <div className="p-0.5 bg-silver/20 rounded-md">
                                                                <Star className="w-3 h-3 text-stone-400 fill-stone-400" />
                                                            </div>
                                                        )}
                                                        {candidate.isHotLead && (
                                                            <div className="animate-pulse">
                                                                <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{candidate.role} • {candidate.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${candidate.matchScore}%` }}
                                                        className="h-full bg-primary"
                                                    />
                                                </div>
                                                <span className="text-xs font-black">{candidate.matchScore}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[10px] font-black text-foreground uppercase tracking-wider">{candidate.sourceType}</span>
                                                <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-60">{candidate.sourceChannel}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${candidate.availabilityScore >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {candidate.availabilityScore >= 80 ? 'Likely Looking' : 'Passive'}
                                                    </span>
                                                    <span className="text-xs font-bold text-muted-foreground">{candidate.availabilityScore}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                {candidate.isSilverMedalist && (
                                                    <div className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[8px] font-black uppercase border border-amber-100">Silver</div>
                                                )}
                                                {candidate.rejectionDate && (new Date() - new Date(candidate.rejectionDate)) / (1000 * 60 * 60 * 24) > 90 && (
                                                    <div className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-black uppercase border border-blue-100">Revisit</div>
                                                )}
                                                <div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[8px] font-black uppercase border border-border/50">
                                                    {candidate.stage}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {/* 1. Quick Action Hover Bar */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-1">
                                                <Tooltip text="Strategic Outreach Protocol">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveCandidate(candidate); setShowOutreach(true); }}
                                                        className="p-2 bg-white border border-border/50 rounded-lg hover:border-primary hover:text-primary transition-all shadow-sm"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip text="Constructive Feedback SLA">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveCandidate(candidate); setShowFeedback(true); }}
                                                        className="p-2 bg-white border border-border/50 rounded-lg hover:border-red-500 hover:text-red-500 transition-all shadow-sm group/btn"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip text="InMail">
                                                    <button className="p-2 bg-white border border-border/50 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
                                                        <LinkIcon className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip text="Interview Scorecard">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveCandidate(candidate); setShowScorecard(true); }}
                                                        className="p-2 bg-white border border-border/50 rounded-lg hover:border-amber-500 hover:text-amber-500 transition-all shadow-sm"
                                                    >
                                                        <BarChart3 className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip text="Strategic Offer Protocol">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveCandidate(candidate); setShowOffer(true); }}
                                                        className="p-2 bg-white border border-border/50 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all shadow-sm"
                                                    >
                                                        <Rocket className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <button className="p-2 bg-white border border-border/50 rounded-lg hover:bg-muted transition-all shadow-sm">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <footer className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-4">
                            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                Displaying {filteredCandidates.length} profiles
                            </div>
                            <div className="h-4 w-px bg-border" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-muted-foreground">Density:</span>
                                <div className="flex bg-white rounded-lg border border-border/50 p-0.5">
                                    {['compact', 'standard', 'comfy'].map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setDensity(d)}
                                            className={`px-2 py-1 text-[8px] font-black uppercase rounded-md transition-all ${density === d ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg border border-border/50 bg-white hover:bg-muted disabled:opacity-50" disabled>
                                <ChevronRight className="w-4 h-4 rotate-180" />
                            </button>
                            <span className="text-[10px] font-black px-4">Page 1 of 42</span>
                            <button className="p-2 rounded-lg border border-border/50 bg-white hover:bg-muted transition-all">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </footer>
                </section>
            </main>

            {/* Outreach Generator Modal */}
            <AnimatePresence>
                {showOutreach && (
                    <OutreachGenerator
                        candidate={activeCandidate}
                        onClose={() => setShowOutreach(false)}
                    />
                )}
            </AnimatePresence>

            {/* Feedback Generator Modal */}
            <AnimatePresence>
                {showFeedback && (
                    <FeedbackGenerator
                        candidate={activeCandidate}
                        onClose={() => setShowFeedback(false)}
                    />
                )}
            </AnimatePresence>

            {/* Interview Scorecard Modal */}
            <AnimatePresence>
                {showScorecard && (
                    <InterviewScorecard
                        candidate={activeCandidate}
                        onClose={() => setShowScorecard(false)}
                    />
                )}
            </AnimatePresence>

            {/* Offer Generator Modal */}
            <AnimatePresence>
                {showOffer && (
                    <OfferGenerator
                        candidate={activeCandidate}
                        onClose={() => setShowOffer(false)}
                    />
                )}
            </AnimatePresence>

            {/* Profile Sidebar */}
            <AnimatePresence>
                {selectedCandidate && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCandidate(null)}
                            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        />
                        <ProfileSidebar
                            candidate={selectedCandidate}
                            onClose={() => setSelectedCandidate(null)}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Comparison Bench Modal */}
            <AnimatePresence>
                {showComparison && (
                    <ComparisonBench
                        candidates={candidates.filter(c => selectedIds.includes(c.id))}
                        onClose={() => setShowComparison(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function Tooltip({ children, text }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg whitespace-nowrap z-50 shadow-2xl">
                    {text}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                </div>
            )}
        </div>
    );
}
