import { useState } from 'react';
import { FileText, Wand2, Copy, Check, Download } from 'lucide-react';

export default function JDGenerator() {
    const [formData, setFormData] = useState({
        title: '',
        industry: '',
        skills: '',
        experience: 'Mid-Senior',
        tone: 'Professional'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedJD, setGeneratedJD] = useState(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            setGeneratedJD(`JOB TITLE: ${formData.title}

ABOUT US:
We are a leading innovator in the ${formData.industry} space, committed to excellence and growth.

ROLE OVERVIEW:
We are looking for a ${formData.experience} ${formData.title} to join our dynamic team. You will play a key role in driving our technical initiatives forward.

KEY RESPONSIBILITIES:
- Lead and execute projects relevant to ${formData.skills.split(',')[0]}.
- Collaborate with cross-functional teams to deliver high-quality solutions.
- Mentor junior team members and provide technical guidance.

REQUIRED SKILLS:
${formData.skills.split(',').map(s => `- ${s.trim()}`).join('\n')}

WHAT WE OFFER:
- Competitive salary and benefits.
- Flexible working hours.
- Opportunity for professional growth.

TONE: ${formData.tone}`);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Input Form */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm overflow-y-auto">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-primary" />
                        JD Generator
                    </h2>
                    <p className="text-sm text-muted-foreground">Enter role details to generate a comprehensive job description.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Job Title</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md border border-input bg-background"
                            placeholder="e.g. Senior React Developer"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Industry</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md border border-input bg-background"
                            placeholder="e.g. Fintech, Healthcare"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Required Skills (comma separated)</label>
                        <textarea
                            className="w-full p-2 rounded-md border border-input bg-background h-24"
                            placeholder="e.g. React, Node.js, AWS, TypeScript"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Experience Level</label>
                            <select
                                className="w-full p-2 rounded-md border border-input bg-background"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            >
                                <option>Entry Level</option>
                                <option>Mid-Senior</option>
                                <option>Lead / Principal</option>
                                <option>Executive</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Tone</label>
                            <select
                                className="w-full p-2 rounded-md border border-input bg-background"
                                value={formData.tone}
                                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                            >
                                <option>Professional</option>
                                <option>Casual / Startup</option>
                                <option>Formal / Corporate</option>
                                <option>Exciting / Growth</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !formData.title}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isGenerating ? <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Wand2 className="w-4 h-4" />}
                        Generate Job Description
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="bg-muted/30 rounded-xl border border-border p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Preview</h3>
                    {generatedJD && (
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-muted rounded-md" title="Copy">
                                <Copy className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-md" title="Download">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {generatedJD ? (
                    <div className="flex-1 bg-background rounded-lg border border-border p-6 overflow-y-auto whitespace-pre-wrap font-mono text-sm shadow-sm">
                        {generatedJD}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg bg-card/50">
                        <FileText className="w-12 h-12 mb-4 opacity-20" />
                        <p>Generated content will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}
