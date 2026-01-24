import { useState, useEffect } from 'react';
import { Users, Tag, Search, Filter, TrendingUp, Mail, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getEnrichedTalentPool, filterCandidates } from '../../lib/services/talentPoolService';

export default function TalentPoolSegmentation() {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSegment, setSelectedSegment] = useState('all');
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const segments = [
        { id: 'all', label: 'All Candidates', count: 0, color: 'bg-primary' },
        { id: 'silverMedalists', label: 'Silver Medalists', count: 0, color: 'bg-amber-500' },
        { id: 'highAvailability', label: 'High Availability', count: 0, color: 'bg-emerald-500' },
        { id: 'passive', label: 'Passive Candidates', count: 0, color: 'bg-violet-500' },
        { id: 'recentlyContacted', label: 'Recently Contacted', count: 0, color: 'bg-blue-500' }
    ];

    useEffect(() => {
        loadCandidates();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [candidates, selectedSegment, searchQuery]);

    const loadCandidates = async () => {
        try {
            const data = await getEnrichedTalentPool();
            setCandidates(data);
        } catch (error) {
            toast.error('Failed to load talent pool');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...candidates];

        // Apply segment filter
        if (selectedSegment === 'silverMedalists') {
            filtered = filtered.filter(c => c.isSilverMedalist);
        } else if (selectedSegment === 'highAvailability') {
            filtered = filtered.filter(c => c.availabilityScore >= 80);
        } else if (selectedSegment === 'passive') {
            filtered = filtered.filter(c => c.stage === 'Sourcing');
        } else if (selectedSegment === 'recentlyContacted') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            filtered = filtered.filter(c => new Date(c.lastContactedAt) >= thirtyDaysAgo);
        }

        // Apply search
        if (searchQuery) {
            filtered = filterCandidates(filtered, { query: searchQuery });
        }

        setFilteredCandidates(filtered);
    };

    const handleBulkTag = () => {
        if (selectedCandidates.length === 0) {
            toast.error('Please select candidates first');
            return;
        }
        toast.success(`Tagged ${selectedCandidates.length} candidates`);
        setSelectedCandidates([]);
    };

    const handleBulkEmail = () => {
        if (selectedCandidates.length === 0) {
            toast.error('Please select candidates first');
            return;
        }
        toast.success(`Email campaign initiated for ${selectedCandidates.length} candidates`);
        setSelectedCandidates([]);
    };

    const toggleSelectCandidate = (id) => {
        setSelectedCandidates(prev =>
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Loading Talent Pool...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass-card p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Users className="w-7 h-7 text-primary" />
                            Talent Pool Segmentation
                        </h2>
                        <p className="text-muted-foreground font-medium mt-1">Smart tagging and filtering for passive candidates</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-primary">{filteredCandidates.length}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Candidates</p>
                    </div>
                </div>
            </div>

            {/* Segments */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                {segments.map(segment => {
                    const count = segment.id === 'all' ? candidates.length :
                        segment.id === 'silverMedalists' ? candidates.filter(c => c.isSilverMedalist).length :
                            segment.id === 'highAvailability' ? candidates.filter(c => c.availabilityScore >= 80).length :
                                segment.id === 'passive' ? candidates.filter(c => c.stage === 'Sourcing').length :
                                    candidates.filter(c => {
                                        const thirtyDaysAgo = new Date();
                                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                                        return new Date(c.lastContactedAt) >= thirtyDaysAgo;
                                    }).length;

                    return (
                        <button
                            key={segment.id}
                            onClick={() => setSelectedSegment(segment.id)}
                            className={`px-4 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${selectedSegment === segment.id
                                    ? `${segment.color} text-white shadow-lg`
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            <div>{segment.label}</div>
                            <div className="text-lg font-black mt-1">{count}</div>
                        </button>
                    );
                })}
            </div>

            {/* Search & Actions */}
            <div className="glass-card p-4">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, role, skills, location..."
                            className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {selectedCandidates.length > 0 && (
                        <>
                            <button
                                onClick={handleBulkTag}
                                className="px-4 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Tag className="w-4 h-4" />
                                Tag ({selectedCandidates.length})
                            </button>
                            <button
                                onClick={handleBulkEmail}
                                className="px-4 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Email ({selectedCandidates.length})
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Candidate List */}
            <div className="grid gap-3">
                {filteredCandidates.map((candidate, idx) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`glass-card p-4 hover:border-primary/30 transition-all cursor-pointer ${selectedCandidates.includes(candidate.id) ? 'border-primary bg-primary/5' : ''
                            }`}
                        onClick={() => toggleSelectCandidate(candidate.id)}
                    >
                        <div className="flex items-start gap-4">
                            <input
                                type="checkbox"
                                checked={selectedCandidates.includes(candidate.id)}
                                onChange={() => toggleSelectCandidate(candidate.id)}
                                className="mt-1"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white flex-shrink-0">
                                {candidate.avatar}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-black text-sm">{candidate.name}</h3>
                                    {candidate.isSilverMedalist && (
                                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full text-[8px] font-black uppercase">
                                            Silver Medalist
                                        </span>
                                    )}
                                    {candidate.isVIP && (
                                        <span className="px-2 py-0.5 bg-violet-500/10 text-violet-500 rounded-full text-[8px] font-black uppercase">
                                            VIP
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground font-medium mb-2">{candidate.role} • {candidate.location}</p>

                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                                        <span className="font-bold">Availability: {candidate.availabilityScore}%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <UserPlus className="w-3 h-3 text-primary" />
                                        <span className="font-bold">Engagement: {candidate.engagementLevel}%</span>
                                    </div>
                                    <span className="text-muted-foreground">Last contact: {new Date(candidate.lastContactedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-black text-primary">{candidate.matchScore}</div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Match</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
