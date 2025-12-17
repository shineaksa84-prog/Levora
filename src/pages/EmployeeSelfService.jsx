import { useState } from 'react';
import { FileText, Ticket, Calculator, DollarSign } from 'lucide-react';
import DocumentVault from '../features/ess/DocumentVault';
import RequestCenter from '../features/ess/RequestCenter';
import PayTaxSimulator from '../features/ess/PayTaxSimulator';
import SalaryExplainer from '../features/ess/SalaryExplainer';

export default function EmployeeSelfService() {
    const [activeTab, setActiveTab] = useState('documents');

    const tabs = [
        { id: 'documents', label: 'My Documents', icon: FileText },
        { id: 'requests', label: 'Request Center', icon: Ticket },
        { id: 'tax', label: 'Tax Planning', icon: Calculator },
        { id: 'salary', label: 'Salary Info', icon: DollarSign }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Self-Service</h1>
                    <p className="text-muted-foreground mt-1">Access your documents, submit requests, and manage your information</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-card border border-border rounded-xl p-2 flex gap-2 w-full md:w-fit">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'gradient-primary text-white shadow-lg'
                                : 'text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'documents' && <DocumentVault />}
                {activeTab === 'requests' && <RequestCenter />}
                {activeTab === 'tax' && <PayTaxSimulator />}
                {activeTab === 'salary' && <SalaryExplainer />}
            </div>
        </div>
    );
}
