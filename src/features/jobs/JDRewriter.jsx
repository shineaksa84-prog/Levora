import { useState } from 'react';
import { FileText, RefreshCw, ArrowRight, Check } from 'lucide-react';

export default function JDRewriter() {
    const [inputText, setInputText] = useState('');
    const [rewrittenText, setRewrittenText] = useState('');
    const [isRewriting, setIsRewriting] = useState(false);
    const [mode, setMode] = useState('candidate-friendly');

    const handleRewrite = () => {
        setIsRewriting(true);
        // Simulate AI rewriting
        setTimeout(() => {
            let output = '';
            if (mode === 'candidate-friendly') {
                output = `[Simplified & Engaging Version]\n\nRole: ${inputText.split('\n')[0] || 'Software Engineer'}\n\nWhy You'll Love This:\n- Impact real users immediately.\n- Work with modern tech stack.\n\nWhat You Bring:\n- Passion for clean code.\n- Ability to work in a team.\n\n(Reduced jargon and corporate speak.)`;
            } else if (mode === 'diversity') {
                output = `[Inclusive Version]\n\nWe welcome people from all backgrounds to apply. This role focuses on collaboration and growth.\n\nKey Responsibilities:\n- Contributing to team success.\n- Learning and sharing knowledge.\n\n(Removed gendered language and biased terms.)`;
            } else {
                output = `[Standardized Version]\n\nObjective:\nTo maintain and develop software solutions.\n\nRequirements:\n- 3+ years experience.\n- Bachelor's degree or equivalent.\n\n(Formatted for consistency.)`;
            }
            setRewrittenText(output);
            setIsRewriting(false);
        }, 1500);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex-1 flex flex-col">
                    <label className="font-semibold mb-2 block">Original Description</label>
                    <textarea
                        className="flex-1 w-full p-3 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Paste your existing Job Description here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 h-full">
                <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label className="font-semibold">Rewritten Version</label>
                        <div className="flex gap-2">
                            <select
                                className="text-sm p-1.5 rounded-md border border-input bg-background"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="candidate-friendly">Candidate Friendly</option>
                                <option value="diversity">Diversity Focused</option>
                                <option value="standardize">Standardize Format</option>
                            </select>
                            <button
                                onClick={handleRewrite}
                                disabled={isRewriting || !inputText}
                                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isRewriting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
                                Rewrite
                            </button>
                        </div>
                    </div>

                    {rewrittenText ? (
                        <div className="flex-1 p-3 rounded-md bg-muted/30 border border-border whitespace-pre-wrap font-mono text-sm overflow-y-auto">
                            {rewrittenText}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-md">
                            <p className="text-sm">Select a mode and click rewrite</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
