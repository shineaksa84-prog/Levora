import { useState } from 'react';
import { Lock, ShieldAlert, Cpu, ChevronRight, AlertTriangle } from 'lucide-react';

const REPORTS = [
    { id: 1, subject: 'Unprofessional behavior in meeting', date: '2023-11-20', status: 'New', risk: 'Medium' },
    { id: 2, subject: 'Payroll disparity concern', date: '2023-11-18', status: 'In Review', risk: 'High' },
];

export default function GrievanceAnalyzer() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const analyzeReport = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setAnalysis({
                category: 'Workplace Conduct / Harassment',
                sentiment: 'Negative (-0.8)',
                severity: 'High (8/10)',
                summary: 'Complainant reports consistent passive-aggressive behavior and public humiliation from Manager X during weekly standups.',
                recommendation: 'Immediate separation of parties. Initiate formal investigation under Code of Conduct Policy Sec 4.2.'
            });
        }, 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-gray-700" />
                        Confidential Inbox
                    </h2>
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">2 Unresolved</span>
                </div>

                <div className="space-y-3">
                    {REPORTS.map(rep => (
                        <div
                            key={rep.id}
                            onClick={() => { setSelectedReport(rep); setAnalysis(null); }}
                            className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${selectedReport?.id === rep.id ? 'bg-gray-50 border-gray-300 shadow-sm' : 'bg-white border-gray-100'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900 text-sm">{rep.subject}</h3>
                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${rep.risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                    }`}>{rep.risk} Risk</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{rep.date} • {rep.status}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-auto bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Anonymity Protocol
                    </h4>
                    <p className="text-xs text-blue-800 mt-1">
                        All reports are encrypted. Identity is revealed only to the Chief People Officer unless "Anonymous" flag is set by the reporter.
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col relative overflow-hidden">
                {!selectedReport ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Lock className="w-16 h-16 mb-4" />
                        <p>Select a report to view details</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 pb-6 border-b border-border">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedReport.subject}</h2>
                            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                "I would like to report an incident that occurred during the Tuesday marketing sync. The manager raised their voice and made personal remarks..."
                            </p>
                        </div>

                        {!analysis ? (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <button
                                    onClick={analyzeReport}
                                    disabled={analyzing}
                                    className="bg-purple-600 text-white font-bold px-8 py-3 rounded-full hover:bg-purple-700 transition-all shadow-lg flex items-center gap-2"
                                >
                                    {analyzing ? <Cpu className="w-5 h-5 animate-spin" /> : <Cpu className="w-5 h-5" />}
                                    {analyzing ? 'Analyzing Content...' : 'Run AI Risk Analysis'}
                                </button>
                                <p className="text-xs text-muted-foreground mt-4 max-w-xs text-center">
                                    Uses NLP to detect sentiment, policy violations, and severity.
                                </p>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                        <p className="text-xs font-bold text-red-600 uppercase mb-1">Severity Score</p>
                                        <p className="text-lg font-bold text-red-900">{analysis.severity}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                        <p className="text-xs font-bold text-gray-600 uppercase mb-1">Category</p>
                                        <p className="text-sm font-bold text-gray-900">{analysis.category}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-bold text-sm mb-2">AI Summary</h4>
                                    <p className="text-sm text-gray-700 bg-muted/30 p-3 rounded-lg border border-border">
                                        {analysis.summary}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                                    <h4 className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> Recommended Action
                                    </h4>
                                    <p className="text-sm text-purple-800 mb-3">
                                        {analysis.recommendation}
                                    </p>
                                    <button className="text-xs font-bold bg-white text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                                        Initiate Investigation Workflow
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
