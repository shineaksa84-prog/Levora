import { useState, useEffect } from 'react';
import { Smile, Meh, Frown, TrendingUp, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import {
    calculateNPSMetrics,
    getSurveyResponses,
    getFeedbackThemes,
    getSentimentDistribution,
    getActionItems
} from '../../lib/services/candidateExperienceService';

export default function CandidateExperienceSurvey() {
    const [metrics, setMetrics] = useState(null);
    const [responses, setResponses] = useState([]);
    const [themes, setThemes] = useState([]);
    const [sentiment, setSentiment] = useState(null);
    const [actionItems, setActionItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, promoters, passives, detractors

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [metricsData, responsesData, themesData, sentimentData, actionsData] = await Promise.all([
                calculateNPSMetrics(),
                getSurveyResponses(),
                getFeedbackThemes(),
                getSentimentDistribution(),
                getActionItems()
            ]);

            setMetrics(metricsData);
            setResponses(responsesData);
            setThemes(themesData);
            setSentiment(sentimentData);
            setActionItems(actionsData);
        } catch (error) {
            toast.error('Failed to load survey data');
        } finally {
            setLoading(false);
        }
    };

    const filteredResponses = responses.filter(r => {
        if (filter === 'all') return true;
        return r.category.toLowerCase() === filter;
    });

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Loading Survey Data...</div>;

    return (
        <div className="space-y-6">
            {/* NPS Score Header */}
            <div className="glass-card p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Smile className="w-7 h-7 text-primary" />
                            Candidate Experience Survey
                        </h2>
                        <p className="text-muted-foreground font-medium mt-1">Post-interview NPS tracking and feedback analysis</p>
                    </div>
                    <div className="text-center">
                        <div className={`text-5xl font-black ${metrics.npsScore >= 50 ? 'text-emerald-500' : metrics.npsScore >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
                            {metrics.npsScore}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">NPS Score</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <Smile className="w-5 h-5 text-emerald-500" />
                            <span className="text-2xl font-black text-emerald-500">{metrics.promoterPercentage}%</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Promoters (9-10)</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">{metrics.promoters} responses</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <Meh className="w-5 h-5 text-amber-500" />
                            <span className="text-2xl font-black text-amber-500">{metrics.passivePercentage}%</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Passives (7-8)</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">{metrics.passives} responses</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                            <Frown className="w-5 h-5 text-red-500" />
                            <span className="text-2xl font-black text-red-500">{metrics.detractorPercentage}%</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Detractors (0-6)</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">{metrics.detractors} responses</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Survey Responses */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="glass-card p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-black text-lg">Survey Responses</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('promoters')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === 'promoters' ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                >
                                    Promoters
                                </button>
                                <button
                                    onClick={() => setFilter('passives')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === 'passives' ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                >
                                    Passives
                                </button>
                                <button
                                    onClick={() => setFilter('detractors')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === 'detractors' ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                >
                                    Detractors
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {filteredResponses.map((response, idx) => (
                                <motion.div
                                    key={response.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-4 rounded-xl border transition-all hover:shadow-md ${response.category === 'Promoter' ? 'bg-emerald-500/5 border-emerald-500/20' :
                                            response.category === 'Passive' ? 'bg-amber-500/5 border-amber-500/20' :
                                                'bg-red-500/5 border-red-500/20'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-black text-sm">{response.candidateName}</h4>
                                            <p className="text-xs text-muted-foreground font-medium">{response.role}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-2xl font-black ${response.category === 'Promoter' ? 'text-emerald-500' :
                                                    response.category === 'Passive' ? 'text-amber-500' :
                                                        'text-red-500'
                                                }`}>
                                                {response.npsScore}
                                            </span>
                                            <span className="text-[9px] text-muted-foreground font-bold">/10</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-foreground mb-3 italic">"{response.feedback}"</p>

                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex gap-2">
                                            {response.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-muted rounded-full text-[9px] font-bold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-muted-foreground font-medium">{response.submittedAt}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Themes & Actions */}
                <div className="space-y-4">
                    {/* Sentiment Distribution */}
                    <div className="glass-card p-6">
                        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Sentiment
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-emerald-600">Positive</span>
                                    <span>{Math.round((sentiment.positive / sentiment.total) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${(sentiment.positive / sentiment.total) * 100}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-amber-600">Neutral</span>
                                    <span>{Math.round((sentiment.neutral / sentiment.total) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{ width: `${(sentiment.neutral / sentiment.total) * 100}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-red-600">Negative</span>
                                    <span>{Math.round((sentiment.negative / sentiment.total) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${(sentiment.negative / sentiment.total) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Themes */}
                    <div className="glass-card p-6">
                        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Common Themes
                        </h3>
                        <div className="space-y-2">
                            {themes.slice(0, 5).map(theme => (
                                <div key={theme.tag} className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                                    <span className="text-xs font-bold">{theme.tag}</span>
                                    <span className="text-xs font-black text-primary">{theme.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="glass-card p-6">
                        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Action Items
                        </h3>
                        <div className="space-y-3">
                            {actionItems.length > 0 ? (
                                actionItems.map((item, idx) => (
                                    <div key={idx} className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                        <div className="flex items-start gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${item.priority === 'High' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                                                }`}>
                                                {item.priority}
                                            </span>
                                            <span className="text-[9px] font-bold text-muted-foreground">{item.category}</span>
                                        </div>
                                        <p className="text-xs font-bold mb-1">{item.action}</p>
                                        <p className="text-[10px] text-muted-foreground">{item.impact}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-4">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-emerald-600">No critical actions needed</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
