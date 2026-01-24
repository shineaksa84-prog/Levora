import { useState } from 'react';
import { FileText, Ticket, Calculator, DollarSign } from 'lucide-react';
import DocumentVault from '../features/ess/DocumentVault';
import RequestCenter from '../features/ess/RequestCenter';
import PayTaxSimulator from '../features/ess/PayTaxSimulator';
import SalaryExplainer from '../features/ess/SalaryExplainer';
import TravelDesk from '../features/travel/TravelDesk';
import RoomScheduler from '../features/facilities/RoomScheduler';
import Resignation from '../features/offboarding/Resignation';

export default function EmployeeSelfService() {
    const [activeTab, setActiveTab] = useState('documents');

    const tabs = [
        { id: 'documents', label: 'My Documents', icon: FileText },
        { id: 'requests', label: 'Request Center', icon: Ticket },
        { id: 'tax', label: 'Tax Planning', icon: Calculator },
        { id: 'salary', label: 'Salary Info', icon: DollarSign },
        { id: 'travel', label: 'Travel Desk', icon: FileText },
        { id: 'rooms', label: 'Book Room', icon: Ticket },
        { id: 'resignation', label: 'Resignation', icon: FileText }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Employee Self-Service</h1>
                    <p className="text-muted-foreground mt-1 font-medium">Access your documents, submit requests, and manage your information</p>
                </div>
            </div>

            {/* Cyber Tabs */}
            <div className="glass-card p-2 flex gap-2 w-full md:w-fit flex-wrap">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`cyber-tab ${activeTab === tab.id
                                ? 'cyber-tab-active'
                                : 'cyber-tab-inactive'
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
                {activeTab === 'travel' && <TravelDesk />}
                {activeTab === 'rooms' && <RoomScheduler />}
                {activeTab === 'resignation' && <Resignation />}
            </div>
        </div>
    );
}
