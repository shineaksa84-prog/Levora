import { useState } from 'react';
import {
    Users, Briefcase, DollarSign, TrendingUp,
    Activity, AlertTriangle, CheckCircle, Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock Data
const SYSTEM_HEALTH = [
    { engine: 'Recruitment', status: 'Healthy', active_users: 12, alerts: 2 },
    { engine: 'Payroll', status: 'Attention', active_users: 3, alerts: 1 },
    { engine: 'HR Ops', status: 'Healthy', active_users: 5, alerts: 0 },
    { engine: 'Performance', status: 'Healthy', active_users: 48, alerts: 5 },
];

const PAYROLL_TREND = [
    { month: 'Aug', cost: 1.2 },
    { month: 'Sep', cost: 1.25 },
    { month: 'Oct', cost: 1.3 },
    { month: 'Nov', cost: 1.42 },
];

const RECRUITMENT_FUNNEL = [
    { stage: 'Applied', count: 145 },
    { stage: 'Screened', count: 89 },
    { stage: 'Interview', count: 34 },
    { stage: 'Offer', count: 12 },
    { stage: 'Hired', count: 8 },
];

import { useState, useEffect } from 'react';
import {
    Users, Building, Globe, Shield,
    Activity, Server, Database, AlertCircle,
    TrendingUp, ExternalLink, Plus, Cpu,
    Lock, Key, Zap, Settings, Eye, Search
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell
} from 'recharts';
import TenantService from '../../lib/services/tenantService';
import useStore from '../../store/useStore';

const TABS = [
    { id: 'overview', name: 'Ecosystem Overview', icon: Globe },
    { id: 'engines', name: 'Neural Engines', icon: Cpu },
    { id: 'audit', name: 'Security Vault', icon: Lock },
    { id: 'config', name: 'Global Config', icon: Settings },
];

const AI_USAGE = [
    { name: 'Gemini Pro 1.5', requests: 4500, cost: 12.50 },
    { name: 'Vision Processing', requests: 1200, cost: 8.20 },
    { name: 'Embedding Models', requests: 8900, cost: 0.45 },
];

const SECURITY_EVENTS = [
    { user: 'admin@acme.com', event: 'MFA Failure', ip: '192.168.1.1', status: 'Blocked', time: '2m ago' },
    { user: 'hr@legacy.co', event: 'Bulk Export', ip: '45.12.98.2', status: 'Logged', time: '45m ago' },
    { user: 'system_root', event: 'Key Rotation', ip: 'Internal', status: 'Success', time: '1h ago' },
];

export default function SuperAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await TenantService.getTenants();
                setTenants(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-2 bg-primary/5 px-2 py-1 rounded w-fit">
                        <Shield className="w-3 h-3" /> Root Authorization: Level 7 Active
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-white">COMMAND CENTER</h1>
                    <p className="text-muted-foreground mt-2 font-medium max-w-xl">Global ecosystem oversight, autonomous onboarding, and neural engine throttling.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20">
                        <Plus className="w-4 h-4" /> Deploy Production Tenant
                    </button>
                </div>
            </div>

            {/* Global Tabs */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'text-muted-foreground hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.name}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Total Tenants', value: '12', icon: Building, trend: '+2' },
                            { name: 'Unified Workforce', value: '1,452', icon: Users, trend: '+142' },
                            { name: 'System Load', value: '24%', icon: Activity, trend: 'Stable' },
                            { name: 'API Latency', value: '88ms', icon: zap, trend: '-12ms' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <stat.icon size={80} />
                                </div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.name}</p>
                                <h3 className="text-4xl font-black text-white mt-1">{stat.value}</h3>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500">
                                    <TrendingUp className="w-3 h-3" /> {stat.trend} Global Shift
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Traffic Map Preview */}
                        <div className="lg:col-span-2 glass-card p-8 border border-white/5">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-amber-500" /> Neural Pipeline Throughput
                                </h3>
                                <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-1 text-primary"><div className="w-2 h-2 rounded-full bg-primary" /> PRODUCTION</span>
                                    <span className="flex items-center gap-1 text-muted-foreground/50"><div className="w-2 h-2 rounded-full bg-muted-foreground/50" /> SANDBOX</span>
                                </div>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { time: '00:00', prod: 400, sand: 100 },
                                        { time: '04:00', prod: 300, sand: 80 },
                                        { time: '08:00', prod: 1200, sand: 400 },
                                        { time: '12:00', prod: 1800, sand: 600 },
                                        { time: '16:00', prod: 1400, sand: 500 },
                                        { time: '20:00', prod: 900, sand: 300 },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="prod" stroke="#4f46e5" strokeWidth={4} fill="url(#colorProd)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Onboarding */}
                        <div className="glass-card p-8 border border-white/5">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-6">Recent Deployments</h3>
                            <div className="space-y-4">
                                {tenants.slice(0, 4).map((tenant, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-primary text-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            {tenant.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-white truncate">{tenant.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold">CID: #{tenant.id}</p>
                                        </div>
                                        <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-3 border border-white/5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors">
                                View Unified Directory
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'engines' && (activeTab === 'engines' && (
                <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="glass-card p-8 border border-white/5">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-violet-500" /> AI Engine Consumption
                        </h3>
                        <div className="space-y-6">
                            {AI_USAGE.map((engine, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm font-black text-white">
                                        <span>{engine.name}</span>
                                        <span className="text-primary">${engine.cost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-widest">
                                        <span>{engine.requests} Requests</span>
                                        <span>Quota: 85%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-violet-600"
                                            style={{ width: `${(engine.requests / 10000) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8 border border-white/5">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8">Token Distribution</h3>
                        <div className="h-64 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={AI_USAGE}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="requests"
                                    >
                                        <Cell fill="#4f46e5" />
                                        <Cell fill="#8b5cf6" />
                                        <Cell fill="#e19578" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ))}

            {activeTab === 'audit' && (
                <div className="glass-card border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            <Lock className="w-5 h-5 text-red-500" /> Global Security Logs
                        </h3>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Filter system events..."
                                    className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:ring-1 ring-primary"
                                />
                            </div>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-black text-xs hover:bg-red-600 transition-colors uppercase tracking-widest">
                                Rotate Master Keys
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                                    <th className="p-6">Origin User</th>
                                    <th className="p-6">Security Event</th>
                                    <th className="p-6">Metadata (IP)</th>
                                    <th className="p-6">Protocol Status</th>
                                    <th className="p-6 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SECURITY_EVENTS.map((event, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 font-black text-white text-sm">{event.user}</td>
                                        <td className="p-6">
                                            <span className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                                <Key className="w-3 h-3 text-primary" /> {event.event}
                                            </span>
                                        </td>
                                        <td className="p-6 font-mono text-[10px] text-muted-foreground">{event.ip}</td>
                                        <td className="p-6">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${event.status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right text-[10px] font-bold text-muted-foreground uppercase">{event.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'config' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {[
                        { title: 'Maintenance Mode', desc: 'Throttle all neural pipelines to read-only mode for site updates.', icon: AlertCircle, color: 'text-amber-500' },
                        { title: 'Gemini Rate Limiting', desc: 'Enforce global token quotas to prevent financial leakage.', icon: Cpu, color: 'text-violet-500' },
                        { title: 'Audit Retention', desc: 'Standard set to 90 days. Critical for ISO-27001 compliance.', icon: Database, color: 'text-primary' },
                    ].map((config, i) => (
                        <div key={i} className="glass-card p-8 border border-white/5 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6 ${config.color}`}>
                                <config.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">{config.title}</h3>
                            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{config.desc}</p>
                            <button className="mt-auto w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                                Adjust Protocol
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

