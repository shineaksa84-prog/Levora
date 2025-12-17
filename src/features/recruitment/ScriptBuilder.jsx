import { useState, useEffect } from 'react';
import { Phone, Video, Download, Copy, Play } from 'lucide-react';
import { AIGhostText } from '../../components/ui/AIGhostText';
import { VoiceVisualizer } from '../../components/ui/VoiceVisualizer';
import { SparkleLoader } from '../../components/ui/MagicalLoaders';

export default function ScriptBuilder() {
    const [role, setRole] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [script, setScript] = useState(null);
    const [introText, setIntroText] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Simulate AI Ghost Text
    useEffect(() => {
        if (introText && introText.endsWith('I noticed')) {
            setSuggestion(" you have 5 years of experience in React.");
        } else if (introText && introText.endsWith('Are you')) {
            setSuggestion(" open to new opportunities right now?");
        } else {
            setSuggestion('');
        }
    }, [introText]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setScript(null); // Clear previous script

        // Simulate generation delay
        setTimeout(() => {
            const generatedIntro = `Great. To give you some context, I'm reaching out regarding the ${role || '[Role Name]'} position. We were impressed by your profile and wanted to understand your current interests and experience better.`;

            setIntroText(generatedIntro);

            setScript({
                opening: `Hi ${candidateName || '[Candidate Name]'}, this is [Your Name] from [Company]. Thanks for taking the time to speak today. Is this still a good time for a quick chat?`,
                introduction: generatedIntro,
                verification: [
                    "Just to confirm, are you currently located in [Location]?",
                    "What is your notice period or earliest availability?",
                    "Are you authorized to work in [Country]?"
                ],
                pitch: `This role is exciting because you'd be working on [Project/Product], helping us solve [Problem]. The team is [Team Size/Structure] and we use [Tech Stack/Tools].`,
                closing: `Thanks for sharing those details. I'll summarize our discussion with the hiring manager. You can expect to hear back from us by [Date/Timeframe]. Do you have any questions for me before we wrap up?`
            });
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Script Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Candidate Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md border border-input bg-background"
                                    placeholder="Jane Doe"
                                    value={candidateName}
                                    onChange={(e) => setCandidateName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Role</label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md border border-input bg-background"
                                    placeholder="Product Manager"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleGenerate}
                                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90"
                            >
                                Generate Script
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm h-full flex flex-col">
                        {isGenerating ? (
                            <div className="h-full flex items-center justify-center min-h-[400px]">
                                <SparkleLoader text="Crafting the perfect script..." />
                            </div>
                        ) : !script ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 min-h-[400px]">
                                <Phone className="w-12 h-12 mb-4" />
                                <p>Enter details to generate script</p>
                            </div>
                        ) : (
                            <div className="space-y-6 text-sm flex-1">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 hover:bg-muted rounded-md" title="Copy">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                <section>
                                    <h3 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Opening</h3>
                                    <div className="p-3 bg-muted/30 rounded-md border border-border">
                                        "{script.opening}"
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Introduction (AI Editable)</h3>
                                    <div className="bg-muted/30 rounded-md border border-border">
                                        <AIGhostText
                                            value={introText}
                                            onChange={(e) => setIntroText(e.target.value)}
                                            placeholder="Introduction..."
                                            suggestion={suggestion}
                                            onAcceptSuggestion={() => {
                                                setIntroText(prev => prev + suggestion);
                                                setSuggestion('');
                                            }}
                                            className="min-h-[100px] w-full bg-transparent border-none focus:ring-0 p-3"
                                        />
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Verification Questions</h3>
                                    <ul className="list-disc list-inside p-3 bg-muted/30 rounded-md border border-border space-y-1">
                                        {script.verification.map((q, i) => (
                                            <li key={i}>{q}</li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Role Pitch</h3>
                                    <div className="p-3 bg-muted/30 rounded-md border border-border">
                                        "{script.pitch}"
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Closing</h3>
                                    <div className="p-3 bg-muted/30 rounded-md border border-border">
                                        "{script.closing}"
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Voice Practice Overlay or Footer */}
                        {script && (
                            <div className="mt-6 pt-6 border-t border-border flex flex-col items-center justify-center gap-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsRecording(!isRecording)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
                                        {isRecording ? 'Stop Recording' : 'Practice Pitch'}
                                    </button>
                                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                                        <Play className="w-5 h-5 ml-0.5" />
                                    </button>
                                </div>
                                <div className="h-12 w-full max-w-xs">
                                    <VoiceVisualizer isListening={isRecording} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
