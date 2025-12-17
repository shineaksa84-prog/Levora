import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Database } from 'lucide-react';

export default function DataAuditor() {
    const [scanning, setScanning] = useState(false);
    const [score, setScore] = useState(85);
    const [issues, setIssues] = useState([
        { id: 1, type: 'Missing Data', desc: '5 Employees missing Emergency Contact', severity: 'High' },
        { id: 2, type: 'Inconsistency', desc: 'Active Status but Termination Date present (ID: EMP042)', severity: 'Critical' },
        { id: 3, type: 'Validation', desc: 'Invalid PAN Card format detected for 3 records', severity: 'Medium' },
    ]);

    const runScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setScore(92); // Optimistic simulation
            setIssues([
                { id: 1, type: 'Missing Data', desc: '2 Employees missing Emergency Contact', severity: 'High' }, // Reduced count
            ]);
        }, 2000);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-4 relative">
                    {scanning ? (
                        <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
                    ) : (
                        <Database className="w-10 h-10 text-blue-600" />
                    )}
                    {!scanning && (
                        <div className="absolute -bottom-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
                            {score}%
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Health Audit</h2>
                <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                    Scan your HRIMS database for inconsistencies, missing fields, and logic errors.
                    Maintains data integrity for payroll and compliance.
                </p>
                <button
                    onClick={runScan}
                    disabled={scanning}
                    className="mt-6 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {scanning ? 'Auditing Database...' : 'Run Full System Scan'}
                </button>
            </div>

            <div className="flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Detected Anomalies ({issues.length})
                    </h3>
                    <span className="text-xs text-muted-foreground">Last scan: Just now</span>
                </div>

                <div className="overflow-y-auto p-4 space-y-3">
                    {issues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                            <h4 className="font-bold text-gray-900">All Systems Nominal</h4>
                            <p className="text-sm text-muted-foreground">No data inconsistencies found.</p>
                        </div>
                    ) : (
                        issues.map((issue) => (
                            <div key={issue.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
                                <div className={`mt-1 p-1.5 rounded-full ${issue.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                                        issue.severity === 'High' ? 'bg-orange-100 text-orange-600' :
                                            'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    <XCircle className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-sm">{issue.type}</h4>
                                    <p className="text-sm text-gray-600 mt-0.5">{issue.desc}</p>
                                </div>
                                <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    Fix Now
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
