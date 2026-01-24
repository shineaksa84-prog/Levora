import { useState } from 'react';
import { Search, Filter, Shield, User, Clock, FileText, Download } from 'lucide-react';

const LOGS = [
    { id: 1, action: 'User Login', actor: 'alice.freeman@levora.com', target: 'System', timestamp: '2023-12-30 10:45:22', ip: '192.168.1.10', status: 'Success' },
    { id: 2, action: 'Update Salary', actor: 'admin@levora.com', target: 'Emp: Bob Jones', timestamp: '2023-12-30 09:30:00', ip: '10.0.0.5', status: 'Success' },
    { id: 3, action: 'Delete Document', actor: 'hr.ops@levora.com', target: 'Policy_V1.pdf', timestamp: '2023-12-29 16:20:11', ip: '192.168.1.15', status: 'Warning' },
    { id: 4, action: 'Failed Login', actor: 'unknown@user.com', target: 'System', timestamp: '2023-12-29 02:15:00', ip: '45.32.11.22', status: 'Failure' },
];

export default function AuditLog() {
    const [logs, setLogs] = useState(LOGS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" /> System Audit Trails
                    </h3>
                    <p className="text-sm text-muted-foreground">Immutable record of all sensitive actions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 text-slate-300 font-medium">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Actor</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">Target</th>
                            <th className="p-4">IP Address</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {logs.map(log => (
                            <tr key={log.id} className="hover:bg-muted/30 transition-colors font-mono text-xs">
                                <td className="p-4 text-muted-foreground">{log.timestamp}</td>
                                <td className="p-4 font-bold text-primary">{log.actor}</td>
                                <td className="p-4">{log.action}</td>
                                <td className="p-4 text-gray-700">{log.target}</td>
                                <td className="p-4 text-muted-foreground">{log.ip}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${log.status === 'Success' ? 'bg-green-100 text-green-700' :
                                            log.status === 'Failure' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
