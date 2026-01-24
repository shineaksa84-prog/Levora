import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Building, Award, Target, Wallet } from 'lucide-react';
import LifecycleDashboard from './LifecycleDashboard';
import OKRManager from '../performance/OKRManager';
import VariablePay from '../compensation/VariablePay';

export default function EmployeeProfile() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('performance');

    // Mock data
    const employee = {
        name: 'Jane Smith',
        role: 'Senior Engineer',
        department: 'Engineering',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        location: 'Remote',
        joinDate: 'Jan 15, 2023',
        manager: 'John Doe',
        id: 'EMP-2023-042'
    };

    const TABS = [
        { id: 'performance', label: 'Performance', icon: Target },
        { id: 'compensation', label: 'Compensation', icon: Wallet }
    ];

    const handleEditProfile = () => {
        alert('Universal Profile Editor protocol initiated.');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to="/employees" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Employees
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={handleEditProfile}
                        className="px-4 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    >
                        Edit Profile
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                        Actions
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Profile Card */}
                <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            JS
                        </div>
                        <h1 className="text-xl font-bold">{employee.name}</h1>
                        <p className="text-muted-foreground">{employee.role}</p>
                        <div className="mt-6 space-y-3 text-sm text-left">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Building className="w-4 h-4" />
                                <span>{employee.department}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{employee.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {employee.joinDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Award className="w-4 h-4" />
                                <span>ID: {employee.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                        <h3 className="font-semibold mb-4">Manager</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                                JD
                            </div>
                            <div>
                                <p className="font-medium">{employee.manager}</p>
                                <p className="text-xs text-muted-foreground">Engineering Director</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Lifecycle & Tabs */}
                <div className="lg:col-span-2 space-y-6">
                    <LifecycleDashboard />

                    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="flex border-b border-border bg-muted/20">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id
                                            ? 'text-primary bg-background'
                                            : 'text-muted-foreground hover:bg-muted/50'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="p-6">
                            {activeTab === 'performance' && <OKRManager />}
                            {activeTab === 'compensation' && <VariablePay />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
