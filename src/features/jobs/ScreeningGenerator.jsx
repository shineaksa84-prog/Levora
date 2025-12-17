import { useState } from 'react';
import { MessageSquare, List, Download, Copy, Play } from 'lucide-react';

export default function ScreeningGenerator() {
    const [jobContext, setJobContext] = useState('');
    const [questions, setQuestions] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            setQuestions({
                basic: [
                    "What is your notice period?",
                    "What are your salary expectations?",
                    "Are you willing to relocate?"
                ],
                technical: [
                    "Can you describe your experience with React hooks?",
                    "How do you handle state management in large applications?",
                    "Explain the difference between SQL and NoSQL databases."
                ],
                behavioral: [
                    "Tell me about a time you had a conflict with a team member.",
                    "Describe a challenging project you managed.",
                    "How do you handle tight deadlines?"
                ],
                culture: [
                    "What kind of work environment do you thrive in?",
                    "What values are most important to you in a company?"
                ]
            });
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col h-full">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Screening Question Generator
                    </h2>

                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Job Context</label>
                            <p className="text-xs text-muted-foreground mb-2">Paste JD or list key skills to generate relevant questions.</p>
                            <textarea
                                className="w-full h-48 p-3 rounded-md border border-input bg-background resize-none"
                                placeholder="e.g. Senior Frontend Developer. Key Skills: React, Typescript, Performance Optimization..."
                                value={jobContext}
                                onChange={(e) => setJobContext(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !jobContext}
                            className="bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isGenerating ? <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Play className="w-4 h-4" />}
                            Generate Questions
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 h-full overflow-hidden">
                <div className="bg-muted/30 rounded-xl border border-border p-6 h-full overflow-y-auto">
                    {!questions ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <List className="w-12 h-12 mb-4" />
                            <p>Questions will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(questions).map(([category, items]) => (
                                <div key={category} className="bg-background rounded-lg border border-border p-4 shadow-sm">
                                    <h3 className="font-semibold capitalize text-primary mb-3">{category} Questions</h3>
                                    <ul className="space-y-3">
                                        {items.map((q, i) => (
                                            <li key={i} className="flex gap-3 text-sm">
                                                <span className="text-muted-foreground font-mono">{i + 1}.</span>
                                                <span>{q}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
