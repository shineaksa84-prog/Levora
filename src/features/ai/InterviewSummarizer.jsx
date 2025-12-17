import { useState } from 'react';
import { FileText, Sparkles, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';

export default function InterviewSummarizer() {
    const [transcript, setTranscript] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [summary, setSummary] = useState(null);

    const generateSummary = () => {
        if (!transcript.trim()) return;
        setIsProcessing(true);
        setTimeout(() => {
            // Mock AI response
            setSummary({
                strengths: [
                    'Deep understanding of React rendering lifecycle.',
                    'Clear communication of complex technical concepts.',
                    'Experience with large-scale state management (Redux/Zustand).'
                ],
                weaknesses: [
                    'Limited experience with CI/CD pipelines.',
                    'Did not answer the question about graph algorithms confidently.'
                ],
                recommendation: 'Strong Hire for Senior Frontend Role. Suggested pairing with a DevOps-strong team member.'
            });
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Interview Transcript
                    </h3>
                    <button
                        onClick={() => setTranscript("Interviewer: Can you explain how you handle state management? \nCandidate: I usually prefer Redux Toolkit for complex global state, but for local component state, I stick to React's built-in hooks... \nInterviewer: What about testing? \nCandidate: I use Jest and React Testing Library...")}
                        className="text-xs text-muted-foreground hover:text-primary underline"
                    >
                        Load Sample
                    </button>
                </div>
                <textarea
                    className="flex-1 w-full bg-muted/30 border border-input rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    placeholder="Paste interview transcript here..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                />
                <button
                    onClick={generateSummary}
                    disabled={!transcript || isProcessing}
                    className="mt-4 bg-primary text-primary-foreground font-medium py-3 rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <Sparkles className="w-4 h-4 animate-spin" /> Summarizing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" /> Generate AI Summary
                        </>
                    )}
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/10">
                    <h3 className="font-bold flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        AI Assessment
                    </h3>
                </div>

                {summary ? (
                    <div className="p-6 space-y-6 overflow-y-auto">
                        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                                <CheckCircle className="w-5 h-5" /> Key Strengths
                            </h4>
                            <ul className="space-y-2">
                                {summary.strengths.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                                        <span className="mt-1.5 w-1 h-1 bg-green-500 rounded-full flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5" /> Areas for Improvement
                            </h4>
                            <ul className="space-y-2">
                                {summary.weaknesses.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                                        <span className="mt-1.5 w-1 h-1 bg-orange-500 rounded-full flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Final Recommendation</h4>
                            <p className="text-sm text-blue-800 font-medium">
                                {summary.recommendation}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center opacity-60">
                        <Sparkles className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="font-medium text-lg">Waiting for Transcript</h3>
                        <p className="max-w-xs mt-2">Paste the interview text to get an instant AI-generated summary of performance.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
