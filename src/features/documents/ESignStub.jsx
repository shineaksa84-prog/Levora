import { useState } from 'react';
import { PenTool, CheckCircle2, FileText, Loader2 } from 'lucide-react';

export default function ESignStub({ documentName = "Offer_Letter_V2.pdf", onComplete }) {
    const [step, setStep] = useState(1); // 1: Preview, 2: Signing, 3: Completed

    const handleSign = () => {
        setStep(2);
        setTimeout(() => {
            setStep(3);
            if (onComplete) onComplete();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <PenTool className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">DocuSign Integration</h3>
                            <p className="text-xs text-slate-400">Secure E-Signature Gateway</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                    {step === 1 && (
                        <div className="space-y-6 w-full">
                            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl">
                                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h4 className="font-bold text-slate-900 text-lg mb-1">{documentName}</h4>
                                <p className="text-sm text-slate-500">3 Pages • Requires 1 Signature</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                    Decline
                                </button>
                                <button onClick={handleSign} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                    Adopt & Sign
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                            <h4 className="font-bold text-slate-900 text-lg">Applying Digital Signature...</h4>
                            <p className="text-sm text-slate-500">Verifying identity and hashing document.</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-2xl mb-2">Signed Successfully!</h4>
                                <p className="text-slate-500">A copy has been sent to your email.</p>
                            </div>
                            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 p-4 text-center text-[10px] text-slate-400 uppercase font-bold tracking-wider border-t">
                    Powered by DocuSign API (Mock)
                </div>
            </div>
        </div>
    );
}
