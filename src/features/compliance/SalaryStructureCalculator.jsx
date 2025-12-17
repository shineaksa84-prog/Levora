import { useState } from 'react';
import { DollarSign, TrendingUp, Info } from 'lucide-react';
import { indianComplianceService } from '../../lib/services/indianCompliance';

export default function SalaryStructureCalculator() {
    const [ctc, setCtc] = useState('');
    const [structure, setStructure] = useState(null);

    const handleCalculate = () => {
        const ctcValue = parseFloat(ctc);
        if (ctcValue > 0) {
            const result = indianComplianceService.generateSalaryStructure(ctcValue);
            setStructure(result);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Indian Salary Structure Calculator</h3>
                        <p className="text-sm text-muted-foreground">Generate salary breakup based on CTC</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-sm font-medium mb-2 block">Annual CTC (₹)</label>
                        <input
                            type="number"
                            value={ctc}
                            onChange={(e) => setCtc(e.target.value)}
                            placeholder="600000"
                            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleCalculate}
                            disabled={!ctc || parseFloat(ctc) <= 0}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Calculate
                        </button>
                    </div>
                </div>
            </div>

            {structure && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <p className="text-sm text-muted-foreground mb-1">Annual CTC</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(structure.ctc)}</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <p className="text-sm text-muted-foreground mb-1">Annual Gross</p>
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(structure.components.gross)}</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <p className="text-sm text-muted-foreground mb-1">Annual Net (In-Hand)</p>
                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(structure.netSalary)}</p>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Earnings */}
                        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-border bg-green-50">
                                <h3 className="font-semibold text-green-700">Earnings</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Basic Salary (40%)</span>
                                    <span className="font-semibold">{formatCurrency(structure.components.basic)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">HRA (20%)</span>
                                    <span className="font-semibold">{formatCurrency(structure.components.hra)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Special Allowance (25%)</span>
                                    <span className="font-semibold">{formatCurrency(structure.components.specialAllowance)}</span>
                                </div>
                                <div className="pt-3 border-t border-border flex justify-between items-center">
                                    <span className="font-semibold">Gross Salary</span>
                                    <span className="font-bold text-green-600">{formatCurrency(structure.components.gross)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-border bg-red-50">
                                <h3 className="font-semibold text-red-700">Deductions</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">EPF (Employee)</span>
                                    <span className="font-semibold">{formatCurrency(structure.deductions.epf)}</span>
                                </div>
                                {structure.deductions.esic > 0 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">ESIC (Employee)</span>
                                        <span className="font-semibold">{formatCurrency(structure.deductions.esic)}</span>
                                    </div>
                                )}
                                <div className="pt-3 border-t border-border flex justify-between items-center">
                                    <span className="font-semibold">Total Deductions</span>
                                    <span className="font-bold text-red-600">{formatCurrency(structure.deductions.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Monthly Breakdown</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/50 rounded-lg p-4">
                                <p className="text-sm text-muted-foreground mb-1">Monthly Gross</p>
                                <p className="text-xl font-bold">{formatCurrency(structure.monthlyGross)}</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-4">
                                <p className="text-sm text-muted-foreground mb-1">Monthly In-Hand</p>
                                <p className="text-xl font-bold text-primary">{formatCurrency(structure.monthlyNet)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-700">
                            <p className="font-medium mb-1">Calculation Notes:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>EPF calculated at 12% of Basic (capped at ₹15,000)</li>
                                <li>ESIC applicable only if gross salary ≤ ₹21,000</li>
                                <li>Professional Tax and TDS not included in this calculation</li>
                                <li>Actual structure may vary based on company policy</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
