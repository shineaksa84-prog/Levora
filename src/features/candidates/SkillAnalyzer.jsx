import { useState } from 'react';
import { FileText, ArrowRight, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function SkillAnalyzer() {
    const [inputs, setInputs] = useState({ jd: '', profile: '' });
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeSkills = () => {
        setLoading(true);
        setTimeout(() => {
            // Mock Analysis Logic
            setAnalysis({
                score: 72,
                matchLevel: 'Good',
                found: ['React', 'JavaScript', 'Tailwind', 'Git', 'Agile'],
                missing: ['TypeScript', 'GraphQL', 'AWS'],
                partial: ['Node.js (Junior level vs Senior req)'],
                summary: "Candidate has strong frontend fundamentals but lacks specific backend and cloud infrastructure experience required for this Senior role."
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Input Section */}
            <div className="flex flex-col gap-4">
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex-1 flex flex-col">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Target Job Description
                    </h3>
                    <textarea
                        className="flex-1 w-full bg-muted/30 border border-input rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Paste Job Description here..."
                        value={inputs.jd}
                        onChange={(e) => setInputs(prev => ({ ...prev, jd: e.target.value }))}
                    />
                </div>
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex-1 flex flex-col">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        Candidate Profile / Resume
                    </h3>
                    <textarea
                        className="flex-1 w-full bg-muted/30 border border-input rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Paste Candidate Resume text or Skills here..."
                        value={inputs.profile}
                        onChange={(e) => setInputs(prev => ({ ...prev, profile: e.target.value }))}
                    />
                </div>
                <button
                    onClick={analyzeSkills}
                    disabled={!inputs.jd || !inputs.profile || loading}
                    className="bg-primary text-primary-foreground font-medium py-3 rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Sparkles className="w-5 h-5 animate-spin" /> Analyzing...
                        </>
                    ) : (
                        <>
                            Compare Skills <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

            {/* Results Section */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-border bg-muted/10">
                    <h2 className="font-bold text-lg">Gap Analysis Report</h2>
                </div>

                {analysis ? (
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Score Overview */}
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-8 border-muted">
                                <div className={`absolute inset-0 rounded-full border-8 ${analysis.score > 80 ? 'border-green-500' : analysis.score > 60 ? 'border-yellow-500' : 'border-red-500'}`} style={{ clipPath: `inset(0 ${100 - analysis.score}% 0 0)` }}></div> {/* Simple CSS fake gauge */}
                                <div className="text-center">
                                    <span className="text-2xl font-bold block">{analysis.score}%</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Match</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{analysis.matchLevel} Match</h3>
                                <p className="text-sm text-muted-foreground mt-1">{analysis.summary}</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-5 h-5" /> Matched Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.found.map(skill => (
                                        <span key={skill} className="bg-white text-green-700 px-2 py-1 rounded-md text-sm border border-green-200 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                                    <XCircle className="w-5 h-5" /> Missing / Gaps
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.missing.map(skill => (
                                        <span key={skill} className="bg-white text-red-700 px-2 py-1 rounded-md text-sm border border-red-200 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {analysis.partial.length > 0 && (
                                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                                    <h4 className="font-semibold text-yellow-800 flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-5 h-5" /> Partial / Verification Needed
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {analysis.partial.map(note => (
                                            <div key={note} className="bg-white text-yellow-800 px-3 py-2 rounded-md text-sm border border-yellow-200">
                                                {note}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center opacity-60">
                        <Sparkles className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="font-medium text-lg">Ready to Analyze</h3>
                        <p className="max-w-xs mt-2">Paste the JD and candidate profile to leverage AI in identifying skill deficits.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
