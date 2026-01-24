import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getActiveNegotiations, getNegotiationMetrics } from '../../lib/services/offerNegotiationService';

export default function OfferNegotiationTracker() {
    const [negotiations, setNegotiations] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNegotiation, setSelectedNegotiation] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [negotiationsData, metricsData] = await Promise.all([
                getActiveNegotiations(),
                getNegotiationMetrics()
            ]);

            setNegotiations(negotiationsData);
            setMetrics(metricsData);
        } catch (error) {
            toast.error('Failed to load negotiations');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
    };

    const calculateTotalComp = (offer) => {
        return (offer.baseSalary || 0) + (offer.bonus || 0) + (offer.equity || 0);
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Loading Negotiations...</div>;

    return (
        <div className="space-y-6">
            {/* Header & Metrics */}
            <div className="glass-card p-8 bg-gradient-to-r from-emerald-500/5 to-primary/5 border-emerald-500/20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <DollarSign className="w-7 h-7 text-emerald-500" />
                            Offer Negotiation Tracker
                        </h2>
                        <p className="text-muted-foreground font-medium mt-1">Counter-offer management workflow</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-primary">{metrics.total}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Offers</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-emerald-500">{metrics.accepted}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accepted</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-amber-500">{metrics.inNegotiation}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">In Negotiation</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-primary">{metrics.acceptanceRate}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accept Rate</p>
                    </div>
                </div>
            </div>

            {/* Negotiations Pipeline */}
            <div className="grid lg:grid-cols-2 gap-6">
                {negotiations.map((neg, idx) => (
                    <motion.div
                        key={neg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer"
                        onClick={() => setSelectedNegotiation(neg)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-black text-lg">{neg.candidateName}</h3>
                                <p className="text-sm text-muted-foreground font-medium">{neg.role}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${neg.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                                    neg.status === 'In Negotiation' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-blue-500/10 text-blue-500'
                                }`}>
                                {neg.stage}
                            </span>
                        </div>

                        {/* Initial vs Counter Comparison */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-muted/30 rounded-xl">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">Initial Offer</p>
                                <p className="text-xl font-black text-primary">{formatCurrency(calculateTotalComp(neg.initialOffer))}</p>
                                <div className="text-xs text-muted-foreground mt-1">
                                    <div>Base: {formatCurrency(neg.initialOffer.baseSalary)}</div>
                                    <div>Bonus: {formatCurrency(neg.initialOffer.bonus)}</div>
                                </div>
                            </div>

                            {neg.counterOffer && (
                                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-2">Counter Offer</p>
                                    <p className="text-xl font-black text-amber-600">{formatCurrency(calculateTotalComp(neg.counterOffer))}</p>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        <div>Base: {formatCurrency(neg.counterOffer.baseSalary)}</div>
                                        <div>Bonus: {formatCurrency(neg.counterOffer.bonus)}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Budget Variance */}
                        {neg.budgetVariance !== 0 && (
                            <div className={`p-3 rounded-xl flex items-center justify-between ${neg.budgetVariance > 0 ? 'bg-red-500/5 border border-red-500/20' : 'bg-emerald-500/5 border border-emerald-500/20'
                                }`}>
                                <span className="text-xs font-bold">Budget Variance</span>
                                <span className={`text-sm font-black ${neg.budgetVariance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {neg.budgetVariance > 0 ? '+' : ''}{formatCurrency(neg.budgetVariance)}
                                </span>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Offer sent: {neg.timeline.offerSent}</span>
                            {neg.timeline.expectedDecision && (
                                <span>• Decision by: {neg.timeline.expectedDecision}</span>
                            )}
                        </div>

                        {/* Approval Status */}
                        {neg.approvalStatus === 'Pending' && (
                            <div className="mt-3 p-2 bg-amber-500/5 border border-amber-500/20 rounded-lg flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-bold text-amber-600">Pending Approval</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Selected Negotiation Detail Modal */}
            {selectedNegotiation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={() => setSelectedNegotiation(null)}>
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black">{selectedNegotiation.candidateName}</h3>
                                <p className="text-muted-foreground font-medium">{selectedNegotiation.role}</p>
                            </div>
                            <button onClick={() => setSelectedNegotiation(null)} className="p-2 hover:bg-muted rounded-lg">
                                ✕
                            </button>
                        </div>

                        {/* Negotiation Timeline */}
                        <div>
                            <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-3">Negotiation History</h4>
                            <div className="space-y-2">
                                {selectedNegotiation.negotiationNotes.map((note, idx) => (
                                    <div key={idx} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold">{note.note}</p>
                                            <p className="text-[10px] text-muted-foreground mt-1">{note.date} • {note.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Counter Offer Justification */}
                        {selectedNegotiation.counterOffer?.justification && (
                            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                <h4 className="font-black text-sm uppercase tracking-widest text-amber-600 mb-2">Counter Offer Justification</h4>
                                <p className="text-sm text-foreground italic">"{selectedNegotiation.counterOffer.justification}"</p>
                            </div>
                        )}

                        {/* Competitor Offers */}
                        {selectedNegotiation.competitorOffers.length > 0 && (
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-3">Competitor Offers</h4>
                                {selectedNegotiation.competitorOffers.map((comp, idx) => (
                                    <div key={idx} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg mb-2">
                                        <p className="font-bold text-sm">{comp.company}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Total: {formatCurrency(comp.baseSalary + comp.bonus + comp.equity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
