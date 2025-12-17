import { useState, useEffect } from 'react';
import {
    Brain,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Users
} from 'lucide-react';
import { matchingService } from '../../lib/services/matching';

export default function MatchingDashboard({ jobId }) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedMatch, setExpandedMatch] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            if (!jobId) return;
            setLoading(true);
            try {
                const result = await matchingService.findBestCandidatesForJob(jobId);
                if (result.success) {
                    setMatches(result.matches);
                }
            } catch (error) {
                console.error("Error fetching matches:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [jobId]);

    const toggleExpand = (candidateId) => {
        setExpandedMatch(expandedMatch === candidateId ? null : candidateId);
    };

    const getScoreColor = (score) => {
        if (score >= 85) return 'text-green-600 bg-green-100 border-green-200';
        if (score >= 70) return 'text-blue-600 bg-blue-100 border-blue-200';
        if (score >= 50) return 'text-amber-600 bg-amber-100 border-amber-200';
        return 'text-red-600 bg-red-100 border-red-200';
    };

    const getProgressBarColor = (score) => {
        if (score >= 85) return 'bg-green-500';
        if (score >= 70) return 'bg-blue-500';
        if (score >= 50) return 'bg-amber-500';
        return 'bg-red-500';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Brain className="w-6 h-6 animate-pulse mr-2" />
                Analyzing candidates...
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="text-center p-8 text-muted-foreground border border-dashed border-border rounded-xl">
                No matches found for this job yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Match Recommendations
                </h3>
                <span className="text-sm text-muted-foreground">
                    Top {matches.length} Candidates
                </span>
            </div>

            <div className="space-y-3">
                {matches.map((match) => (
                    <div
                        key={match.candidateId}
                        className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:shadow-md"
                    >
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30"
                            onClick={() => toggleExpand(match.candidateId)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getScoreColor(match.overallScore)}`}>
                                    {match.overallScore}%
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{match.candidateName}</h4>
                                    <p className="text-sm text-muted-foreground">{match.recommendation}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex gap-2">
                                    {match.matchedSkills.slice(0, 3).map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                    {match.matchedSkills.length > 3 && (
                                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                            +{match.matchedSkills.length - 3}
                                        </span>
                                    )}
                                </div>
                                {expandedMatch === match.candidateId ? (
                                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        {expandedMatch === match.candidateId && (
                            <div className="p-4 border-t border-border bg-muted/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Score Breakdown */}
                                    <div className="space-y-3">
                                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Match Breakdown</h5>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Skills</span>
                                                <span className="font-medium">{match.breakdown.skills}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div className={`h-full ${getProgressBarColor(match.breakdown.skills)}`} style={{ width: `${match.breakdown.skills}%` }} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Experience</span>
                                                <span className="font-medium">{match.breakdown.experience}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div className={`h-full ${getProgressBarColor(match.breakdown.experience)}`} style={{ width: `${match.breakdown.experience}%` }} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</span>
                                                <span className="font-medium">{match.breakdown.location}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div className={`h-full ${getProgressBarColor(match.breakdown.location)}`} style={{ width: `${match.breakdown.location}%` }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analysis & Reasoning */}
                                    <div>
                                        <h5 className="text-sm font-medium text-muted-foreground mb-2">AI Analysis</h5>
                                        <div className="bg-card border border-border rounded-lg p-3 text-sm mb-4">
                                            {match.reasoning}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2 text-sm text-green-600">
                                                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="font-medium">Matched Skills:</span>
                                                    <p className="text-muted-foreground text-xs mt-0.5">
                                                        {match.matchedSkills.join(", ")}
                                                    </p>
                                                </div>
                                            </div>

                                            {match.missingSkills.length > 0 && (
                                                <div className="flex items-start gap-2 text-sm text-red-600">
                                                    <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                    <div>
                                                        <span className="font-medium">Missing Skills:</span>
                                                        <p className="text-muted-foreground text-xs mt-0.5">
                                                            {match.missingSkills.join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
