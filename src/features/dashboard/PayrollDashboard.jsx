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
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Payroll Cost</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">₹1.42 Cr</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +2.4% vs last month
                    </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Employees Paid</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">138 / 142</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieChart className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">4 On Hold (New Joinees)</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Reimbursements</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">₹45,200</h3>
                        </div>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><FileText className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 font-medium">12 claims pending approval</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Compliance Status</p>
                            <h3 className="text-2xl font-bold text-green-600 mt-1">Good</h3>
                        </div>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Next: TDS Filing (Dec 7)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payroll Errors / Alerts */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" /> Action Required
                    </h2>
                    <div className="space-y-3">
                        {[
                            { msg: '3 Employees missing PAN details - Stop Salary processed.', type: 'Critical' },
                            { msg: 'LTA Proof Verification pending for 5 employees.', type: 'Warning' },
                            { msg: 'Investment Declaration window closes in 2 days.', type: 'Info' },
                        ].map((alert, i) => (
                            <div key={i} className={`p-3 rounded-lg border text-sm flex items-start gap-3 ${alert.type === 'Critical' ? 'bg-red-50 border-red-100 text-red-800' :
                                alert.type === 'Warning' ? 'bg-orange-50 border-orange-100 text-orange-800' :
                                    'bg-blue-50 border-blue-100 text-blue-800'
                                }`}>
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'Critical' ? 'bg-red-500' :
                                    alert.type === 'Warning' ? 'bg-orange-500' : 'bg-blue-500'
                                    }`} />
                                {alert.msg}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Payroll Timeline</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                                <div className="h-full w-0.5 bg-gray-200"></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-bold text-gray-900">Attendance Data Locked</p>
                                <p className="text-xs text-muted-foreground">Nov 30, 2023 • System Auto-lock</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
                                <div className="h-full w-0.5 bg-gray-200"></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-bold text-gray-900">Variable Pay Computed</p>
                                <p className="text-xs text-muted-foreground">Dec 01, 2023 • Sales Commission Updated</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-gray-300 mb-1"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500">Bank Transfer Initiation</p>
                                <p className="text-xs text-muted-foreground">Scheduled for Dec 05, 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Payroll Center {view === 'overview' ? 'Overview' : ''}</h1>
                    <div className="flex bg-muted/50 p-1 rounded-lg overflow-x-auto gap-1">
                        <button onClick={() => setView('overview')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'overview' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Dash</button>
                        <button onClick={() => setView('validator')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'validator' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Valid</button>
                        <button onClick={() => setView('structure')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'structure' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Struct</button>
                        <button onClick={() => setView('ot')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'ot' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>OT</button>
                        <button onClick={() => setView('claims')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'claims' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Claims</button>
                        <button onClick={() => setView('arrears')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'arrears' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Arrears</button>
                        <div className="w-px bg-gray-300 mx-1"></div>
                        <button onClick={() => setView('pf_esi')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'pf_esi' ? 'bg-white shadow text-purple-600' : 'text-muted-foreground hover:text-foreground'}`}>PF/ESI</button>
                        <button onClick={() => setView('legal_cal')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'legal_cal' ? 'bg-white shadow text-purple-600' : 'text-muted-foreground hover:text-foreground'}`}>Calendar</button>
                        <button onClick={() => setView('form16')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'form16' ? 'bg-white shadow text-purple-600' : 'text-muted-foreground hover:text-foreground'}`}>Form16</button>
                        <button onClick={() => setView('gratuity')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'gratuity' ? 'bg-white shadow text-purple-600' : 'text-muted-foreground hover:text-foreground'}`}>Gratuity</button>
                        <button onClick={() => setView('posh')} className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider transition-all ${view === 'posh' ? 'bg-white shadow text-pink-600' : 'text-muted-foreground hover:text-foreground'}`}>POSH</button>
                    </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Run Payroll (Nov)
                </button>
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
