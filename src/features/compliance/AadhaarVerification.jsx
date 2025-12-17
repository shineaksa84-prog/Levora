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
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">Aadhaar Verification</h3>
                    <p className="text-sm text-muted-foreground">Verify employee Aadhaar number</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-2 block">Aadhaar Number</label>
                    <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                        placeholder="XXXX-XXXX-XXXX"
                        maxLength={14}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{validation.error}</p>
                    </div>
                )}

                {validation && validation.valid && !isVerifying && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-green-700 font-medium">Aadhaar Verified</p>
                            <p className="text-xs text-green-600 mt-1">
                                Masked: {indianComplianceService.maskAadhaar(aadhaarNumber)}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                        Aadhaar will be encrypted and only last 4 digits will be visible to HR/Admin.
                    </p>
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!aadhaarNumber || isVerifying}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Aadhaar'}
                </button>
            </div>
        </div>
    );
}
