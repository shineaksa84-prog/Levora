import { useState } from 'react';
import { Building2, CheckCircle, XCircle, Search } from 'lucide-react';
import { indianComplianceService } from '../../lib/services/indianCompliance';

export default function BankDetailsValidator({ onValidated }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [validation, setValidation] = useState(null);
    const [bankDetails, setBankDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleValidate = async () => {
        const ifscResult = indianComplianceService.validateIFSC(ifscCode.toUpperCase());

        if (!ifscResult.valid) {
            setValidation(ifscResult);
            return;
        }

        if (!accountNumber || accountNumber.length < 9) {
            setValidation({ valid: false, error: 'Account number must be at least 9 digits' });
            return;
        }

        setLoading(true);

        // Fetch bank details
        try {
            const details = await indianComplianceService.getBankFromIFSC(ifscCode.toUpperCase());
            setBankDetails(details);
            setValidation({ valid: true });

            if (onValidated) {
                onValidated({
                    accountNumber,
                    ifscCode: ifscCode.toUpperCase(),
                    bankDetails: details
                });
            }
        } catch (error) {
            setValidation({ valid: false, error: 'Failed to fetch bank details' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-[2rem] border border-border p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
                    <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-lg text-foreground tracking-tight">Fiscal <span className="text-primary italic">Gateway</span></h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Bank & IFSC Infrastructure Validation</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">Account Coordinates</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter account number"
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none text-lg font-black tracking-widest transition-all placeholder:text-muted-foreground/30 font-mono"
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">Neural IFSC Code</label>
                    <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase().slice(0, 11))}
                        placeholder="ABCD0123456"
                        maxLength={11}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none text-lg font-black tracking-[0.3em] transition-all placeholder:text-muted-foreground/30 font-mono"
                    />
                    <p className="text-[8px] font-black text-muted-foreground mt-2 uppercase tracking-widest opacity-60">Architect: 4 Letters + 0 + 6 Alphanumeric</p>
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in shake duration-500">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-0.5">{validation.error}</p>
                    </div>
                )}

                {bankDetails && validation?.valid && (
                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl space-y-4 animate-in zoom-in duration-500">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Institution Verified</p>
                        </div>
                        <div className="space-y-2 text-[10px] font-black uppercase tracking-widest">
                            <div className="flex justify-between border-b border-emerald-500/10 pb-2">
                                <span className="text-muted-foreground">Bank Node:</span>
                                <span className="text-foreground">{bankDetails.bank}</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-500/10 pb-2">
                                <span className="text-muted-foreground">Branch Sector:</span>
                                <span className="text-foreground">{bankDetails.branch}</span>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleValidate}
                    disabled={!accountNumber || !ifscCode || loading}
                    className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>CROSS-REFING...</span>
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                <span>VALIDATE INFRASTRUCTURE</span>
                            </>
                        )}
                    </div>
                </button>

                {bankDetails && validation?.valid && (
                    <button
                        onClick={() => {
                            if (onValidated) {
                                onValidated({
                                    accountNumber,
                                    ifscCode: ifscCode.toUpperCase(),
                                    bankDetails
                                });
                            }
                        }}
                        className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 mt-2"
                    >
                        Apply to Global Profile
                    </button>
                )}
            </div>
        </div>
    );
}
