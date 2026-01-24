import { useState } from 'react';
import AadhaarVerification from '../features/compliance/AadhaarVerification';
import PANValidation from '../features/compliance/PANValidation';
import BankDetailsValidator from '../features/compliance/BankDetailsValidator';
import SalaryStructureCalculator from '../features/compliance/SalaryStructureCalculator';
import { indianComplianceService } from '../lib/services/indianCompliance';
import { toast } from '../lib/services/toastService';
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
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
                        Institutional <span className="text-primary italic">Compliance</span>
                    </h1>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">
                        Statutory Protocol Engine // Legislative Alignment v4.0
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-card p-1.5 rounded-[1.5rem] border border-border w-fit shadow-xl">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${isActive
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] relative">
                {activeTab === 'verification' && (
                    <div className="grid grid-cols-2 gap-10 animate-in slide-in-from-bottom-5 duration-500">
                        <AadhaarVerification />
                        <PANValidation />
                    </div>
                )}

                {activeTab === 'banking' && (
                    <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
                        <BankDetailsValidator onValidated={(data) => {
                            console.log('Bank details validated:', data);
                            toast.success(`Bank Infrastructure (${data.ifsc}) Applied to Global Profile.`);
                        }} />
                    </div>
                )}

                {activeTab === 'salary' && (
                    <div className="animate-in fade-in duration-500">
                        <SalaryStructureCalculator />
                    </div>
                )}

                {activeTab === 'statutory' && (
                    <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-right-10 duration-500">
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
            title: 'EPF Protocol',
            icon: Shield,
            placeholder: 'Enter Basic Salary',
            calculate: (value) => indianComplianceService.calculateEPF(parseFloat(value))
        },
        esic: {
            title: 'ESIC Protocol',
            icon: Calculator,
            placeholder: 'Enter Gross Salary',
            calculate: (value) => indianComplianceService.calculateESIC(parseFloat(value))
        },
        pt: {
            title: 'PT Protocol',
            icon: DollarSign,
            placeholder: 'Enter Monthly Salary',
            calculate: (value) => indianComplianceService.calculateProfessionalTax(parseFloat(value), 'Maharashtra')
        },
        gratuity: {
            title: 'Gratuity Model',
            icon: FileText,
            placeholder: 'Last Drawn Salary',
            secondaryPlaceholder: 'Years of Service',
            calculate: (salary, years) => indianComplianceService.calculateGratuity(parseFloat(salary), parseFloat(years))
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
        <div className="bg-card rounded-[2.5rem] border border-border p-8 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-black text-foreground tracking-tight uppercase tracking-widest">{config.title}</h3>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Primary Input (₹)</label>
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={config.placeholder}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black transition-all placeholder:text-muted-foreground/30"
                    />
                </div>

                {config.secondaryPlaceholder && (
                    <div className="space-y-2">
                        <label className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Duration Parameter</label>
                        <input
                            type="number"
                            value={secondaryInput}
                            onChange={(e) => setSecondaryInput(e.target.value)}
                            placeholder={config.secondaryPlaceholder}
                            className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black transition-all placeholder:text-muted-foreground/30"
                        />
                    </div>
                )}

                <button
                    onClick={handleCalculate}
                    disabled={!input || (config.secondaryPlaceholder && !secondaryInput)}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group"
                >
                    Compute Protocol
                </button>

                {result && (
                    <div className="mt-6 p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
                        {Object.entries(result).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center group">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="text-xs font-black text-foreground tracking-tight">
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
