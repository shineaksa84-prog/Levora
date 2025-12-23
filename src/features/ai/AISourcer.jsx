import { useState, useEffect } from 'react';
import {
    Search, Sparkles, CheckCircle2, XCircle, Loader2, Github,
    FileText, Users, Network, Send, Mail, Link2, ChevronRight,
    ExternalLink, Code, Database, Info, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { matchingService } from '../../lib/services/matching';
import { sourcingService } from '../../lib/services/sourcingService';

export default function AISourcer() {
    // State
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('github'); // github, patents, conferences, local
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [booleanTree, setBooleanTree] = useState(null);
    const [showBooleanRoom, setShowBooleanRoom] = useState(false);
    const [selectedProspect, setSelectedProspect] = useState(null);
    const [outreachView, setOutreachView] = useState(null); // 'draft', 'sequence'

    // Fetch Initial Results
    useEffect(() => {
        if (query) handleSearch();
    }, [activeTab]);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const data = await sourcingService.searchEcosystem(query, activeTab);
            setResults(data);

            // Auto-generate boolean tree for the query if not exists
            if (!booleanTree) {
                const tree = await sourcingService.getBooleanSearchTree(query);
                setBooleanTree(tree);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOutreach = async (prospect) => {
        setLoading(true);
        try {
            const sequence = await sourcingService.createOutreachSequence(prospect);
            setSelectedProspect(prospect);
            setOutreachView('sequence');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderBooleanNode = (node, depth = 0) => {
        if (node.type === 'term') {
            return (
                <div key={node.value + depth} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono">
                    {node.value}
                </div>
            );
        }
        return (
            <div key={node.value + depth} className="flex flex-col gap-2 p-3 border border-border/50 rounded-lg bg-background/50">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{node.value}</span>
                <div className="flex flex-wrap gap-2">
                    {node.children.map((child, i) => renderBooleanNode(child, depth + 1 + i))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pb-20 space-y-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-vibrant-mesh p-8 md:p-12 border border-border/50">
                <div className="relative z-10 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase">Next-Gen Sourcing</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6 leading-tight"
                    >
                        Mine the <span className="text-primary italic">Global Ecosystem</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-2"
                    >
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Paste JD or requirements (e.g. 'Cloud Architect with Rust exp')..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-white/70 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-lg text-lg"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
                            Find Talent
                        </button>
                    </motion.div>

                    {booleanTree && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setShowBooleanRoom(!showBooleanRoom)}
                            className="mt-4 text-xs flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono"
                        >
                            <Code className="w-3 h-3" />
                            {showBooleanRoom ? "Hide Boolean Strategy" : "View AI Boolean Strategy"}
                        </motion.button>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10">
                    <Network className="w-48 h-48 text-primary/5 rotate-12" />
                </div>
            </div>

            {/* Boolean War Room */}
            <AnimatePresence>
                {showBooleanRoom && booleanTree && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-card p-6 border-dashed border-primary/30">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-primary">
                                    <Code className="w-4 h-4" />
                                    AI Boolean Strategy Room
                                </h3>
                                <div className="text-[10px] text-muted-foreground font-mono">NODE-BASED QUERY ENGINE V2.0</div>
                            </div>
                            {renderBooleanNode(booleanTree)}
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs font-mono text-muted-foreground break-all">
                                <strong>Generated String:</strong> (TITLE:"Senior" AND (SKILL:"React" OR SKILL:"Frontend")) ... [Synthesized from Natural Query]
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ecosystem Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
                {[
                    { id: 'github', label: 'GitHub Ecosystem', icon: Github, color: 'text-gray-900 bg-gray-100' },
                    { id: 'patents', label: 'Patent Inventors', icon: FileText, color: 'text-blue-600 bg-blue-50' },
                    { id: 'conferences', label: 'Speaker Bureau', icon: Users, color: 'text-purple-600 bg-purple-50' },
                    { id: 'local', label: 'Local Repository', icon: Database, color: 'text-orange-600 bg-orange-50' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2
                            ${activeTab === tab.id
                                ? `${tab.color} ring-2 ring-current`
                                : 'text-muted-foreground hover:bg-muted'}
                        `}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {results.map((item, idx) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="glass-card p-6 flex flex-col h-full group"
                        >
                            {/* Proximity Indicator */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-md border border-primary/10">
                                    <Network className="w-3 h-3 text-primary" />
                                    <span className="text-[10px] font-bold text-primary uppercase">{item.proximity}° Separation</span>
                                </div>
                                {item.codeQualityScore && (
                                    <div className="text-right">
                                        <div className="text-xl font-black text-primary leading-none">{item.codeQualityScore}%</div>
                                        <div className="text-[8px] uppercase font-bold tracking-tighter text-muted-foreground">Code Quality</div>
                                    </div>
                                )}
                                {item.citationCount && (
                                    <div className="text-right">
                                        <div className="text-xl font-black text-blue-600 leading-none">{item.citationCount}</div>
                                        <div className="text-[8px] uppercase font-bold tracking-tighter text-muted-foreground">Citations</div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-black shadow-lg">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.role || item.title}</p>
                                    <div className="mt-1 flex items-center gap-2 text-[10px] text-primary/70 font-bold">
                                        {activeTab === 'github' && <><Github className="w-3 h-3" /> @{item.handle}</>}
                                        {activeTab === 'patents' && <><FileText className="w-3 h-3" /> {item.currentAffiliation}</>}
                                        {activeTab === 'conferences' && <><Users className="w-3 h-3" /> {item.company}</>}
                                    </div>
                                </div>
                            </div>

                            {/* Deep Data Point */}
                            <div className="flex-1 p-3 bg-muted/30 rounded-xl mb-4 text-sm border border-border/30">
                                {activeTab === 'github' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">Top Contribution</div>
                                        <div className="font-bold text-primary flex items-center gap-1">
                                            <Code className="w-3 h-3" /> {item.topRepo.name}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">⭐ {item.topRepo.stars}</span>
                                            <span>{item.topRepo.language}</span>
                                            <span className="ml-auto font-mono text-[10px] bg-green-50 text-green-700 px-1.5 rounded">{item.contributions} commits/yr</span>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'patents' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">Notable Intellectual Property</div>
                                        <div className="font-bold text-blue-700 flex items-start gap-1">
                                            <div className="w-3 h-3 mt-1 shrink-0"><CheckCircle2 className="w-full h-full" /></div>
                                            {item.topPatent.title}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">Filed {item.topPatent.filingYear} • Priority Tech</div>
                                    </div>
                                )}
                                {activeTab === 'conferences' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">Keynote History</div>
                                        <div className="font-bold text-purple-700">"{item.talkTitle}"</div>
                                        <div className="text-[10px] text-muted-foreground font-medium">{item.conferenceName}</div>
                                    </div>
                                )}
                            </div>

                            {/* Action Row */}
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">
                                    Deep Profile
                                </button>
                                <button
                                    onClick={() => handleGenerateOutreach(item)}
                                    className="px-4 py-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Outreach Studio Modal */}
            <AnimatePresence>
                {selectedProspect && outreachView && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setSelectedProspect(null); setOutreachView(null); }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-border"
                        >
                            <div className="flex h-[600px]">
                                {/* Prospect Mini Sidebar */}
                                <div className="w-64 bg-muted/30 p-6 border-r border-border">
                                    <div className="w-20 h-20 rounded-2xl bg-primary text-white text-3xl font-black flex items-center justify-center mb-4">
                                        {selectedProspect.name[0]}
                                    </div>
                                    <h3 className="font-bold text-xl leading-tight mb-1">{selectedProspect.name}</h3>
                                    <p className="text-xs text-muted-foreground mb-6">{selectedProspect.role || selectedProspect.title}</p>

                                    <div className="space-y-4">
                                        <div className="p-3 bg-white rounded-xl border border-border shadow-sm">
                                            <div className="text-[8px] font-black text-primary uppercase mb-1">AI Interest Trigger</div>
                                            <p className="text-[11px] leading-relaxed">High growth trajectory noted in {selectedProspect.matchedTech?.[0] || 'research'}.</p>
                                        </div>
                                        <div className="p-3 bg-white rounded-xl border border-border shadow-sm">
                                            <div className="text-[8px] font-black text-purple-600 uppercase mb-1">Company Relationship</div>
                                            <div className="flex flex-col gap-1 text-[10px] font-medium">
                                                <div className="flex items-center gap-1"><Users className="w-2 h-2" /> You</div>
                                                <div className="w-px h-2 bg-purple-200 ml-1" />
                                                <div className="flex items-center gap-1 opacity-50"><Users className="w-2 h-2" /> Alex Rivera</div>
                                                <div className="w-px h-2 bg-purple-200 ml-1" />
                                                <div className="flex items-center gap-1 font-bold text-purple-700 italic">{selectedProspect.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sequence Editor */}
                                <div className="flex-1 p-8 flex flex-col">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-black font-display tracking-tight flex items-center gap-2">
                                            <MessageSquare className="w-5 h-5 text-primary" />
                                            Outreach Sequence Studio
                                        </h2>
                                        <button
                                            onClick={() => { setSelectedProspect(null); setOutreachView(null); }}
                                            className="p-2 hover:bg-muted rounded-full transition-colors"
                                        >
                                            <XCircle className="w-6 h-6 text-muted-foreground" />
                                        </button>
                                    </div>

                                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                        {sourcingService.activeSequences.get(selectedProspect.id)?.steps.map((step, idx) => (
                                            <div key={idx} className="relative pl-8 pb-4">
                                                <div className="absolute left-[3px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />

                                                <div className="glass-card p-5 group hover:border-primary/50 transition-all">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">Touch {idx + 1}</span>
                                                            <span className="text-xs font-bold flex items-center gap-1">
                                                                {step.channel === 'LinkedIn' ? <Link2 className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                                                                {step.channel}
                                                            </span>
                                                        </div>
                                                        <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    {step.subject && (
                                                        <div className="text-xs font-black mb-1 text-foreground/80">Subject: {step.subject}</div>
                                                    )}
                                                    <p className="text-sm text-muted-foreground italic whitespace-pre-wrap leading-relaxed">
                                                        {step.body}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <button className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                                            Deploy Sequence
                                        </button>
                                        <button className="flex-1 py-3 bg-muted font-bold rounded-2xl hover:bg-muted/70 transition-colors">
                                            Edit in Drafts
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
