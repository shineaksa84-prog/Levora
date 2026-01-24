import { useState } from 'react';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { indianComplianceService } from '../../lib/services/indianCompliance';

export default function PANValidation({ onValidated }) {
    const [panNumber, setPanNumber] = useState('');
    const [validation, setValidation] = useState(null);

    const handleValidate = () => {
        const result = indianComplianceService.validatePAN(panNumber.toUpperCase());
        setValidation(result);

        if (result.valid && onValidated) {
            onValidated({
                pan: panNumber.toUpperCase(),
                verified: true
            });
        }
    };

    const formatPAN = (value) => {
        return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    };

    return (
        <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex items-center gap-5 mb-10 overflow-hidden relative z-10">
                <div className="p-4 bg-primary/10 rounded-2xl shadow-inner">
                    <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-foreground tracking-tight uppercase">PAN <span className="text-primary italic">Validation</span></h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Institutional Tax Identity Verification</p>
                </div>
            </div>

            <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2 block italic">Permanent Account Number</label>
                    <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(formatPAN(e.target.value))}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="w-full px-6 py-5 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-mono text-xl font-black tracking-[0.4em] placeholder:text-muted-foreground/20 text-center uppercase shadow-inner"
                    />
                    <div className="flex justify-between px-2">
                        <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Protocol: I-TAX-STD-V4</p>
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">A-A-A-A-A-0-0-0-0-A</p>
                    </div>
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-center gap-4 p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in shake-in duration-300">
                        <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-relaxed">{validation.error}</p>
                    </div>
                )}

                {validation && validation.valid && (
                    <div className="flex items-center gap-4 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-relaxed">Tax Identifier Integrity Verified</p>
                    </div>
                )}

                <button
                    onClick={handleValidate}
                    disabled={!panNumber || panNumber.length < 10}
                    className="w-full px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                >
                    <span className="relative z-10">Execute Validation</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </div>
    );
}
