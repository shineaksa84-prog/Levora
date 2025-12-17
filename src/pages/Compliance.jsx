import { useState } from 'react';
import AadhaarVerification from '../features/compliance/AadhaarVerification';
import PANValidation from '../features/compliance/PANValidation';
import BankDetailsValidator from '../features/compliance/BankDetailsValidator';
import SalaryStructureCalculator from '../features/compliance/SalaryStructureCalculator';
import { indianComplianceService } from '../lib/services/indianCompliance';
import { Shield, CreditCard, Building2, DollarSign, FileText, Calculator } from 'lucide-react';

export default function Compliance() {
    const [activeTab, setActiveTab] = useState('verification');

    const tabs = [
        { id: 'verification', label: 'ID Verification', icon: Shield },
        { id: 'banking', label: 'Banking Details', icon: Building2 },
        { id: 'salary', label: 'Salary Structure', icon: DollarSign },
        { id: 'statutory', label: 'Statutory Calculators', icon: Calculator },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Indian Compliance</h1>
                    <p className="text-muted-foreground mt-1">Manage statutory compliance and validations for Indian employees.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div>
                {activeTab === 'verification' && (
                    <div className="grid grid-cols-2 gap-6">
                        <AadhaarVerification />
                        <PANValidation />
                    </div>
                )}

                {activeTab === 'banking' && (
                    <div className="max-w-2xl">
                        <BankDetailsValidator />
                    </div>
                )}

                {activeTab === 'salary' && (
                    <SalaryStructureCalculator />
                )}

                {activeTab === 'statutory' && (
                    <div className="grid grid-cols-2 gap-6">
                        <StatutoryCalculator type="epf" />
                        <StatutoryCalculator type="esic" />
                        <StatutoryCalculator type="pt" />
                        <StatutoryCalculator type="gratuity" />
                    </div>
                )}
            </div>
        </div>
    );
}

// Statutory Calculator Component
function StatutoryCalculator({ type }) {
    const [input, setInput] = useState('');
    const [secondaryInput, setSecondaryInput] = useState('');
    const [result, setResult] = useState(null);

    const calculators = {
        epf: {
            title: 'EPF Calculator',
            icon: FileText,
            placeholder: 'Enter Basic Salary',
            calculate: (value) => {
                return indianComplianceService.calculateEPF(parseFloat(value));
            }
        },
        esic: {
            title: 'ESIC Calculator',
            icon: FileText,
            placeholder: 'Enter Gross Salary',
            calculate: (value) => {
                return indianComplianceService.calculateESIC(parseFloat(value));
            }
        },
        pt: {
            title: 'Professional Tax',
            icon: FileText,
            placeholder: 'Enter Monthly Salary',
            calculate: (value) => {
                return indianComplianceService.calculateProfessionalTax(parseFloat(value), 'Maharashtra');
            }
        },
        gratuity: {
            title: 'Gratuity Calculator',
            icon: FileText,
            placeholder: 'Last Drawn Salary',
            secondaryPlaceholder: 'Years of Service',
            calculate: (salary, years) => {
                return indianComplianceService.calculateGratuity(parseFloat(salary), parseFloat(years));
            }
        }
    };

    const config = calculators[type];
    const Icon = config.icon;

    const handleCalculate = () => {
        if (input) {
            const res = config.calculate(input, secondaryInput);
            setResult(res);
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{config.title}</h3>
            </div>

            <div className="space-y-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={config.placeholder}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />

                {config.secondaryPlaceholder && (
                    <input
                        type="number"
                        value={secondaryInput}
                        onChange={(e) => setSecondaryInput(e.target.value)}
                        placeholder={config.secondaryPlaceholder}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                )}

                <button
                    onClick={handleCalculate}
                    disabled={!input || (config.secondaryPlaceholder && !secondaryInput)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    Calculate
                </button>

                {result && (
                    <div className="p-4 bg-muted/30 rounded-lg space-y-2 text-sm">
                        {Object.entries(result).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-semibold">
                                    {typeof value === 'number' ? (key === 'years' ? value : `₹${value.toLocaleString()}`) : value.toString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
