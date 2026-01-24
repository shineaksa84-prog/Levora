import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Clock, CheckCircle2, User, FileText, ExternalLink } from 'lucide-react';

const BGV_CHECKS = [
    { id: 1, type: 'Criminal Record', status: 'Clear', vendor: 'Checkr', date: '2023-11-20', report: 'https://example.com/report1' },
    { id: 2, type: 'Employment History', status: 'In Progress', vendor: 'HireRight', date: '2023-11-22', report: null },
    { id: 3, type: 'Education Verification', status: 'Clear', vendor: 'HireRight', date: '2023-11-21', report: 'https://example.com/report3' },
    { id: 4, type: 'Address Check', status: 'Red Flag', vendor: 'FieldAgent', date: '2023-11-23', report: 'https://example.com/report4', notes: 'Address does not exist' },
];

export default function BackgroundVerification({ candidateId }) {
    const [checks, setChecks] = useState(BGV_CHECKS);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Clear': return 'bg-green-100 text-green-700 border-green-200';
            case 'Red Flag': return 'bg-red-100 text-red-700 border-red-200';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Clear': return <CheckCircle2 className="w-4 h-4" />;
            case 'Red Flag': return <ShieldAlert className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Background Verification
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Managed by 3rd Party Vendors</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md hover:bg-primary/90 transition-all">
                    Initiate New Check
                </button>
            </div>

            <div className="space-y-4">
                {checks.map(check => (
                    <div key={check.id} className="p-4 rounded-xl border border-border bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${check.status === 'Red Flag' ? 'bg-red-50 text-red-600' :
                                        check.status === 'Clear' ? 'bg-green-50 text-green-600' :
                                            'bg-blue-50 text-blue-600'
                                    }`}>
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900">{check.type}</h4>
                                    <p className="text-xs text-muted-foreground">{check.vendor} • {check.date}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${getStatusColor(check.status)}`}>
                                {getStatusIcon(check.status)}
                                {check.status}
                            </span>
                        </div>

                        {check.status === 'Red Flag' && check.notes && (
                            <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded-lg border border-red-100 flex items-start gap-2">
                                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                                {check.notes}
                            </div>
                        )}

                        {check.report && (
                            <div className="mt-2 flex justify-end">
                                <a href="#" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                                    View Report <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                <p>Overall Case Status</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span className="font-bold uppercase text-yellow-600">Pending Adjudication</span>
                </div>
            </div>
        </div>
    );
}
