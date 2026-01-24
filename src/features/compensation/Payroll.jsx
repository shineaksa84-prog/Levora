import { useState, useEffect } from 'react';
import {
    DollarSign,
    Calendar,
    Download,
    TrendingUp,
    CreditCard,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck
} from 'lucide-react';
import { getPayrollHistory, getSalaryStructure, getTaxDeductions } from '../../lib/services/compensationService';
import PayrollErrorPredictor from '../../features/payroll/PayrollErrorPredictor';
import { motion, AnimatePresence } from 'framer-motion';

export default function Payroll() {
    const [payrollHistory, setPayrollHistory] = useState([]);
    const [salaryStructure, setSalaryStructure] = useState(null);
    const [taxDeductions, setTaxDeductions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAuditor, setShowAuditor] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [history, structure, taxes] = await Promise.all([
                getPayrollHistory('current_user'),
                getSalaryStructure('current_user'),
                getTaxDeductions('current_user')
            ]);
            setPayrollHistory(history);
            setSalaryStructure(structure);
            setTaxDeductions(taxes);
        } catch (error) {
            console.error('Error loading payroll data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground font-medium">Securely loading compensation data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Compliance Auditor Toggle/Section */}
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-sm">Pre-Processing Audit</h3>
                        <p className="text-xs text-muted-foreground">AI-powered error detection is active.</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAuditor(!showAuditor)}
                    className="text-xs font-bold text-primary hover:underline"
                >
                    {showAuditor ? 'Hide Auditor' : 'Show Auditor'}
                </button>
            </div>

            <AnimatePresence>
                {showAuditor && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-2">
                            <PayrollErrorPredictor />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--success))]/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-[hsl(var(--success))]/10 rounded-xl">
                            <DollarSign className="w-6 h-6 text-[hsl(var(--success))]" />
                        </div>
                        <span className="text-xs font-bold text-[hsl(var(--success))] flex items-center gap-1 bg-[hsl(var(--success))]/5 px-2 py-1 rounded-full">
                            <ArrowUpRight className="w-3 h-3" />
                            +2.5%
                        </span>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">Next Payout</h3>
                    <p className="text-3xl font-black mt-1 tracking-tight text-foreground">${payrollHistory[0]?.net.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"></span>
                        <p className="text-xs text-muted-foreground font-medium">Scheduled: Dec 28, 2024</p>
                    </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--accent))]/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-[hsl(var(--accent))]/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-[hsl(var(--accent))]" />
                        </div>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">YTD Earnings</h3>
                    <p className="text-3xl font-black mt-1 tracking-tight text-foreground">$93,500.00</p>
                    <p className="text-xs text-muted-foreground mt-3 font-medium">Gross Annual Income</p>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--violet))]/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-3 bg-[hsl(var(--violet))]/10 rounded-xl">
                            <PieChart className="w-6 h-6 text-[hsl(var(--violet))]" />
                        </div>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">Tax Deductions</h3>
                    <p className="text-3xl font-black mt-1 tracking-tight text-foreground">${taxDeductions?.ytdTax.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-3 font-medium">YTD Taxes & Benefits</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Salary Structure */}
                <div className="lg:col-span-1 glass-card p-6">
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-foreground">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Salary Structure
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-muted/40 rounded-xl border border-transparent hover:border-border transition-colors">
                            <span className="text-sm text-muted-foreground font-medium">Basic Salary</span>
                            <span className="font-bold text-foreground">${salaryStructure?.basic.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-muted/40 rounded-xl border border-transparent hover:border-border transition-colors">
                            <span className="text-sm text-muted-foreground font-medium">HRA</span>
                            <span className="font-bold text-foreground">${salaryStructure?.hra.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-muted/40 rounded-xl border border-transparent hover:border-border transition-colors">
                            <span className="text-sm text-muted-foreground font-medium">Special Allowance</span>
                            <span className="font-bold text-foreground">${salaryStructure?.specialAllowance.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-dashed border-border pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-primary">Gross Monthly</span>
                                <span className="font-black text-xl text-foreground">${salaryStructure?.gross.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payroll History */}
                <div className="lg:col-span-2 glass-card overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                        <h3 className="font-bold flex items-center gap-2 text-foreground">
                            <Calendar className="w-5 h-5 text-primary" />
                            Payment History
                        </h3>
                        <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">View All Transactions</button>
                    </div>
                    <div className="divide-y divide-border/60">
                        {payrollHistory.map((item) => (
                            <div key={item.id} className="p-5 hover:bg-muted/40 transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm">{item.month}</h4>
                                        <p className="text-xs text-muted-foreground font-medium mt-0.5 font-mono">ID: {item.reference}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right hidden sm:block">
                                        <p className="font-bold text-foreground">${item.net.toFixed(2)}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Net Disbursed</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border border-[hsl(var(--success))]/20">
                                        {item.status}
                                    </div>
                                    <button className="p-2 hover:bg-white rounded-xl transition-all text-muted-foreground hover:text-primary hover:shadow-sm border border-transparent hover:border-border">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
