import { useState, useEffect } from 'react';
import {
    Database, Search, Filter, Edit3,
    CheckCircle2, AlertCircle, Save, X,
    ArrowUpRight, Download, Send, RefreshCw,
    Zap, ShieldAlert, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getAllPayrollRecords, updateEmployeeSalary } from '../../lib/services/compensationService';
import { createPayRun } from '../../lib/services/payrollService';
import { calculateStatutoryDeductions, runAnomalyDetection, runComplianceAudit } from '../../lib/services/payrollAutomationService';

export default function PayrollDatabase() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [anomalies, setAnomalies] = useState({});
    const [showAutomationMenu, setShowAutomationMenu] = useState(false);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        try {
            const data = await getAllPayrollRecords();
            setRecords(data);
        } catch (error) {
            toast.error('Failed to sync master payroll database.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        setEditForm({ ...record });
    };

    const handleSave = async () => {
        try {
            await updateEmployeeSalary(editingId, editForm);
            setRecords(records.map(r => r.id === editingId ? editForm : r));
            setEditingId(null);
            toast.success(`Salary structure updated for ${editForm.name}`);
        } catch (error) {
            toast.error('System error during record mutation.');
        }
    };

    const handleInitiateRun = async () => {
        setIsProcessing(true);
        try {
            // Using service to record the run
            const cycleId = `CYC-${Date.now()}`;
            await createPayRun(cycleId, batchTotals.netPayable, records.length);

            // Simulating process time
            await new Promise(r => setTimeout(r, 1500));

            toast.success(`Strategic Disbursement Complete: $${batchTotals.netPayable.toLocaleString()} processed. Ref: ${cycleId}`);
        } catch (error) {
            toast.error('disbursement sequence failed.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAutoSync = () => {
        const updated = records.map(record => {
            const deductions = calculateStatutoryDeductions(record.basic, record.gross);
            return { ...record, deductions: deductions.totalDeductions, gross: record.basic + record.hra + record.special };
        });
        setRecords(updated);
        toast.success('Statutory deductions auto-synced across all records.');
    };

    const handleScanAnomalies = () => {
        const detected = {};
        records.forEach(record => {
            const flags = runAnomalyDetection(record);
            if (flags.length > 0) detected[record.id] = flags;
        });
        setAnomalies(detected);
        toast.info(`Anomaly scan complete. ${Object.keys(detected).length} records flagged.`);
    };

    const handleComplianceAudit = () => {
        let violations = 0;
        records.forEach(record => {
            const issues = runComplianceAudit(record);
            if (issues.length > 0) violations++;
        });
        toast.warning(`Compliance audit complete. ${violations} violations detected.`);
    };

    const batchTotals = records.reduce((acc, r) => ({
        totalGross: acc.totalGross + r.gross,
        totalDeductions: acc.totalDeductions + (r.deductions || 0),
        netPayable: acc.netPayable + (r.gross - (r.deductions || 0))
    }), { totalGross: 0, totalDeductions: 0, netPayable: 0 });

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Accessing Ciphered Database...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                        <Database className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight tracking-tight">Master Payroll Database</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ciphered Records • Global Disbursement Hub</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowAutomationMenu(!showAutomationMenu)}
                            className="px-5 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-primary/20 transition-all"
                        >
                            <Zap className="w-4 h-4" /> Automations
                        </button>
                        {showAutomationMenu && (
                            <div className="absolute top-full mt-2 right-0 bg-white border border-border rounded-xl shadow-2xl overflow-hidden z-50 w-56">
                                <button onClick={() => { handleAutoSync(); setShowAutomationMenu(false); }} className="w-full px-4 py-3 text-left hover:bg-muted transition-all flex items-center gap-3 border-b border-border/50">
                                    <Calculator className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold">Auto-Sync Deductions</span>
                                </button>
                                <button onClick={() => { handleScanAnomalies(); setShowAutomationMenu(false); }} className="w-full px-4 py-3 text-left hover:bg-muted transition-all flex items-center gap-3 border-b border-border/50">
                                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                                    <span className="text-xs font-bold">Scan Anomalies</span>
                                </button>
                                <button onClick={() => { handleComplianceAudit(); setShowAutomationMenu(false); }} className="w-full px-4 py-3 text-left hover:bg-muted transition-all flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs font-bold">Audit Compliance</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="px-5 py-3 bg-white border border-border rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-muted transition-all">
                        <Download className="w-4 h-4" /> Export Ledger
                    </button>
                    <button
                        onClick={handleInitiateRun}
                        disabled={isProcessing}
                        className="px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs shadow-lg shadow-secondary/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Initiate Global Pay Run
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Search by name, ID, or department..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 outline-none transition-all" />
                    </div>
                    <button className="p-2.5 bg-white border border-border rounded-xl text-muted-foreground hover:text-secondary">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4">Employee Entity</th>
                                <th className="px-6 py-4 text-right">Basic</th>
                                <th className="px-6 py-4 text-right">Structure (Gross)</th>
                                <th className="px-6 py-4 text-center">Protocol Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {records.map((record) => (
                                <tr key={record.id} className={`hover:bg-muted/30 transition-colors ${editingId === record.id ? 'bg-secondary/5' : ''} ${anomalies[record.id] ? 'bg-red-50/50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {anomalies[record.id] && (
                                                <div className="relative group">
                                                    <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                                                    <div className="absolute left-0 top-full mt-1 bg-red-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                        {anomalies[record.id][0]?.message}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center font-black text-secondary text-xs">
                                                {record.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground leading-tight">{record.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase font-medium">{record.department} • {record.role}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right font-mono text-sm">
                                        {editingId === record.id ? (
                                            <input
                                                type="number"
                                                className="w-24 p-1 bg-white border border-border rounded text-right outline-none ring-2 ring-secondary/20"
                                                value={editForm.basic}
                                                onChange={(e) => setEditForm({ ...editForm, basic: Number(e.target.value) })}
                                            />
                                        ) : (
                                            `${record.basic.toLocaleString()}`
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-right font-bold text-foreground">
                                        {editingId === record.id ? (
                                            <span className="text-secondary opacity-50 italic">Calculated</span>
                                        ) : (
                                            `${record.gross.toLocaleString()}`
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${record.payStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' :
                                            record.payStatus === 'On Hold' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {record.payStatus === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            {record.payStatus}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        {editingId === record.id ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setEditingId(null)} className="p-2 text-muted-foreground hover:bg-white rounded-lg"><X className="w-4 h-4" /></button>
                                                <button onClick={handleSave} className="p-2 text-emerald-500 hover:bg-emerald-50/50 rounded-lg shadow-sm"><Save className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(record)}
                                                className="p-2 text-muted-foreground hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-secondary/5 border-t-2 border-secondary/20">
                            <tr>
                                <td className="px-6 py-4 font-black text-secondary uppercase text-xs tracking-widest">Batch Totals</td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-sm">${batchTotals.totalGross.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-sm text-red-600">-${batchTotals.totalDeductions.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center"></td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Net Payable</span>
                                        <span className="text-lg font-black text-emerald-600">${batchTotals.netPayable.toLocaleString()}</span>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
