import { useState, useEffect } from 'react';
import { Scan, AlertTriangle, CheckCircle, FileText, Search, Loader2 } from 'lucide-react';
import { getReimbursementAudits } from '../../lib/services/payrollService';

export default function ReimbursementAudit() {
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAudits() {
            try {
                const data = await getReimbursementAudits();
                setAuditLogs(data);
            } catch (err) {
                console.error("Failed to load audit logs", err);
            } finally {
                setLoading(false);
            }
        }
        fetchAudits();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative mb-6">
                        <Scan className="w-16 h-16 text-primary animate-pulse" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-xl font-black mb-2 text-foreground">AI Audit Active</h2>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Scanning uploaded receipts for fraud patterns, duplicates, and policy violations.</p>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Audit Stats (Nov)</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-muted-foreground">Total Scanned</span>
                            <span className="text-foreground">142</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-red-500">Flagged Risk</span>
                            <span className="text-red-500">3</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-orange-500">Policy Warnings</span>
                            <span className="text-orange-500">12</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold border-t border-border/50 pt-4">
                            <span className="text-emerald-500">Auto-Verified</span>
                            <span className="text-emerald-500">127</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-2xl border border-border flex flex-col shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" /> Flagged Claims
                    </h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input className="w-full pl-10 py-2 rounded-xl border border-border bg-muted/30 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Search claims..." />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {auditLogs.filter(l => l.risk !== 'Low').map(log => (
                        <div key={log.id} className={`border rounded-2xl p-4 flex gap-4 transition-all hover:scale-[1.01] ${log.risk === 'High' ? 'bg-red-500/5 border-red-500/20' : 'bg-orange-500/5 border-orange-500/20'}`}>
                            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${log.risk === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                                }`}>
                                !
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-black text-foreground">{log.emp}</h4>
                                        <p className="text-xs text-muted-foreground font-bold">{log.category} • ₹{log.amount.toLocaleString()}</p>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${log.risk === 'High' ? 'bg-red-500 text-white border-red-500' : 'bg-orange-500 text-white border-orange-500'
                                        }`}>
                                        {log.risk} Risk
                                    </span>
                                </div>

                                <div className="bg-card/50 border border-border/50 rounded-xl p-3 mb-4">
                                    <p className={`text-[10px] font-black uppercase tracking-wider mb-2 ${log.risk === 'High' ? 'text-red-500' : 'text-orange-500'}`}>Detected Anomalies:</p>
                                    <ul className="space-y-1">
                                        {log.anomalies.map((a, i) => (
                                            <li key={i} className="text-xs text-foreground font-medium flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-current opacity-30"></div>
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-muted border border-border text-foreground py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-muted/80 transition-all">
                                        View Receipt
                                    </button>
                                    <button className="flex-1 bg-red-600/10 border border-red-600/20 text-red-500 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                                        Reject
                                    </button>
                                    <button className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center py-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Showing only flagged items</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
