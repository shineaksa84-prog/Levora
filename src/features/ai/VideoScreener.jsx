import { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Play, Square, User, Bot } from 'lucide-react';

export default function VideoScreener() {
    const [isRecording, setIsRecording] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const videoRef = useRef(null);

    const questions = [
        "Tell me about a challenging project you worked on recently.",
        "How do you handle disagreements with team members?",
        "What is your experience with React and modern frontend tools?",
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

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Main Video Area */}
            <div className="lg:col-span-2 bg-black rounded-xl overflow-hidden relative flex flex-col">
                <div className="flex-1 relative bg-zinc-900 flex items-center justify-center">
                    {isRecording ? (
                        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-zinc-500">
                            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Camera is off</p>
                        </div>
                    )}

                    {/* AI Interviewer Overlay */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg w-48">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white">AI Interviewer</p>
                                <p className="text-[10px] text-zinc-400">Listening...</p>
                            </div>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-zinc-900 p-6 flex items-center justify-between border-t border-zinc-800">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`p-4 rounded-full transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
                                }`}
                        >
                            {isRecording ? <Square className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                        </button>
                        <div>
                            <p className="text-white font-medium">{isRecording ? 'Recording...' : 'Start Interview'}</p>
                            <p className="text-sm text-zinc-400">{isRecording ? '00:45 / 02:00' : 'Ready to begin'}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar: Questions & Transcript */}
            <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <h3 className="font-semibold">Interview Session</h3>
                    <p className="text-sm text-muted-foreground">React Developer Role</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Current Question ({questionIndex + 1}/{questions.length})</h4>
                        <p className="text-lg font-medium leading-relaxed">
                            "{questions[questionIndex]}"
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Transcript</h4>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4 text-primary" />
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none text-sm">
                                <p>Could you elaborate on the state management libraries you used?</p>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-secondary-foreground" />
                            </div>
                            <div className="bg-primary/5 p-3 rounded-lg rounded-tr-none text-sm">
                                <p>Yes, primarily Redux Toolkit for global state and React Query for server state...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => setQuestionIndex((i) => (i + 1) % questions.length)}
                        className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80"
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
}
