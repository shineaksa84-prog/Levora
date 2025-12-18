import { useState } from 'react';
import { Search, Upload, Sparkles, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { matchingService } from '../../lib/services/matching';

export default function AISourcer() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([
        { id: 1, name: 'John Doe', role: 'Senior Frontend Engineer', score: 94, matched: ['5+ years React experience', 'Fintech background'], missing: ['GraphQL'] },
    ]);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            // Simplified for demo: fetch first open job and match against it using the query as a filter or mock JD
            const jobs = await matchingService.getOpenJobs();
            if (jobs.length > 0) {
                const matchResult = await matchingService.findBestCandidatesForJob(jobs[0].id);
                if (matchResult.success) {
                    setResults(matchResult.matches.map(m => ({
                        id: m.candidateId,
                        name: m.candidateName,
                        role: m.recommendation,
                        score: m.overallScore,
                        matched: m.matchedSkills,
                        missing: m.missingSkills
                    })));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Candidate Sourcing
                </h2>
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Paste job description or type requirements (e.g. 'Senior React Dev with 5 years exp in Fintech')..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {loading ? 'Finding...' : 'Find Matches'}
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((candidate) => (
                    <div key={candidate.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{candidate.name}</h3>
                                    <p className="text-sm text-muted-foreground">{candidate.role}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-2xl font-bold ${candidate.score > 80 ? 'text-green-600' : 'text-blue-600'}`}>{candidate.score}%</span>
                                <span className="text-xs text-muted-foreground">Match Score</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            {candidate.matched.slice(0, 2).map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span>{skill}</span>
                                </div>
                            ))}
                            {candidate.missing.slice(0, 1).map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <XCircle className="w-4 h-4 text-red-400" />
                                    <span>Missing: {skill}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                            <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                                View Profile
                            </button>
                            <button className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">
                                Shortlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
