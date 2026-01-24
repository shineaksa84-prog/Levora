import { useState, useEffect } from 'react';
import { AlertOctagon, CheckCircle, Search, ArrowRight, ShieldAlert, FileSearch, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getPayrollRisks, runPayrollAuditScan } from '../../lib/services/payrollService';

const ICON_MAP = {
    'AlertOctagon': AlertOctagon,
    'Scale': Scale,
    'FileSearch': FileSearch,
    'ShieldAlert': ShieldAlert
};

export default function PayrollErrorPredictor() {
    const [scanStatus, setScanStatus] = useState('Idle');
    const [risks, setRisks] = useState([]);

    const runScan = async () => {
        setScanStatus('Scanning');
        try {
            await runPayrollAuditScan();
            // In a real app, we might re-fetch risks after scan, but for now we fetch the mock risks
            const data = await getPayrollRisks();
            setRisks(data);
            setScanStatus('Complete');
        } catch (error) {
            console.error("Scan failed", error);
            setScanStatus('Idle');
            toast.error("Audit scan failed.");
        }
    };

    const handleAutoCorrect = () => {
        toast.success("Corrected 2 zero-attendance records to LOP.");
        // Simulate update
    };

    const handleResolveAll = () => {
        setScanStatus('Idle');
        toast.success("Critical issues resolved. Compliance score restored to 100%.");
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                Compliance Engine
                            </span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-3">
                            Pre-Payroll Audit
                        </h2>
                        <p className="text-muted-foreground mt-1 max-w-lg">
                            AI-driven verification of 142 employee records against statutory compliance and variance thresholds.
                        </p>
                    </div>

                    {scanStatus === 'Idle' && (
                        <button
                            onClick={runScan}
                            className="cyber-button-primary flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Initiate Audit
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {scanStatus === 'Scanning' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-12 text-center glass-card rounded-2xl"
                    >
                        <div className="relative w-16 h-16 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">Analyzing Payroll Data</h3>
                        <p className="text-muted-foreground">Cross-referencing attendance, tax regulations, and salary structures...</p>
                    </motion.div>
                )}

                {scanStatus === 'Complete' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid lg:grid-cols-3 gap-6"
                    >
                        {/* Summary Card */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-foreground">Discrepancies Detected</h3>
                                <span className="text-xs font-medium text-muted-foreground">Last scan: Just now</span>
                            </div>

                            {risks.map((risk, index) => {
                                const Icon = ICON_MAP[risk.icon] || AlertOctagon;
                                return (
                                    <motion.div
                                        key={risk.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white/50 hover:bg-white border border-border p-4 rounded-xl shadow-sm transition-all hover:shadow-md flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${risk.type === 'Critical' ? 'bg-rose-50' : 'bg-amber-50'}`}>
                                                <Icon className={`w-5 h-5 ${risk.color}`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-foreground text-sm">{risk.msg}</h4>
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${risk.type === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {risk.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                                    Impact: <span className="text-foreground/80">{risk.impact}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <span className="block text-xl font-black text-foreground">{risk.count}</span>
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Records</span>
                                            </div>
                                            <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Action Panel */}
                        <div className="glass-card p-6 rounded-2xl h-fit">
                            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-primary" />
                                Recommended Actions
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                    <div className="mb-3">
                                        <span className="font-bold text-foreground text-sm block mb-1">Zero Attendance Fix</span>
                                        <p className="text-xs text-muted-foreground">Convert 2 records to Loss of Pay (LOP) automatically based on attendance logs.</p>
                                    </div>
                                    <button
                                        onClick={handleAutoCorrect}
                                        className="w-full py-2 bg-white border border-border rounded-lg text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-sm"
                                    >
                                        Auto-Correct Records
                                    </button>
                                </div>

                                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                    <div className="mb-3">
                                        <span className="font-bold text-foreground text-sm block mb-1">Compliance Review</span>
                                        <p className="text-xs text-muted-foreground">5 employees have net pay below minimum wage thresholds.</p>
                                    </div>
                                    <button className="w-full py-2 bg-white border border-border rounded-lg text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-sm">
                                        View Detailed Report
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleResolveAll}
                                className="w-full mt-6 py-3 bg-rose-500/10 text-rose-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Resolve All Critical Issues
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
