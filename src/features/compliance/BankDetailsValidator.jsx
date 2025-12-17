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
        const details = await indianComplianceService.getBankFromIFSC(ifscCode.toUpperCase());

        setTimeout(() => {
            setBankDetails(details);
            setValidation({ valid: true });
            setLoading(false);

            if (onValidated) {
                onValidated({
                    accountNumber,
                    ifscCode: ifscCode.toUpperCase(),
                    bankDetails: details
                });
            }
        }, 1000);
    };

    return (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">Bank Account Details</h3>
                    <p className="text-sm text-muted-foreground">Validate bank account and IFSC code</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-2 block">Account Number</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter account number"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-2 block">IFSC Code</label>
                    <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase().slice(0, 11))}
                        placeholder="ABCD0123456"
                        maxLength={11}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format: 4 letters + 0 + 6 alphanumeric</p>
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{validation.error}</p>
                    </div>
                )}

                {bankDetails && validation?.valid && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <p className="text-sm text-green-700 font-medium">Bank Details Verified</p>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Bank:</span>
                                <span className="font-medium">{bankDetails.bank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Branch:</span>
                                <span className="font-medium">{bankDetails.branch}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">IFSC:</span>
                                <span className="font-mono font-medium">{ifscCode.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleValidate}
                    disabled={!accountNumber || !ifscCode || loading}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Validating...
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4" />
                            Validate Details
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
