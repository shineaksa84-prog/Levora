import { useState } from 'react';
import { Target, TrendingUp, Award, Zap, Search } from 'lucide-react';
import { matchingService } from '../../lib/services/matching';

export default function CandidateMatching() {
    const [selectedJob, setSelectedJob] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const jobs = [
        { id: 'job1', title: 'Senior React Developer', department: 'Engineering' },
        { id: 'job2', title: 'Product Manager', department: 'Product' },
        { id: 'job3', title: 'UX Designer', department: 'Design' }
    ];

    const mockMatches = [
        {
            candidateId: 'cand1',
            candidateName: 'Sarah Wilson',
            overallScore: 92,
            skillMatch: 95,
            experienceMatch: 89,
            matchedSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
            missingSkills: ['AWS'],
            recommendation: 'Strong Match',
            reasoning: 'Excellent technical skills with 5+ years of React experience. Strong portfolio of similar projects.'
        },
        {
            candidateId: 'cand2',
            candidateName: 'James Chen',
            overallScore: 85,
            skillMatch: 88,
            experienceMatch: 82,
            matchedSkills: ['React', 'JavaScript', 'Node.js'],
            missingSkills: ['TypeScript', 'AWS'],
            recommendation: 'Good Match',
            reasoning: 'Solid React background with 3 years experience. Quick learner with strong fundamentals.'
        },
        {
            candidateId: 'cand3',
            candidateName: 'Alex Thompson',
            overallScore: 78,
            skillMatch: 75,
            experienceMatch: 81,
            matchedSkills: ['JavaScript', 'React'],
            missingSkills: ['TypeScript', 'Node.js', 'AWS'],
            recommendation: 'Moderate Match',
            reasoning: 'Good JavaScript foundation but limited React experience. Would benefit from mentorship.'
        }
    ];

    const handleFindMatches = async () => {
        if (!selectedJob) return;

        setLoading(true);

        // Simulate API call
        try {
            const result = await matchingService.findBestCandidatesForJob(selectedJob);
            if (result.success) {
                setMatches(result.matches);
            } else {
                console.error("Error finding matches:", result.error);
            }
        } catch (error) {
            console.error("Error finding matches:", error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-orange-600 bg-orange-50 border-orange-200';
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Job Selection Hub */}
            <div className="bg-card rounded-[3rem] border border-border p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest">Neural Target <span className="text-primary italic">Selection</span></h3>
                <div className="flex gap-6 relative z-10">
                    <div className="flex-1 relative">
                        <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            className="w-full px-8 py-5 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black appearance-none transition-all shadow-inner uppercase tracking-widest"
                        >
                            <option value="" className="bg-card">Initialize Target Job Protocol...</option>
                            {jobs.map((job) => (
                                <option key={job.id} value={job.id} className="bg-card">
                                    {job.title} // {job.department}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                            <Search className="w-5 h-5" />
                        </div>
                    </div>
                    <button
                        onClick={handleFindMatches}
                        disabled={!selectedJob || loading}
                        className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Synthesizing Matches...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-4 h-4" />
                                    Identify Optimal Candidates
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>

            {/* Match Matrix */}
            {matches.length > 0 && (
                <div className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Elite Match <span className="text-primary italic">Analytics</span></h2>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-60">Semantic synthesis complete ({matches.length} matches found)</p>
                        </div>
                        <div className="flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
                            <Zap className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Neural Precision: 99.8%</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {matches.map((match, index) => (
                            <div key={match.candidateId} className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl hover:border-primary/50 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex items-start gap-10 relative z-10">
                                    {/* Rank Profile */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center font-black text-2xl shadow-2xl ${index === 0 ? 'bg-primary text-primary-foreground rotate-3' :
                                            index === 1 ? 'bg-foreground text-background -rotate-2' :
                                                'bg-muted text-foreground'
                                            }`}>
                                            #{index + 1}
                                        </div>
                                        {index === 0 && (
                                            <div className="bg-primary/10 p-2 rounded-xl animate-bounce">
                                                <Award className="w-6 h-6 text-primary" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        {/* Header Hub */}
                                        <div className="flex items-start justify-between mb-8 border-b border-border pb-6">
                                            <div>
                                                <h3 className="text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{match.candidateName}</h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${match.overallScore >= 85 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'
                                                        }`}>
                                                        {match.recommendation}
                                                    </span>
                                                    <span className="text-muted-foreground/30">•</span>
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Candidate ID: {match.candidateId}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-5xl font-black tracking-tighter ${match.overallScore >= 85 ? 'text-primary' : 'text-foreground'
                                                    }`}>
                                                    {match.overallScore}%
                                                </div>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Match Index</p>
                                            </div>
                                        </div>

                                        {/* Match Metrics Grid */}
                                        <div className="grid grid-cols-2 gap-12 mb-10">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Skill Vector Alignment</span>
                                                    <span className="text-[10px] font-black text-primary">{match.skillMatch}%</span>
                                                </div>
                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-all duration-1000 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                                        style={{ width: `${match.skillMatch}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Experience Proximity</span>
                                                    <span className="text-[10px] font-black text-foreground">{match.experienceMatch}%</span>
                                                </div>
                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className="h-full bg-foreground rounded-full transition-all duration-1000"
                                                        style={{ width: `${match.experienceMatch}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skill Clusters */}
                                        <div className="grid grid-cols-2 gap-10 mb-10">
                                            <div>
                                                <p className="text-[10px] font-black text-foreground mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    <Award className="w-3 h-3 text-emerald-500" /> Confirmed Skills
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {match.matchedSkills.map((skill, i) => (
                                                        <span key={i} className="px-4 py-1.5 bg-background border border-border text-[9px] font-black uppercase tracking-widest rounded-xl text-foreground hover:border-primary transition-colors">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {match.missingSkills.length > 0 && (
                                                <div>
                                                    <p className="text-[10px] font-black text-foreground mb-4 uppercase tracking-widest flex items-center gap-2 opacity-60">
                                                        <TrendingUp className="w-3 h-3 text-rose-500" /> Deficiency Gaps
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {match.missingSkills.map((skill, i) => (
                                                            <span key={i} className="px-4 py-1.5 bg-rose-500/5 text-rose-500 text-[9px] font-black uppercase tracking-widest rounded-xl border border-rose-500/10">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* AI Logic Analysis */}
                                        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 mb-10 group-hover:border-primary/30 transition-colors">
                                            <div className="flex items-start gap-5">
                                                <div className="p-3 bg-background rounded-2xl shadow-inner">
                                                    <TrendingUp className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Neural Analysis Protocol</p>
                                                    <p className="text-sm font-black text-foreground/80 leading-relaxed italic uppercase tracking-tight">
                                                        "{match.reasoning}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Executable Actions */}
                                        <div className="flex gap-4">
                                            <button className="flex-1 px-8 py-5 bg-foreground text-background rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl">
                                                Initialize Full Profile Deep Dive
                                            </button>
                                            <button className="px-8 py-5 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                                                Schedule Evaluation Sequence
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
