import { useState, useEffect } from 'react';
import {
    Users, Briefcase, DollarSign, FileText,
    TrendingUp, ExternalLink, Plus, CheckCircle2,
    Clock, ShieldCheck, Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getAgencyData, getAgencySubmissions, submitCandidate } from '../../lib/services/agencyService';

export default function AgencyCenter() {
    const [agency, setAgency] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [agencyData, submissionsData] = await Promise.all([
                getAgencyData('agency_1'), // Mocking current agency
                getAgencySubmissions('agency_1')
            ]);
            setAgency(agencyData);
            setSubmissions(submissionsData);
        } catch (error) {
            console.error('Error loading agency center:', error);
            toast.error('Failed to sync agency protocols.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewSubmission = (e) => {
        e.preventDefault();
        toast.success('Candidate encrypted and transmitted to talent pool.');
        setShowSubmitModal(false);
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Synchronizing Agency Node...</div>;

    return (
        <div className="space-y-8">
            {/* Agency Header Card */}
            <div className="glass-card p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Certified Agency Partner</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">{agency?.name}</h1>
                        <p className="text-muted-foreground font-medium">Agreement Integrity: <span className="text-foreground">{agency?.commissionRate}% Commission</span> • <span className="text-foreground">{agency?.payoutCycle} Cycle</span></p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center px-6 py-3 bg-white/50 rounded-2xl border border-white/50">
                            <p className="text-2xl font-black text-primary">{agency?.activePlacements}</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Active Placements</p>
                        </div>
                        <div className="text-center px-6 py-3 bg-white/50 rounded-2xl border border-white/50">
                            <p className="text-2xl font-black text-foreground">${(agency?.totalBilled / 1000).toFixed(1)}k</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Total Billed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Submission List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                            <Users className="w-6 h-6 text-primary" />
                            Submission Pipeline
                        </h3>
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="px-4 py-2 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> New Submission
                        </button>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4">Candidate</th>
                                    <th className="px-6 py-4">Target Role</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-foreground">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">
                                                    {sub.name.charAt(0)}
                                                </div>
                                                {sub.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-muted-foreground">{sub.role}</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${sub.status === 'Offer Extension' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    sub.status === 'Interviewing' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono text-[10px] text-muted-foreground">{sub.submittedAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Rail: Resources & Insights */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        Agency Insights
                    </h3>

                    <div className="glass-card p-6 space-y-4 border-emerald-500/20 bg-emerald-500/5">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <h4 className="font-black text-[10px] uppercase tracking-widest">Quality Milestone</h4>
                        </div>
                        <p className="text-sm font-medium leading-relaxed">
                            Your submission-to-hire ratio is <span className="text-emerald-600 font-bold">28% higher</span> than the platform average.
                        </p>
                        <div className="h-2 w-full bg-emerald-500/10 rounded-full">
                            <div className="h-full bg-emerald-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>

                    <div className="glass-card p-4 bg-muted/30 border-dashed border-border space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Partner Documents</h4>
                        <button className="w-full flex justify-between items-center p-3 bg-white border border-border rounded-xl hover:border-primary transition-all group">
                            <span className="text-xs font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                Master Services Agreement
                            </span>
                            <Download className="w-3 h-3 text-muted-foreground" />
                        </button>
                        <button className="w-full flex justify-between items-center p-3 bg-white border border-border rounded-xl hover:border-primary transition-all group">
                            <span className="text-xs font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                Brand Guidelines 2026
                            </span>
                            <Download className="w-3 h-3 text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Submission Modal (Mock) */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card max-w-md w-full p-8 space-y-6"
                    >
                        <h3 className="text-2xl font-black tracking-tight">Deploy New Candidate</h3>
                        <form onSubmit={handleNewSubmission} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">Full Name</label>
                                <input type="text" required className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. John Wick" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">Target Role</label>
                                <select className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none">
                                    <option>Senior React Architect</option>
                                    <option>Cloud Infrastructure Lead</option>
                                    <option>Product Manager (Fintech)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">Resume Vector (PDF)</label>
                                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center text-muted-foreground hover:bg-primary/5 hover:border-primary/50 cursor-pointer transition-all">
                                    <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-[10px] font-bold">DRAG & DROP SECURE DOCUMENT</p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowSubmitModal(false)} className="flex-1 px-4 py-3 bg-muted font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-muted/80">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Deploy</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
