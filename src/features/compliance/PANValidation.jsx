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
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">PAN Validation</h3>
                    <p className="text-sm text-muted-foreground">Validate Permanent Account Number</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-2 block">PAN Number</label>
                    <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(formatPAN(e.target.value))}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format: ABCDE1234F</p>
                </div>

                {validation && !validation.valid && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{validation.error}</p>
                    </div>
                )}

                {validation && validation.valid && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-700 font-medium">Valid PAN format</p>
                    </div>
                )}

                <button
                    onClick={handleValidate}
                    disabled={!panNumber}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Validate PAN
                </button>
            </div>
        </div>
    );
}
