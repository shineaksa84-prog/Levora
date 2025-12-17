import { useState } from 'react';
import { GitPullRequest, ArrowRight, CheckCircle, Clock, User, Filter } from 'lucide-react';

const REQUESTS = [
    { id: 'CR-001', type: 'Designation Change', employee: 'John Doe', current: 'SDE I', new: 'SDE II', status: 'Manager Approved', date: '2023-11-01' },
    { id: 'CR-002', type: 'Department Transfer', employee: 'Jane Roe', current: 'Marketing', new: 'Sales', status: 'Requested', date: '2023-11-02' },
    { id: 'CR-003', type: 'Relocation', employee: 'Bob Smith', current: 'Mumbai', new: 'Bangalore', status: 'HR Review', date: '2023-10-28' },
    { id: 'CR-004', type: 'Salary Revision', employee: 'Alice Wonder', current: '15 LPA', new: '18 LPA', status: 'Completed', date: '2023-10-15' },
];

const STAGES = ['Requested', 'Manager Approved', 'HR Review', 'Completed'];

export default function ChangeRequestBoard() {
    const [requests, setRequests] = useState(REQUESTS);

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <GitPullRequest className="w-6 h-6 text-primary" />
                    Change Requests
                </h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    + New Request
                </button>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
                {STAGES.map((stage) => (
                    <div key={stage} className="flex flex-col bg-muted/20 rounded-xl border border-border/50 max-h-full">
                        <div className="p-3 border-b border-border/50 bg-muted/40 font-semibold text-sm text-gray-700 flex justify-between items-center">
                            {stage}
                            <span className="bg-white px-2 py-0.5 rounded-full text-xs text-muted-foreground border">
                                {requests.filter(r => r.status === stage).length}
                            </span>
                        </div>
                        <div className="p-3 space-y-3 overflow-y-auto flex-1">
                            {requests.filter(r => r.status === stage).map(req => (
                                <div key={req.id} className="bg-card p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-mono text-muted-foreground">{req.id}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                            {req.type.split(' ')[0]}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 mb-1">{req.employee}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                                        <span>{req.current}</span>
                                        <ArrowRight className="w-3 h-3" />
                                        <span className="font-medium text-gray-900">{req.new}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100">
                                        <span className="text-xs text-muted-foreground">{req.date}</span>
                                        <div className="flex -space-x-1">
                                            <div className="w-5 h-5 rounded-full bg-green-100 border border-white flex items-center justify-center text-[8px] font-bold text-green-700" title="Manager Approved">M</div>
                                            {stage !== 'Requested' && stage !== 'Manager Approved' && (
                                                <div className="w-5 h-5 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[8px] font-bold text-purple-700" title="HR Verified">H</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
