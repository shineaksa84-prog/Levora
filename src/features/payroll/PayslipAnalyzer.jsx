import { useState } from 'react';
import { Scan, FileSearch, CheckCircle2, AlertTriangle, Upload } from 'lucide-react';

export default function PayslipAnalyzer() {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    const scanPayslip = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setResult({
                status: 'Mismatch', // Mismatch or Match
                extracted: 68500,
                expected: 68900,
                diff: 400,
                issues: ['PF Calculation mismatch (Rounded off incorrectly)', 'LTA not reflected']
            });
        }, 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col items-center justify-center border-dashed border-2 relative">
                <div className="w-48 h-64 bg-white shadow-lg border border-gray-200 flex flex-col p-4 mb-4 scale-90 rotate-2 transition-transform hover:rotate-0 hover:scale-100 duration-300">
                    <div className="h-4 w-1/2 bg-gray-200 mb-4 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                        <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                    </div>
                    <div className="mt-auto pt-4 border-t">
                        <div className="flex justify-between">
                            <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
                            <div className="h-3 w-1/4 bg-green-100 text-green-800 text-[8px] flex items-center justify-center font-bold">₹68,500</div>
                        </div>
                    </div>
                </div>

                {scanning && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-3">
                            <Scan className="w-10 h-10 text-primary animate-pulse" />
                            <p className="font-bold text-primary">Scanning Document...</p>
                        </div>
                    </div>
                )}

                <p className="text-muted-foreground text-sm font-medium">Payslip_Nov_2023_JD.pdf</p>
                <button
                    onClick={scanPayslip}
                    disabled={scanning}
                    className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90 flex items-center gap-2"
                >
                    <FileSearch className="w-4 h-4" /> Audit Payslip
                </button>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-4">Audit Results</h2>

                {!result ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Scan className="w-12 h-12 mb-3" />
                        <p>No audit data available</p>
                    </div>
                ) : (
                    <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className={`p-4 rounded-xl border mb-6 flex items-start gap-4 ${result.status === 'Match'
                                ? 'bg-green-50 border-green-200'
                                : 'bg-red-50 border-red-200'
                            }`}>
                            <div className={`p-2 rounded-full ${result.status === 'Match' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {result.status === 'Match' ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${result.status === 'Match' ? 'text-green-900' : 'text-red-900'}`}>
                                    {result.status === 'Match' ? 'Verification Successful' : 'Discrepancy Detected'}
                                </h3>
                                <p className={`text-sm mt-1 mb-2 ${result.status === 'Match' ? 'text-green-800' : 'text-red-800'}`}>
                                    The extracted net pay {result.status === 'Match' ? 'matches' : 'does not match'} the system calculated record.
                                </p>
                                {result.diff > 0 && (
                                    <span className="bg-white px-2 py-0.5 rounded text-xs font-bold border shadow-sm text-red-700">
                                        Variance: ₹{result.diff}
                                    </span>
                                )}
                            </div>
                        </div>

                        {result.issues && (
                            <div className="space-y-3">
                                <h4 className="font-bold text-sm text-gray-700 uppercase">Specific Issues Found</h4>
                                {result.issues.map((issue, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                                        <span className="text-gray-800 text-sm font-medium">{issue}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
