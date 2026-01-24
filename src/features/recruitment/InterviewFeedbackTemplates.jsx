import { useState } from 'react';
import { FileText, Plus, Eye, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';

const ROLE_TEMPLATES = [
    {
        id: 'eng_senior',
        role: 'Senior Software Engineer',
        department: 'Engineering',
        criteria: [
            { category: 'Technical Skills', items: ['System Design', 'Code Quality', 'Problem Solving', 'Architecture'], weight: 40 },
            { category: 'Communication', items: ['Clarity', 'Documentation', 'Collaboration'], weight: 20 },
            { category: 'Leadership', items: ['Mentorship', 'Decision Making', 'Initiative'], weight: 20 },
            { category: 'Culture Fit', items: ['Values Alignment', 'Team Dynamics', 'Growth Mindset'], weight: 20 }
        ],
        scoringGuide: {
            5: 'Exceptional - Exceeds expectations significantly',
            4: 'Strong - Exceeds expectations',
            3: 'Good - Meets expectations',
            2: 'Fair - Partially meets expectations',
            1: 'Poor - Does not meet expectations'
        }
    },
    {
        id: 'pm_senior',
        role: 'Senior Product Manager',
        department: 'Product',
        criteria: [
            { category: 'Product Strategy', items: ['Vision', 'Prioritization', 'Market Understanding'], weight: 35 },
            { category: 'Execution', items: ['Roadmap Planning', 'Stakeholder Management', 'Delivery'], weight: 25 },
            { category: 'Analytics', items: ['Data-Driven Decisions', 'Metrics Definition', 'A/B Testing'], weight: 20 },
            { category: 'Communication', items: ['Stakeholder Updates', 'Team Collaboration', 'Presentation'], weight: 20 }
        ],
        scoringGuide: {
            5: 'Exceptional - Exceeds expectations significantly',
            4: 'Strong - Exceeds expectations',
            3: 'Good - Meets expectations',
            2: 'Fair - Partially meets expectations',
            1: 'Poor - Does not meet expectations'
        }
    },
    {
        id: 'designer_senior',
        role: 'Senior UX Designer',
        department: 'Design',
        criteria: [
            { category: 'Design Skills', items: ['Visual Design', 'Interaction Design', 'Prototyping'], weight: 35 },
            { category: 'User Research', items: ['User Interviews', 'Usability Testing', 'Data Analysis'], weight: 25 },
            { category: 'Collaboration', items: ['Cross-functional Work', 'Feedback Integration', 'Stakeholder Management'], weight: 20 },
            { category: 'Portfolio', items: ['Case Studies', 'Design Process', 'Impact Demonstration'], weight: 20 }
        ],
        scoringGuide: {
            5: 'Exceptional - Exceeds expectations significantly',
            4: 'Strong - Exceeds expectations',
            3: 'Good - Meets expectations',
            2: 'Fair - Partially meets expectations',
            1: 'Poor - Does not meet expectations'
        }
    }
];

export default function InterviewFeedbackTemplates() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [scores, setScores] = useState({});
    const [notes, setNotes] = useState('');
    const [recommendation, setRecommendation] = useState('');

    const handleScoreChange = (category, item, score) => {
        setScores(prev => ({
            ...prev,
            [`${category}-${item}`]: score
        }));
    };

    const calculateOverallScore = () => {
        if (!selectedTemplate) return 0;

        let totalScore = 0;
        let totalWeight = 0;

        selectedTemplate.criteria.forEach(cat => {
            const categoryScores = cat.items.map(item => scores[`${cat.category}-${item}`] || 0);
            const avgCategoryScore = categoryScores.reduce((a, b) => a + b, 0) / cat.items.length;
            totalScore += avgCategoryScore * cat.weight;
            totalWeight += cat.weight;
        });

        return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : 0;
    };

    const handleSubmit = () => {
        if (!selectedTemplate) {
            toast.error('Please select a template');
            return;
        }

        const overallScore = calculateOverallScore();
        toast.success(`Feedback submitted! Overall Score: ${overallScore}/5`);

        // Reset form
        setScores({});
        setNotes('');
        setRecommendation('');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass-card p-6 bg-primary/5 border-primary/20">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary" />
                    Interview Feedback Templates
                </h2>
                <p className="text-muted-foreground font-medium mt-1">Role-specific evaluation frameworks</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Template Library */}
                <div className="glass-card p-6">
                    <h3 className="font-black text-lg mb-4">Template Library</h3>
                    <div className="space-y-3">
                        {ROLE_TEMPLATES.map(template => (
                            <motion.button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template)}
                                className={`w-full p-4 rounded-xl text-left transition-all ${selectedTemplate?.id === template.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-muted hover:bg-muted/80'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <h4 className="font-black text-sm mb-1">{template.role}</h4>
                                <p className={`text-xs ${selectedTemplate?.id === template.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                                    {template.department} • {template.criteria.length} categories
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Evaluation Form */}
                <div className="lg:col-span-2 space-y-4">
                    {selectedTemplate ? (
                        <>
                            <div className="glass-card p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="font-black text-xl">{selectedTemplate.role}</h3>
                                        <p className="text-sm text-muted-foreground font-medium">{selectedTemplate.department}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-primary">{calculateOverallScore()}</div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Overall Score</p>
                                    </div>
                                </div>

                                {/* Scoring Guide */}
                                <div className="mb-6 p-4 bg-muted/30 rounded-xl">
                                    <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-3">Scoring Guide</h4>
                                    <div className="space-y-1 text-xs">
                                        {Object.entries(selectedTemplate.scoringGuide).reverse().map(([score, desc]) => (
                                            <div key={score} className="flex gap-2">
                                                <span className="font-black text-primary w-4">{score}</span>
                                                <span className="text-muted-foreground">{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Evaluation Criteria */}
                                <div className="space-y-6">
                                    {selectedTemplate.criteria.map(category => (
                                        <div key={category.category}>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-black text-sm">{category.category}</h4>
                                                <span className="text-xs font-bold text-muted-foreground">{category.weight}% weight</span>
                                            </div>
                                            <div className="space-y-3">
                                                {category.items.map(item => (
                                                    <div key={item} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                                        <span className="text-sm font-medium">{item}</span>
                                                        <div className="flex gap-2">
                                                            {[1, 2, 3, 4, 5].map(score => (
                                                                <button
                                                                    key={score}
                                                                    onClick={() => handleScoreChange(category.category, item, score)}
                                                                    className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${scores[`${category.category}-${item}`] === score
                                                                            ? 'bg-primary text-white scale-110'
                                                                            : 'bg-white border border-border hover:bg-muted'
                                                                        }`}
                                                                >
                                                                    {score}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Notes */}
                                <div className="mt-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium resize-none"
                                        rows="4"
                                        placeholder="Strengths, areas for improvement, specific examples..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>

                                {/* Recommendation */}
                                <div className="mt-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">
                                        Recommendation
                                    </label>
                                    <select
                                        className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                        value={recommendation}
                                        onChange={(e) => setRecommendation(e.target.value)}
                                    >
                                        <option value="">Select recommendation...</option>
                                        <option value="strong_hire">Strong Hire</option>
                                        <option value="hire">Hire</option>
                                        <option value="maybe">Maybe</option>
                                        <option value="no_hire">No Hire</option>
                                    </select>
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Submit Feedback
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="glass-card p-12 text-center">
                            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-black text-lg mb-2">Select a Template</h3>
                            <p className="text-sm text-muted-foreground">Choose a role-specific template from the library to begin evaluation</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
