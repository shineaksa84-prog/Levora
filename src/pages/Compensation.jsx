import { useState } from 'react';
import { DollarSign, Heart } from 'lucide-react';
import Payroll from '../features/compensation/Payroll';
import Benefits from '../features/compensation/Benefits';

export default function Compensation() {
    const [activeTab, setActiveTab] = useState('payroll');

    const tabs = [
        { id: 'payroll', label: 'Payroll & Salary', icon: DollarSign },
        { id: 'benefits', label: 'Benefits & Insurance', icon: Heart }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Compensation & Benefits</h1>
                    <p className="text-muted-foreground mt-1">Manage your salary, payslips, and benefits enrollment</p>
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
                {activeTab === 'payroll' && <Payroll />}
                {activeTab === 'benefits' && <Benefits />}
            </div>
        </div>
    );
}
