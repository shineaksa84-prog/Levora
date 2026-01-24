import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, CheckCircle2, AlertCircle,
    Zap, BrainCircuit, MessageSquare, ShieldCheck,
    BarChart3, Save
} from 'lucide-react';
import { submitInterviewFeedback } from '../../lib/services/interviewFeedbackService';
import { toast } from '../../lib/services/toastService';

export default function InterviewScorecard({ candidate, onClose }) {
    const [step, setStep] = useState(1); // 1: Skills, 2: Behavioral, 3: Culture & Summary
    const [scores, setScores] = useState({
        technical: 0,
        architecture: 0,
        problemSolving: 0,
        behavioral: 0,
        cultureFit: 0
    });
    const [recommendation, setRecommendation] = useState('pending');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const skills = [
        { id: 'technical', label: 'Technical Depth', icon: Zap },
        { id: 'architecture', label: 'System Design/Architecture', icon: BrainCircuit },
        { id: 'problemSolving', label: 'Problem Solving Efficiency', icon: BarChart3 }
    ];

    const behavioralQuestions = [
        "Describe a time you navigated a significant ambiguity in requirements.",
        "How do you handle technical disagreements within a team?"
    ];

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const mappedFeedback = {
                interviewerId: 'INT-001',
                interviewerName: 'Sarah Johnson',
                technicalSkills: {
                    programming: scores.technical,
                    problemSolving: scores.problemSolving,
                    systemDesign: scores.architecture,
                    codeQuality: 4 // Default for now
                },
                softSkills: {
                    communication: scores.behavioral,
                    teamwork: scores.behavioral,
                    leadership: 3,
                    adaptability: 4
                },
                cultureFit: scores.cultureFit,
                overallRating: (scores.technical + scores.architecture + scores.problemSolving + scores.behavioral + scores.cultureFit) / 5,
                notes: notes,
                recommendation: recommendation === 'Strong Hire' || recommendation === 'Yes' ? 'hire' :
                    recommendation === 'Strong No' || recommendation === 'Reject' ? 'reject' : 'pending'
            };

            await submitInterviewFeedback(candidate.id, mappedFeedback);
            toast.success(`Scorecard submitted for ${candidate.name}. Decision velocity tracked.`);
            onClose();
        } catch (error) {
            toast.error('Strategic failure: Scorecard could not be committed to the intelligence matrix.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (category) => (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    onClick={() => setScores(prev => ({ ...prev, [category]: star }))}
                    className={`p-2 rounded-lg transition-all ${scores[category] >= star ? 'text-primary' : 'text-muted-foreground opacity-30 hover:opacity-100'}`}
                >
                    <Star className={`w-6 h-6 ${scores[category] >= star ? 'fill-current' : ''}`} />
                </button>
            ))}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Structured Scorecard</h2>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Precision Intelligence • {candidate.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex h-1 bg-muted">
                    {[1, 2, 3].map(s => (
                        <div
                            key={s}
                            className={`flex-1 transition-all duration-500 ${step >= s ? 'bg-primary' : ''}`}
                        />
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Skills-First Evaluation
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">Screening for hard skills before cultural alignment to mitigate bias.</p>
                                </div>

                                <div className="space-y-6">
                                    {skills.map(skill => (
                                        <div key={skill.id} className="p-4 bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                                    <skill.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-bold">{skill.label}</span>
                                            </div>
                                            {renderStars(skill.id)}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Behavioral Consistency
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">Standardized questions to ensure fair comparison across candidates.</p>
                                </div>

                                <div className="space-y-6">
                                    {behavioralQuestions.map((q, i) => (
                                        <div key={i} className="space-y-3">
                                            <p className="text-xs font-black leading-relaxed">{q}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Response Rating</span>
                                                {renderStars(`behavioral_${i}`)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Final Synthesis
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">Avoid aggregate "gut feelings." Document evidence-based conclusions.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <span className="text-[10px] font-black uppercase text-primary tracking-widest block mb-4">Culture Alignment</span>
                                        {renderStars('cultureFit')}
                                    </div>
                                    <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-4">Overall Recommendation</span>
                                        <div className="flex gap-2">
                                            {['Reject', 'Strong No', 'Maybe', 'Yes', 'Strong Hire'].map(r => (
                                                <button
                                                    key={r}
                                                    onClick={() => setRecommendation(r)}
                                                    className={`flex-1 py-1 px-2 text-[8px] font-black uppercase rounded border transition-all ${recommendation === r ? 'bg-primary text-white border-primary' : 'bg-white border-border/50 hover:bg-primary/10 hover:border-primary/50 text-muted-foreground'}`}
                                                >
                                                    {r}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Evidence-Based Notes</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Document specific examples from the interview..."
                                        className="w-full h-32 bg-muted/30 border border-border/30 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Bias Monitoring Active</span>
                    </div>
                    <div className="flex gap-3">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(prev => prev - 1)}
                                className="px-6 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                onClick={() => setStep(prev => prev + 1)}
                                className="px-8 py-3 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-zinc-800 transition-all"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Finalize Scorecard
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
