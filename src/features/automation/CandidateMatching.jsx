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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Target className="w-8 h-8 text-primary" />
                        AI Candidate Matching
                    </h1>
                    <p className="text-muted-foreground mt-1">Find the best candidates for your open positions using semantic AI matching.</p>
                </div>
            </div>

            {/* Job Selection */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Select Job Position</h3>
                <div className="flex gap-4">
                    <select
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="">Choose a job...</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.title} - {job.department}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleFindMatches}
                        disabled={!selectedJob || loading}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Finding Matches...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Find Best Matches
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Matches */}
            {matches.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Top Candidates ({matches.length})</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-4 h-4 text-primary" />
                            Powered by AI Semantic Matching
                        </div>
                    </div>

                    {matches.map((match, index) => (
                        <div key={match.candidateId} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-6">
                                {/* Rank Badge */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        index === 1 ? 'bg-gray-100 text-gray-700' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-muted text-muted-foreground'
                                        }`}>
                                        #{index + 1}
                                    </div>
                                    {index === 0 && <Award className="w-5 h-5 text-yellow-600" />}
                                </div>

                                <div className="flex-1">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-1">{match.candidateName}</h3>
                                            <p className="text-sm text-muted-foreground">{match.recommendation}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-3xl font-bold mb-1 ${getScoreColor(match.overallScore).split(' ')[0]}`}>
                                                {match.overallScore}%
                                            </div>
                                            <p className="text-xs text-muted-foreground">Overall Match</p>
                                        </div>
                                    </div>

                                    {/* Match Breakdown */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">Skill Match</span>
                                                <span className="text-sm font-semibold">{match.skillMatch}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all"
                                                    style={{ width: `${match.skillMatch}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">Experience Match</span>
                                                <span className="text-sm font-semibold">{match.experienceMatch}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full transition-all"
                                                    style={{ width: `${match.experienceMatch}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <p className="text-sm font-medium mb-2">Matched Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {match.matchedSkills.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {match.missingSkills.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium mb-2">Missing Skills</p>
                                            <div className="flex flex-wrap gap-2">
                                                {match.missingSkills.map((skill, i) => (
                                                    <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full border border-orange-200">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Reasoning */}
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <div className="flex items-start gap-2">
                                            <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium mb-1">AI Analysis</p>
                                                <p className="text-sm text-muted-foreground">{match.reasoning}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-4">
                                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                            View Profile
                                        </button>
                                        <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors">
                                            Schedule Interview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
