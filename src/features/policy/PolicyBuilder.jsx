import { useState } from 'react';
import { PenTool, FileText, Check, Download, Quote } from 'lucide-react';

const TEMPLATES = {
    'leave': `1. Annual Leave Policy\n\n- Employees are entitled to 20 days of paid leave per year.\n- Leave requests must be submitted 1 week in advance.\n- Unused leave can be carried forward up to 10 days.`,
    'remote': `2. Remote Work Policy\n\n- Employees may work remotely up to 2 days per week.\n- Core hours of 10 AM to 4 PM must be maintained.\n- A stable internet connection is required.`,
    'harassment': `3. Anti-Harassment Policy\n\n- We maintain a zero-tolerance policy against harassment.\n- All complaints will be investigated confidentially.\n- Retaliation against complainants is strictly prohibited.`
};

export default function PolicyBuilder() {
    const [type, setType] = useState('leave');
    const [tone, setTone] = useState('Standard');
    const [content, setContent] = useState('');
    const [generated, setGenerated] = useState(false);

    const generatePolicy = () => {
        // Simulating AI generation modulation based on Tone
        let text = TEMPLATES[type];
        if (tone === 'Friendly') {
            text = text.replace('must be submitted', 'should kindly be shared')
                .replace('strictly prohibited', 'not cool and not allowed');
        } else if (tone === 'Strict') {
            text = text.replace('employees are entitled to', 'the Company grants')
                .replace('may work', 'are permitted to work, subject to approval');
        }
        setContent(text);
        setGenerated(true);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-primary" />
                    Policy Composer
                </h2>

                <div className="space-y-4 flex-1">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Policy Category</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-input bg-background"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="leave">Leave & Attendance</option>
                            <option value="remote">Remote Work / WFH</option>
                            <option value="harassment">Prevention of Sexual Harassment (POSH)</option>
                            <option value="data">Data Security & Privacy</option>
                            <option value="conduct">Code of Conduct</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Legalese & Tone</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['Standard', 'Friendly', 'Strict'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={`py-2 rounded-lg text-sm border transition-all ${tone === t
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-background border-border hover:bg-muted'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm">
                        <p className="flex items-start gap-2">
                            <Quote className="w-4 h-4 shrink-0 mt-0.5" />
                            AI will auto-inject standard localized compliance clauses based on your company location settings (Karnataka, India).
                        </p>
                    </div>
                </div>

                <button
                    onClick={generatePolicy}
                    className="w-full mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md"
                >
                    Generate Draft
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        Preview
                    </h3>
                    <div className="flex gap-2">
                        <button disabled={!generated} className="p-2 text-gray-500 hover:text-primary disabled:opacity-30">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-muted/20 border border-input rounded-xl p-6 overflow-y-auto font-serif leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {generated ? content : <span className="text-muted-foreground opacity-50 italic">Select options and click Generate to see the policy draft here...</span>}
                </div>

                {generated && (
                    <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" /> Finalize & Publish
                        </button>
                        <button className="px-4 border border-input rounded-lg hover:bg-muted font-medium">
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
