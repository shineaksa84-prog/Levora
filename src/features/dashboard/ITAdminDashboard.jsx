import { useState } from 'react';
import {
    LayoutDashboard, Ticket, Server, Shield,
    Wifi, HardDrive, AlertTriangle, Activity
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../../components/ui/BentoGrid';

export default function ITAdminDashboard() {
    const [view, setView] = useState('overview');

    const renderOverview = () => (
        <BentoGrid>
            {/* System Health */}
            <BentoGridItem
                title="System Status"
                description="All Systems Operational"
                header={
                    <div className="flex flex-col items-center justify-center h-full bg-emerald-50 rounded-xl border border-emerald-100 p-4">
                        <Activity className="w-10 h-10 text-emerald-500 mb-2 animate-pulse" />
                        <h3 className="text-xl font-bold text-emerald-700">99.9% Uptime</h3>
                        <p className="text-xs text-emerald-600">Last incident: 45d ago</p>
                    </div>
                }
                icon={<Server className="h-4 w-4 text-emerald-500" />}
            />

            {/* Active Tickets */}
            <BentoGridItem
                title="Support Tickets"
                description="8 Active / 2 Critical"
                header={
                    <div className="flex flex-col items-center justify-center h-full bg-blue-50 rounded-xl border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-blue-700">8</span>
                            <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">Open</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-200">2 Critical</span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">3 High</span>
                        </div>
                    </div>
                }
                icon={<Ticket className="h-4 w-4 text-blue-500" />}
            />

            {/* Asset Inventory */}
            <BentoGridItem
                title="Asset Inventory"
                description="Device Health"
                header={
                    <div className="grid grid-cols-2 gap-2 h-full content-center p-2">
                        <div className="bg-white p-2 rounded-lg border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-gray-800">142</p>
                            <p className="text-[10px] text-gray-400">Laptops</p>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-gray-800">12</p>
                            <p className="text-[10px] text-gray-400">Servers</p>
                        </div>
                    </div>
                }
                icon={<HardDrive className="h-4 w-4 text-gray-500" />}
            />

            {/* Security Alerts - Wide */}
            <BentoGridItem
                title="Security Monitor"
                description="Recent Events"
                colSpan={2}
                header={
                    <div className="space-y-3 h-full overflow-y-auto pr-2">
                        <div className="p-3 bg-white/50 rounded-xl border border-gray-200 flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-800">Automated Patching Completed</h4>
                                <p className="text-xs text-gray-500">Security patch KB4023 deployed to 135 endpoints successfully.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-yellow-50/50 rounded-xl border border-yellow-100 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-800">Unusual Login Attempt</h4>
                                <p className="text-xs text-gray-500">Multiple failed logins from IP 192.168.1.55 (Dev Server).</p>
                            </div>
                        </div>
                    </div>
                }
                icon={<Shield className="h-4 w-4 text-purple-500" />}
            />
        </BentoGrid>
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <Server className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Infrastructure Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        IT <span className="text-primary italic">Command</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Monitor system integrity, manage digital assets, and ensure enterprise security.
                    </p>
                </div>
                <div>
                    <button className="bg-primary text-white px-8 py-4 rounded-2xl text-xs font-black shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        <Ticket className="w-5 h-5" /> Create Ticket
                    </button>
                </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex bg-muted/50 p-1.5 rounded-[2rem] border border-border/50 w-full overflow-x-auto no-scrollbar">
                {[
                    { id: 'overview', label: 'Dashboard' },
                    { id: 'assets', label: 'Assets' },
                    { id: 'tickets', label: 'Helpdesk' },
                    { id: 'network', label: 'Network' },
                    { id: 'security', label: 'Security' },
                    { id: 'access', label: 'Access Control' },
                    { id: 'logs', label: 'System Logs' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${view === tab.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {view === 'overview' && renderOverview()}
            {view !== 'overview' && (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-muted/20 rounded-3xl border border-dashed border-border/50">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <Server className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold">Module Under Construction</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2">
                        The {view} interface is currently being compiled by the engineering team.
                    </p>
                </div>
            )}
        </div>
    );
}
