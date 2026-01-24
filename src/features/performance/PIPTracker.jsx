import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar, FileText, CheckSquare, XCircle, Loader2 } from 'lucide-react';
import { toast } from '../../lib/services/toastService';

export default function PIPTracker() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Active');
    const [submitting, setSubmitting] = useState(false);

    const [pip] = useState({
        emp: 'Mike Ross',
        reason: 'Consistently missing sales targets for Q2 & Q3.',
        startDate: '2023-11-01',
        endDate: '2023-12-31',
        checkpoints: [
            { date: '2023-11-15', status: 'Missed', note: 'Achieved 40% of target (Expected 50%)' },
            { date: '2023-11-30', status: 'Met', note: 'Achieved 85% of target (Expected 80%)' },
            { date: '2023-12-15', status: 'Pending', note: '' },
        ]
    });

    const handlePrepareExit = () => {
        toast.warning('Initiating Offboarding Protocol for high-risk PIP failure.');
        navigate('/offboarding');
    };

    const handleExtendPIP = () => {
        setSubmitting(true);
        setTimeout(() => {
            setStatus('Extended');
            setSubmitting(false);
            toast.success('Performance Improvement Plan extended by 30 days.');
        }, 1000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            Active PIP: {pip.emp}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Duration: 60 Days • Status: <span className="font-bold text-primary">{status}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Extended' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800 animate-pulse'}`}>
                        {status === 'Extended' ? 'Extension Protocol' : 'Actions Required'}
                    </span>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-1">Reason for Enrollment</h3>
                        <p className="text-gray-900 font-medium leading-relaxed">{pip.reason}</p>
                    </div>

                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                        {pip.checkpoints.map((cp, i) => (
                            <div key={i} className="relative">
                                <div className={`absolute -left-[25px] w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white ${cp.status === 'Met' ? 'border-green-500 text-green-500' :
                                    cp.status === 'Missed' ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-300'
                                    }`}>
                                    {cp.status === 'Met' ? <CheckSquare className="w-3 h-3" /> : cp.status === 'Missed' ? <XCircle className="w-3 h-3" /> : <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
                                </div>
                                <div className={`p-4 rounded-xl border ${cp.status === 'Pending' ? 'bg-white border-dashed' : 'bg-white shadow-sm'
                                    }`}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-sm text-gray-900">Checkpoint {i + 1}</span>
                                        <span className="text-xs font-mono text-gray-500">{cp.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{cp.note || 'Review Pending'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" /> Documentation
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm group cursor-pointer hover:bg-gray-100">
                            <span className="text-blue-600 underline">Signed_PIP_Agreement.pdf</span>
                            <span className="text-xs text-muted-foreground">Nov 01</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm group cursor-pointer hover:bg-gray-100">
                            <span className="text-blue-600 underline">Counseling_Meeting_Notes.docx</span>
                            <span className="text-xs text-muted-foreground">Oct 28</span>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <h3 className="font-bold text-red-900 mb-2">Outcome Projection</h3>
                    <p className="text-sm text-red-800 leading-relaxed mb-4">
                        Based on current trajectory (1 Missed, 1 Met), the employee is at risk of termination if the final checkpoint is not met with significant improvement.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrepareExit}
                            className="flex-1 bg-white border border-red-200 text-red-700 py-2 rounded-lg font-bold hover:bg-red-100 text-xs"
                        >
                            Prepare Exit
                        </button>
                        <button
                            onClick={handleExtendPIP}
                            disabled={submitting || status === 'Extended'}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Extend PIP'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
