import { useState } from 'react';
import { MessageSquare, List, Download, Copy, Play, FileText, CheckCircle2, AlertCircle, Percent } from 'lucide-react';
import { toast } from '../../lib/services/toastService';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function ScreeningGenerator() {
    const [jdText, setJdText] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setAnalysis({
                score: 87,
                missingKeywords: ['Redux Saga', 'Unit Testing', 'CI/CD pipeline'],
                matchedKeywords: ['React', 'TypeScript', 'Tailwind', 'REST APIs', 'Git'],
                probes: [
                    "I noticed you have strong React experience, but I didn't see explicit mention of Redux Saga. Can you describe your state management complexity in previous roles?",
                    "You listed 'Git', but do you have experience setting up CI/CD pipelines from scratch?",
                    "How do you approach writing unit tests for your components?"
                ]
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Input Section */}
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col h-full overflow-hidden">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-primary" />
                        Resume vs JD Matcher
                    </h2>

                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Job Description</label>
                            <textarea
                                className="w-full h-32 p-3 rounded-lg border border-input bg-background/50 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Paste the Job Description here..."
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Candidate Resume</label>
                            <textarea
                                className="w-full h-48 p-3 rounded-lg border border-input bg-background/50 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none font-mono"
                                placeholder="Paste Resume text (OCR or plain text)..."
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !jdText || !resumeText}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                        >
                            {isAnalyzing ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                    <span>Analying Match...</span>
                                </div>
                            ) : (
                                <>
                                    <Percent className="w-4 h-4" /> Run AI Match Analysis
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Analysis Result Section */}
            <div className="flex flex-col gap-4 h-full">
                {!analysis ? (
                    <div className="bg-muted/30 rounded-xl border border-border border-dashed p-6 h-full flex flex-col items-center justify-center text-muted-foreground">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="font-medium">Waiting for inputs...</p>
                        <p className="text-sm opacity-70">Paste JD and Resume to start analysis</p>
                    </div>
                ) : (
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm h-full flex flex-col gap-6 overflow-y-auto">

                        {/* Score Header */}
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="transform -rotate-90 w-24 h-24">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/30" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * analysis.score) / 100} strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-2xl font-black text-primary">{analysis.score}%</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold">Strong Match</h3>
                                <p className="text-sm text-muted-foreground">This candidate has most of the required technical skills but misses a few process-oriented keywords.</p>
                            </div>
                        </div>

                        {/* Keywords Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                                <h4 className="text-xs font-black text-green-600 uppercase mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Matched Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.matchedKeywords.map(k => (
                                        <span key={k} className="px-2 py-1 bg-green-500/10 text-green-700 text-xs font-bold rounded-lg border border-green-500/10">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                <h4 className="text-xs font-black text-red-600 uppercase mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Missing / Gap
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.missingKeywords.map(k => (
                                        <span key={k} className="px-2 py-1 bg-red-500/10 text-red-700 text-xs font-bold rounded-lg border border-red-500/10">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interview Probes */}
                        <div className="flex-1 bg-muted/20 rounded-xl p-4 border border-border">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                AI-Generated Interview Probes
                            </h4>
                            <div className="space-y-3">
                                {analysis.probes.map((probe, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-3 bg-background rounded-lg text-sm border border-border/50 shadow-sm"
                                    >
                                        <p className="leading-relaxed">"{probe}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Export Assessment Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
