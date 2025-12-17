import { useState } from 'react';
import { Search, Copy, Check, RefreshCw, Command } from 'lucide-react';

export default function BooleanGenerator() {
    const [inputs, setInputs] = useState({
        titles: '',
        skills: '',
        excludes: '',
        location: ''
    });
    const [generatedString, setGeneratedString] = useState('');
    const [platform, setPlatform] = useState('LinkedIn');
    const [copied, setCopied] = useState(false);

    const generateBoolean = () => {
        const titlePart = inputs.titles.split(',').map(t => `"${t.trim()}"`).join(' OR ');
        const skillPart = inputs.skills.split(',').map(s => `"${s.trim()}"`).join(' AND ');
        const excludePart = inputs.excludes ? ' NOT (' + inputs.excludes.split(',').map(e => `"${e.trim()}"`).join(' OR ') + ')' : '';
        const locationPart = inputs.location ? ` AND "${inputs.location}"` : '';

        // Simple logic for demonstration - real world would vary by platform syntax nuance
        let finalString = '';
        if (titlePart) finalString += `(${titlePart})`;
        if (skillPart) finalString += (finalString ? ' AND ' : '') + `(${skillPart})`;
        if (locationPart) finalString += locationPart;
        if (excludePart) finalString += excludePart;

        if (platform === 'Google') {
            finalString = `site:linkedin.com/in (${finalString})`;
        } else if (platform === 'GitHub') {
            finalString = `site:github.com (${finalString})`;
        }

        setGeneratedString(finalString);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-4">
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Command className="w-5 h-5 text-primary" />
                            Search Parameters
                        </h2>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="bg-muted px-3 py-1.5 rounded-md text-sm font-medium focus:outline-none"
                        >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Google">Google X-Ray</option>
                            <option value="GitHub">GitHub</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Job Titles (OR)</label>
                            <input
                                className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                                placeholder="e.g. Frontend Engineer, React Developer, UI Engineer"
                                value={inputs.titles}
                                onChange={(e) => setInputs(prev => ({ ...prev, titles: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Must Have Skills (AND)</label>
                            <input
                                className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                                placeholder="e.g. React, Redux, TypeScript"
                                value={inputs.skills}
                                onChange={(e) => setInputs(prev => ({ ...prev, skills: e.target.value }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-red-600">Exclude (NOT)</label>
                                <input
                                    className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                                    placeholder="e.g. Intern, Recruiter"
                                    value={inputs.excludes}
                                    onChange={(e) => setInputs(prev => ({ ...prev, excludes: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Location</label>
                                <input
                                    className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                                    placeholder="e.g. San Francisco"
                                    value={inputs.location}
                                    onChange={(e) => setInputs(prev => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                        </div>

                        <button
                            onClick={generateBoolean}
                            className="w-full mt-2 bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Generate String
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full">
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm h-full flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-600" />
                        Generated String
                    </h2>

                    <div className="flex-1 relative bg-muted/30 rounded-lg border border-input p-4 font-mono text-sm leading-relaxed overflow-y-auto text-foreground/80">
                        {generatedString || <span className="text-muted-foreground opacity-50 italic">Your generated boolean string will appear here...</span>}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                            Optimized for {platform}
                        </span>
                        <button
                            onClick={copyToClipboard}
                            disabled={!generatedString}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${copied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-background border border-input hover:bg-muted text-foreground'
                                }`}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy String'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
