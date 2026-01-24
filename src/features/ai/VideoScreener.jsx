import { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Play, Square, User, Bot, Activity, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoScreener() {
    const [isRecording, setIsRecording] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const videoRef = useRef(null);
    const [sentiment, setSentiment] = useState(50); // 0-100
    const [detectedCompetencies, setDetectedCompetencies] = useState(new Set());

    const questions = [
        "Tell me about a challenging project you worked on recently.",
        "How do you handle disagreements with team members?",
        "What is your experience with React and modern frontend tools?",
    ];

    const competencies = [
        { id: 'communication', label: 'Clear Communication' },
        { id: 'technical', label: 'Technical Depth' },
        { id: 'conflict', label: 'Conflict Resolution' },
        { id: 'leadership', label: 'Leadership Potential' }
    ];

    useEffect(() => {
        if (isRecording && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Error accessing webcam:", err));
        } else if (!isRecording && videoRef.current) {
            const stream = videoRef.current.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    }, [isRecording]);

    // Simulate Real-time AI Analysis
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                // Fluctuating sentiment
                setSentiment(prev => {
                    const change = (Math.random() - 0.5) * 20;
                    return Math.min(100, Math.max(0, prev + change));
                });

                // Randomly detect a competency
                if (Math.random() > 0.8) {
                    const randomComp = competencies[Math.floor(Math.random() * competencies.length)];
                    setDetectedCompetencies(prev => new Set(prev).add(randomComp.id));
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Main Video Area */}
            <div className="lg:col-span-2 bg-black rounded-xl overflow-hidden relative flex flex-col shadow-2xl ring-1 ring-white/10">
                <div className="flex-1 relative bg-zinc-900 flex items-center justify-center">
                    {isRecording ? (
                        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-zinc-500">
                            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Camera is off</p>
                        </div>
                    )}

                    {/* AI HUD Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl w-56">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                    <Bot className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider">AI Interviewer</p>
                                    <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                                        <Activity className="w-3 h-3 text-green-500" /> Live Analysis Active
                                    </p>
                                </div>
                            </div>
                            {/* Sentiment Graph Simulation */}
                            <div className="h-8 flex items-end justify-between gap-1 mt-2">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: '20%' }}
                                        animate={{ height: `${Math.random() * 100}%` }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        className={`w-1 rounded-full ${sentiment > 50 ? 'bg-green-500/50' : 'bg-amber-500/50'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[8px] text-zinc-500 uppercase">Sentiment</span>
                                <span className={`text-[10px] font-bold ${sentiment > 50 ? 'text-green-400' : 'text-amber-400'}`}>
                                    {sentiment > 50 ? 'POSITIVE' : 'NEUTRAL'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Subtitles Overlay */}
                    {isRecording && (
                        <div className="absolute bottom-10 left-0 right-0 text-center px-10">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white/90 text-sm font-medium"
                            >
                                "Yes, the biggest challenge was migrating the legacy Redux codebase..."
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="bg-zinc-950 p-6 flex items-center justify-between border-t border-zinc-800">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`p-4 rounded-full transition-all flex items-center justify-center shadow-lg ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                        >
                            {isRecording ? <Square className="w-6 h-6 text-white fill-current" /> : <Play className="w-6 h-6 text-white ml-1 fill-current" />}
                        </button>
                        <div>
                            <p className="text-white font-bold">{isRecording ? 'Interview in Progress' : 'Start Interview'}</p>
                            <p className="text-xs text-zinc-400 font-mono">{isRecording ? '00:45 / 30:00' : 'Ready to record'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                            <Mic className="w-4 h-4 text-green-500" />
                            <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: isRecording ? ["0%", "80%", "30%"] : "0%" }}
                                    transition={{ repeat: Infinity, duration: 0.2 }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar: Intelligence Dashboard */}
            <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/20">
                    <h3 className="font-bold flex items-center gap-2 text-sm">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        Live Intelligence
                    </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Question Card */}
                    <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 block">Question {questionIndex + 1} of {questions.length}</span>
                        <p className="text-lg font-bold leading-tight">
                            "{questions[questionIndex]}"
                        </p>
                    </div>

                    {/* Competency Tracker */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Competency Signals</h4>
                        <div className="space-y-2">
                            {competencies.map((comp) => (
                                <div
                                    key={comp.id}
                                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${detectedCompetencies.has(comp.id)
                                            ? 'bg-green-500/10 border-green-500/20 shadow-sm'
                                            : 'bg-muted/10 border-transparent opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${detectedCompetencies.has(comp.id) ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className={`text-sm font-medium ${detectedCompetencies.has(comp.id) ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {comp.label}
                                        </span>
                                    </div>
                                    {detectedCompetencies.has(comp.id) && (
                                        <span className="text-[10px] font-bold text-green-600 bg-white/50 px-2 py-0.5 rounded">DETECTED</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <AnimatePresence>
                        {sentiment < 30 && isRecording && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 text-amber-700"
                            >
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <div className="text-xs">
                                    <span className="font-bold block mb-1">Low Confidence Detected</span>
                                    Candidate seems unsure. Consider probing deeper into their specific contribution to the project.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => setQuestionIndex((i) => (i + 1) % questions.length)}
                        className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 transition-colors"
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
}
