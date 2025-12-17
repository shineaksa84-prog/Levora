import { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, Save, PieChart } from 'lucide-react';

const DEFAULT_COMPONENTS = [
    { id: 1, name: 'Basic Salary', type: 'Fixed', value: 50, isPercentage: true, taxable: true },
    { id: 2, name: 'HRA', type: 'Fixed', value: 40, isPercentage: true, baseId: 1, taxable: false }, // 40% of Basic
    { id: 3, name: 'Special Allowance', type: 'Balancing', value: 0, isPercentage: false, taxable: true },
    { id: 4, name: 'PF (Employer)', type: 'Deduction', value: 1800, isPercentage: false, taxable: false },
];

export default function SalaryStructureBuilder() {
    const [ctc, setCtc] = useState(1200000);
    const [components, setComponents] = useState(DEFAULT_COMPONENTS);
    const [breakdown, setBreakdown] = useState([]);

    useEffect(() => {
        calculateStructure();
    }, [ctc, components]);

    const calculateStructure = () => {
        let remaining = ctc;
        const monthlyCtc = ctc / 12;

        let newBreakdown = components.map(comp => {
            let annual = 0;
            if (comp.name === 'Basic Salary') {
                annual = (ctc * comp.value) / 100;
            } else if (comp.name === 'HRA') {
                // Find basic
                const basic = (ctc * components.find(c => c.id === comp.baseId).value) / 100;
                annual = (basic * comp.value) / 100;
            } else if (comp.type !== 'Balancing') {
                annual = comp.value * 12; // Flat monthly * 12
            }

            if (comp.type !== 'Balancing') {
                remaining -= annual;
            }

            return { ...comp, annual, monthly: annual / 12 };
        });

        // Assign remaining to Special Allowance
        newBreakdown = newBreakdown.map(comp => {
            if (comp.type === 'Balancing') {
                return { ...comp, annual: remaining, monthly: remaining / 12 };
            }
            return comp;
        });

        setBreakdown(newBreakdown);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Salary Structure Designer
                </h2>

                <div className="mb-6">
                    <label className="text-sm font-medium mb-1.5 block">Annual CTC (₹)</label>
                    <input
                        type="number"
                        className="w-full text-2xl font-bold p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                        value={ctc}
                        onChange={(e) => setCtc(Number(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Monthly Cost: {formatCurrency(ctc / 12)}</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase px-2 mb-1">
                        <span>Component</span>
                        <span>Calc Logic</span>
                    </div>
                    {components.map((comp) => (
                        <div key={comp.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-colors bg-background">
                            <div>
                                <p className="font-bold text-gray-900">{comp.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${comp.taxable ? 'bg-red-400' : 'bg-green-400'}`}></span>
                                    {comp.taxable ? 'Taxable' : 'Tax Exempt'}
                                </p>
                            </div>
                            <div className="text-right text-sm font-mono text-gray-600">
                                {comp.type === 'Balancing' ? 'Balance Amount' :
                                    comp.isPercentage ? `${comp.value}%` : `Flat ₹${comp.value}`}
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-muted-foreground font-medium hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add Allowance / Deduction
                    </button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-0 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Computed Breakdown</h3>
                    <div className="flex gap-2">
                        <button className="text-xs bg-white border px-3 py-1 rounded font-medium shadow-sm hover:bg-gray-50">Reset</button>
                        <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded font-bold shadow-sm flex items-center gap-1">
                            <Save className="w-3 h-3" /> Save Template
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Component</th>
                                <th className="px-6 py-4 font-semibold text-right">Monthly</th>
                                <th className="px-6 py-4 font-semibold text-right">Annual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {breakdown.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                                    <td className="px-6 py-4 text-right font-mono tabular-nums">{formatCurrency(item.monthly)}</td>
                                    <td className="px-6 py-4 text-right font-mono tabular-nums font-medium">{formatCurrency(item.annual)}</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                                <td className="px-6 py-4">Total CTC</td>
                                <td className="px-6 py-4 text-right text-green-700">{formatCurrency(ctc / 12)}</td>
                                <td className="px-6 py-4 text-right text-green-700">{formatCurrency(ctc)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-muted/20 text-xs text-muted-foreground text-center">
                    * Values are estimates. PF calculations limited to statutory cap of ₹15,000 basic if enabled.
                </div>
            </div>
        </div>
    );
}
