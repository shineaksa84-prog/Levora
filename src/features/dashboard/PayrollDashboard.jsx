import { useState } from 'react';
import {
    DollarSign, TrendingUp, AlertCircle, FileText,
    Calculator, Calendar as CalendarIcon, PieChart, Shield
} from 'lucide-react';
import SalaryStructureGen from '../payroll/SalaryStructureGen';
import PayCycleValidator from '../payroll/PayCycleValidator';
import OvertimeManager from '../payroll/OvertimeManager';
import ReimbursementAudit from '../payroll/ReimbursementAudit';
import ArrearCalculator from '../payroll/ArrearCalculator';
import PF_ESI_Validator from '../compliance/PF_ESI_Validator';
import StatutoryCalendar from '../compliance/StatutoryCalendar';
import Form16Generator from '../compliance/Form16Generator';
import GratuityCalculator from '../compliance/GratuityCalculator';
import POSH_Manager from '../compliance/POSH_Manager';
import SalaryStructureBuilder from '../payroll/SalaryStructureBuilder';
import CTCCalculator from '../payroll/CTCCalculator';
import PayslipAnalyzer from '../payroll/PayslipAnalyzer';
import ComplianceCalendar from '../payroll/ComplianceCalendar';
import IncomeTaxPlanner from '../payroll/IncomeTaxPlanner';
import ReimbursementManager from '../payroll/ReimbursementManager';
import FnFCalculator from '../payroll/FnFCalculator';
import SalaryBenchmark from '../analytics/SalaryBenchmark';

export default function PayrollDashboard() {
    const [view, setView] = useState('overview');

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Payroll Cost</p>
                            <h3 className="text-2xl font-black text-foreground mt-1">₹1.42 Cr</h3>
                        </div>
                        <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2 font-black flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +2.4% vs last month
                    </p>
                </div>
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Disbursed</p>
                            <h3 className="text-2xl font-black text-foreground mt-1">138 <span className="text-base text-muted-foreground font-medium">/ 142</span></h3>
                        </div>
                        <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg"><PieChart className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">4 On Hold (New Joinees)</p>
                </div>
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Claims</p>
                            <h3 className="text-2xl font-black text-foreground mt-1">₹45,200</h3>
                        </div>
                        <div className="p-2 bg-rose-500/10 text-rose-600 rounded-lg"><FileText className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-rose-600 mt-2 font-bold">12 pending approval</p>
                </div>
                <div className="glass-card p-5 relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Compliance</p>
                            <h3 className="text-2xl font-black text-emerald-600 mt-1">98%</h3>
                        </div>
                        <div className="p-2 bg-violet-500/10 text-violet-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">Next: TDS Filing (Dec 7)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payroll Errors / Alerts */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-600" /> Compliance Alerts
                    </h2>
                    <div className="space-y-3">
                        {[
                            { msg: '3 Employees missing PAN details - Stop Salary processed.', type: 'Critical' },
                            { msg: 'LTA Proof Verification pending for 5 employees.', type: 'Warning' },
                            { msg: 'Investment Declaration window closes in 2 days.', type: 'Info' },
                        ].map((alert, i) => (
                            <div key={i} className={`p-4 rounded-xl border text-sm flex items-start gap-3 transition-colors ${alert.type === 'Critical' ? 'bg-rose-500/5 border-rose-500/20 text-rose-700' :
                                alert.type === 'Warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-700' :
                                    'bg-blue-500/5 border-blue-500/20 text-blue-700'
                                }`}>
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'Critical' ? 'bg-rose-500' :
                                    alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                <span className="font-medium">{alert.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-black text-foreground mb-4">Payroll Timeline</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 mb-1 ring-4 ring-emerald-500/10"></div>
                                <div className="h-full w-0.5 bg-border/50"></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-bold text-foreground">Attendance Data Locked</p>
                                <p className="text-xs text-muted-foreground">Nov 30, 2023 • System Auto-lock</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mb-1 ring-4 ring-blue-500/10"></div>
                                <div className="h-full w-0.5 bg-border/50"></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-bold text-foreground">Variable Pay Computed</p>
                                <p className="text-xs text-muted-foreground">Dec 01, 2023 • Sales Commission Updated</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-muted mb-1 ring-4 ring-muted/20"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-muted-foreground">Bank Transfer Initiation</p>
                                <p className="text-xs text-muted-foreground">Scheduled for Dec 05, 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <Calculator className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Financial Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        Payroll <span className="text-primary italic">Command</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Comprehensive compensation validation, compliance tracking, and disbursement control.
                    </p>
                </div>
                <div>
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        <DollarSign className="w-5 h-5" /> Run Payroll (Nov)
                    </button>
                </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex bg-muted/50 p-1.5 rounded-[2rem] border border-border/50 w-full overflow-x-auto no-scrollbar">
                {[
                    { id: 'overview', label: 'Dashboard' },
                    { id: 'validator', label: 'Validator' },
                    { id: 'structure', label: 'Structure' },
                    { id: 'ot', label: 'Overtime' },
                    { id: 'claims', label: 'Reimbursement' },
                    { id: 'arrears', label: 'Arrears' },
                    // Divider logic handled by visual grouping or just sequential
                    { id: 'pf_esi', label: 'PF/ESI' },
                    { id: 'legal_cal', label: 'Calendar' },
                    { id: 'form16', label: 'Form 16' },
                    { id: 'gratuity', label: 'Gratuity' },
                    { id: 'posh', label: 'POSH' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${view === tab.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {view === 'overview' && renderOverview()}
            {view === 'validator' && <PayCycleValidator />}
            {view === 'structure' && <SalaryStructureGen />}
            {view === 'ot' && <OvertimeManager />}
            {view === 'claims' && <ReimbursementAudit />}
            {view === 'arrears' && <ArrearCalculator />}
            {view === 'pf_esi' && <PF_ESI_Validator />}
            {view === 'legal_cal' && <StatutoryCalendar />}
            {view === 'form16' && <Form16Generator />}
            {view === 'gratuity' && <GratuityCalculator />}
            {view === 'posh' && <POSH_Manager />}
        </div>
    );
}
