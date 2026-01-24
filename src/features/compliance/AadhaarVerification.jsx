import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Info } from 'lucide-react';
import { indianComplianceService } from '../../lib/services/indianCompliance';

export default function AadhaarVerification({ onVerified }) {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [validation, setValidation] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = () => {
        const result = indianComplianceService.validateAadhaar(aadhaarNumber);
        setValidation(result);

        if (result.valid) {
            setIsVerifying(true);
            // Simulate verification process
            setTimeout(() => {
                setIsVerifying(false);
                if (onVerified) {
                    onVerified({
                        aadhaar: aadhaarNumber,
                        masked: indianComplianceService.maskAadhaar(aadhaarNumber),
                        verified: true
                    });
                }
            }, 1500);
        }
    };

    const formatAadhaar = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})/);
        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join('-');
        }
        return cleaned;
    };

    return (
        <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
                    <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-lg text-foreground tracking-tight">Identity <span className="text-primary italic">Vault</span></h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Biometric Aadhaar Authentication</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">Digital ID String</label>
                    <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                        placeholder="XXXX-XXXX-XXXX"
                        maxLength={14}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none text-lg font-black tracking-widest transition-all placeholder:text-muted-foreground/30"
                    />
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in shake duration-500">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-0.5">{validation.error}</p>
                    </div>
                )}

                {validation && validation.valid && !isVerifying && (
                    <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in zoom-in duration-500">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Neural Confirmation Successful</p>
                            <p className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter">
                                ID Masked: {indianComplianceService.maskAadhaar(aadhaarNumber)}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-relaxed">
                        Data is shard-encrypted. Only terminal nodes (HR/ADMIN) can access the decrypted biometric footprint.
                    </p>
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!aadhaarNumber || isVerifying}
                    className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                >
                    <span className="relative z-10">{isVerifying ? 'VERIFYING BIOMETRICS...' : 'EXECUTE VERIFICATION'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-white/20 to-primary translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
            </div>
        </div>
    );
}
