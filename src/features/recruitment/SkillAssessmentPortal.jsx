import { useState } from 'react';
import { Code, Brain, Clock, Award, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';

const ASSESSMENTS = [
    {
        id: 1,
        title: 'React Component Architecture',
        type: 'Coding',
        difficulty: 'Medium',
        duration: '45 min',
        questions: 3,
        description: 'Build a reusable component library with hooks and context',
        status: 'Available'
    },
    {
        id: 2,
        title: 'Problem Solving & Algorithms',
        type: 'Coding',
        difficulty: 'Hard',
        duration: '60 min',
        questions: 2,
        description: 'Optimize data structures and implement efficient algorithms',
        status: 'Available'
    },
    {
        id: 3,
        title: 'Personality Assessment',
        type: 'Psychometric',
        difficulty: 'Easy',
        duration: '20 min',
        questions: 50,
        description: 'OCEAN Big Five personality traits evaluation',
        status: 'Completed'
    },
    {
        id: 4,
        title: 'Cognitive Ability Test',
        type: 'Psychometric',
        difficulty: 'Medium',
        duration: '30 min',
        questions: 40,
        description: 'Logical reasoning, numerical aptitude, and verbal comprehension',
        status: 'Available'
    }
];

export default function SkillAssessmentPortal() {
    const [assessments] = useState(ASSESSMENTS);
    const [selectedAssessment, setSelectedAssessment] = useState(null);

    const handleStartAssessment = (assessment) => {
        toast.success(`Starting ${assessment.title}. Timer begins now!`);
        setSelectedAssessment(assessment);
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary rounded-2xl">
                        <Code className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Skill Assessment Portal</h2>
                        <p className="text-muted-foreground font-medium">Coding challenges & psychometric evaluations</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-primary">4</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Assessments</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-emerald-500">1</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Completed</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-amber-500">3</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {assessments.map((assessment, idx) => (
                    <motion.div
                        key={assessment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`glass-card p-6 ${assessment.status === 'Completed' ? 'border-emerald-500/20 bg-emerald-500/5' : 'hover:border-primary/30'} transition-all`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3">
                                <div className={`p-3 rounded-xl ${assessment.type === 'Coding' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                    {assessment.type === 'Coding' ? <Code className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-tight mb-1">{assessment.title}</h3>
                                    <p className="text-xs text-muted-foreground font-medium">{assessment.description}</p>
                                </div>
                            </div>
                            {assessment.status === 'Completed' && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            )}
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs font-bold">{assessment.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs font-bold">{assessment.questions} Questions</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${assessment.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                                    assessment.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-red-500/10 text-red-500'
                                }`}>
                                {assessment.difficulty}
                            </span>
                        </div>

                        {assessment.status === 'Available' ? (
                            <button
                                onClick={() => handleStartAssessment(assessment)}
                                className="w-full px-4 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" /> Start Assessment
                            </button>
                        ) : (
                            <div className="w-full px-4 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl font-black text-xs uppercase tracking-widest text-center border border-emerald-500/20">
                                Completed • Score: 85%
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
