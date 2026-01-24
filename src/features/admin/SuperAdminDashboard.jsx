import { useState, useEffect } from 'react';
import {
    Users, Building, Globe, Shield,
    Activity, Server, Database, AlertCircle,
    TrendingUp, ExternalLink, Plus, Cpu,
    Lock, Key, Zap, Settings, Eye, Search,
    MessageSquare, Send, BarChart3, PieChart as PieIcon,
    Terminal, Fingerprint, Box, CreditCard,
    Briefcase, LifeBuoy, Globe2, Layers,
    HardDrive, RefreshCcw, Wifi, CloudRain,
    DollarSign, Percent, Calculator, FileText,
    UserCheck, UserX, ShieldCheck, Github,
    Trello, Figma, Mail, Slack, Smartphone
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import TenantService from '../../lib/services/tenantService';
import useStore from '../../store/useStore';
import NuclearVaultAuth from './NuclearVaultAuth';

const SPHERES = [
    { id: 'intelligence', name: 'Intelligence Sphere', icon: Cpu, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { id: 'infrastructure', name: 'Infrastructure Sphere', icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'security', name: 'Security Sphere', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'financial', name: 'Financial Sphere', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'workspace', name: 'Workspace Sphere', icon: Box, color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

export default function SuperAdminDashboard() {
    const [activeSphere, setActiveSphere] = useState('intelligence');
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

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

    if (!isAuthorized) {
        return <NuclearVaultAuth onAuthSuccess={() => setIsAuthorized(true)} />;
    }

    return (
        <div className="space-y-8 pb-32">
            {/* Ultra-Header */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card p-10 border-white/5 flex justify-between items-end backdrop-blur-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12">
                        <Terminal size={400} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-primary font-black text-[12px] uppercase tracking-[0.4em] mb-4 bg-primary/10 px-4 py-1.5 rounded-full w-fit border border-primary/20 shadow-2xl shadow-primary/10">
                            <Shield className="w-4 h-4" /> Root Authorization: Level 10 Omniscience
                        </div>
                        <h1 className="text-7xl font-black tracking-tighter text-white leading-none">
                            COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">CENTER</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mt-4 font-medium max-w-2xl leading-relaxed">
                            Welcome, System Owner. You are currently orchestrating the entire Levora ecosystem. 50+ Real-time neural protocols active.
                        </p>
                    </div>
                    <div className="flex gap-4 relative z-10">
                        <div className="glass-card px-6 py-3 border-white/5 flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Master Key Status</p>
                                <p className="text-sm font-black text-emerald-500">ROTATED 2H AGO</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Key className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Orbit */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/5 rounded-[2rem] w-fit">
                {SPHERES.map(sphere => (
                    <button
                        key={sphere.id}
                        onClick={() => setActiveSphere(sphere.id)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-500 ${activeSphere === sphere.id
                            ? 'bg-white text-black shadow-2xl shadow-white/20 scale-105'
                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <sphere.icon className={`w-5 h-5 ${activeSphere === sphere.id ? 'text-black' : sphere.color}`} />
                        {sphere.name}
                    </button>
                ))}
            </div>

            {/* SPHERE CONTENT: INTELLIGENCE */}
            {activeSphere === 'intelligence' && (
                <div className="grid lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Sentiment Analysis */}
                    <div className="lg:col-span-2 glass-card p-8 border-white/5">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                                    <Globe2 className="w-6 h-6 text-primary" /> Global Sentiment Pulse
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 font-bold">Aggregate Mood of 1,452 Neural Units</p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-black text-primary tracking-tighter">78.4%</span>
                                <p className="text-[10px] text-emerald-500 font-bold tracking-widest">+12% GROWTH</p>
                            </div>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    { t: 'Mon', v: 45, d: 20 }, { t: 'Tue', v: 52, d: 25 },
                                    { t: 'Wed', v: 48, d: 22 }, { t: 'Thu', v: 70, d: 45 },
                                    { t: 'Fri', v: 65, d: 40 }, { t: 'Sat', v: 78, d: 55 }
                                ]}>
                                    <defs>
                                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="v" stroke="#4f46e5" strokeWidth={6} fill="url(#colorPulse)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AI Model Swap Hub */}
                    <div className="glass-card p-8 border-white/5 space-y-6">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-violet-500" /> Neural Engine Swap
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Gemini Pro 1.5', active: true, desc: 'Maximum Intelligence' },
                                { name: 'Gemini Flash 1.0', active: false, desc: 'Instant Response' },
                                { name: 'Claude-3.5-Sonnet', active: false, desc: 'Human-like Logic' },
                            ].map((model, i) => (
                                <button key={i} className={`w-full p-4 rounded-2xl border transition-all text-left group ${model.active ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:bg-white/10'
                                    }`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-black text-white">{model.name}</p>
                                        {model.active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black">{model.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Attrition Risk Monitor */}
                    <div className="glass-card p-8 border-white/5">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-6">Attrition Core Risk</h3>
                        <div className="space-y-6">
                            {[
                                { node: 'Engineering', risk: 12, trend: 'down' },
                                { node: 'Operations', risk: 45, trend: 'up' },
                                { node: 'Sales Tier 1', risk: 28, trend: 'stable' },
                            ].map((node, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black text-white">
                                        <span>{node.node}</span>
                                        <span className={node.risk > 40 ? 'text-red-500' : 'text-emerald-500'}>{node.risk}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${node.risk > 40 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${node.risk}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SPHERE CONTENT: INFRASTRUCTURE */}
            {activeSphere === 'infrastructure' && (
                <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="lg:col-span-2 glass-card border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-blue-500" /> Database Live Stream
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white hover:bg-white/20">FLUSH CACHE</button>
                                <button className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-black shadow-lg">SNAPSHOT</button>
                            </div>
                        </div>
                        <div className="p-6 font-mono text-xs space-y-2 overflow-y-auto h-80 bg-black/40">
                            <div className="text-blue-400">[QUERY] SELECT * FROM employees WHERE tenantId = "cid_TS_492013"</div>
                            <div className="text-emerald-400">[SUCCESS] Result: 142 records found (12ms)</div>
                            <div className="text-pink-400">[CACHE] Cache write to Redis: "tenant_492013_full"</div>
                            <div className="text-amber-400">[WARNING] Firestore usage spike: 8.2k reads/sec</div>
                            <div className="text-blue-400">[QUERY] UPDATE job_status SET status = "CLOSED" WHERE jobId = "782"</div>
                            <div className="text-emerald-400">[SUCCESS] Atomic update complete (8ms)</div>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-white/5 space-y-8">
                        <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
                                <Wifi className="w-5 h-5 text-blue-500" /> Latency Heatmap
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { region: 'US-EAST', ping: 42, load: 24 },
                                    { region: 'EU-WEST', ping: 88, load: 45 },
                                    { region: 'AP-SOUTH', ping: 120, load: 88 },
                                ].map((reg, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                                        <div>
                                            <p className="text-sm font-black text-white">{reg.region}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">{reg.ping}ms Lateny</p>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${reg.load > 80 ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-all">
                            ORCHESTRATE FALLOVER
                        </button>
                    </div>
                </div>
            )}

            {/* SPHERE CONTENT: SECURITY */}
            {activeSphere === 'security' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Threat Score', value: 'Low', color: 'text-emerald-500' },
                            { name: 'Blocked IPs', value: '1,242', color: 'text-red-500' },
                            { name: 'Encryption', value: 'AES-256', color: 'text-primary' },
                            { name: 'Root Checks', value: 'Passed', color: 'text-emerald-500' },
                        ].map((s, i) => (
                            <div key={i} className="glass-card p-6 border-white/5 text-center">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{s.name}</p>
                                <h4 className={`text-2xl font-black ${s.color} tracking-tighter uppercase`}>{s.value}</h4>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter">Security Forensics (Ghost Mode)</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Trace IP or Email..." className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                    <tr>
                                        <th className="p-6">Neural Identity</th>
                                        <th className="p-6">Protocol Action</th>
                                        <th className="p-6">Source Signature (IP)</th>
                                        <th className="p-6">GDPR Status</th>
                                        <th className="p-6 text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { user: 'root_owner', action: 'MASTER_KEY_ROTATION', ip: '127.0.0.1', gdpr: 'COMPLIANT', time: '5m' },
                                        { user: 'anon_node', action: 'BRUTE_FORCE_BLOCK', ip: '45.1.2.98', gdpr: 'MASKED', time: '12m' },
                                        { user: 'hr_manager', action: 'BULK_DATA_EXPORT', ip: '192.168.1.1', gdpr: 'LOGGED', time: '45m' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="p-6 font-black text-white text-sm">{row.user}</td>
                                            <td className="p-6"><span className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-black uppercase">{row.action}</span></td>
                                            <td className="p-6 font-mono text-[10px] text-muted-foreground">{row.ip}</td>
                                            <td className="p-6 text-[10px] font-black text-emerald-500 uppercase">{row.gdpr}</td>
                                            <td className="p-6 text-right font-black text-white/40 text-[10px]">{row.time} AGO</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* SPHERE CONTENT: FINANCIAL */}
            {activeSphere === 'financial' && (
                <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="lg:col-span-2 glass-card p-10 border-white/5">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Global MRR Velocity</h3>
                                <p className="text-xs text-muted-foreground font-bold tracking-[0.2em] mt-2">TOTAL SUBSCRIPTION FLOW: $14.2M</p>
                            </div>
                            <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                                <RefreshCcw className="w-5 h-5 text-primary" />
                            </button>
                        </div>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { month: 'Jan', rev: 400, cost: 200 }, { month: 'Feb', rev: 500, cost: 210 },
                                    { month: 'Mar', rev: 700, cost: 240 }, { month: 'Apr', rev: 900, cost: 300 },
                                    { month: 'May', rev: 1200, cost: 450 }
                                ]}>
                                    <Bar dataKey="rev" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="cost" fill="rgba(255,255,255,0.05)" radius={[4, 4, 0, 0]} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#000', border: 'none', borderRadius: '12px' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                            <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mb-2">System Profitability</p>
                            <h4 className="text-4xl font-black text-white tracking-tighter">74.2%</h4>
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                                    <span>Cloud Hosting</span>
                                    <span className="text-white">$12k/mo</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                                    <span>AI Engine Costs</span>
                                    <span className="text-white">$8.4k/mo</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '45%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 border-white/5">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Subscription Distribution</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[
                                            { name: 'Enterprise', val: 40 }, { name: 'Pro', val: 35 }, { name: 'Starter', val: 25 }
                                        ]} innerRadius={50} outerRadius={70} paddingAngle={10} dataKey="val">
                                            <Cell fill="#4f46e5" />
                                            <Cell fill="#8b5cf6" />
                                            <Cell fill="#ec4899" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SPHERE CONTENT: WORKSPACE */}
            {activeSphere === 'workspace' && (
                <div className="grid lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="lg:col-span-3 glass-card border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                                <Layers className="w-5 h-5 text-pink-500" /> Organizational Node Registry
                            </h3>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all">
                                <Settings className="w-4 h-4" /> Global Policy Control
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                    <tr>
                                        <th className="p-6">Organization</th>
                                        <th className="p-6">Tier Pool</th>
                                        <th className="p-6">Neural Capacity (Seats)</th>
                                        <th className="p-6">White-Labeling</th>
                                        <th className="p-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tenants.map((t, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-6 font-black text-white text-sm">{t.name}</td>
                                            <td className="p-6"><span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black uppercase">{t.plan}</span></td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 max-w-[100px] h-1.5 bg-white/5 rounded-full">
                                                        <div className="h-full bg-pink-500" style={{ width: `${(t.users / 500) * 100}%` }} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-white/40">{t.users}/500</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-[10px] font-black text-emerald-500 uppercase">ACTIVE</td>
                                            <td className="p-6 text-right">
                                                <button className="p-2 hover:bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"><ExternalLink size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-8 border-white/5">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Global Deployment Quotas</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'CID Slots', val: 80 }, { label: 'EmplaID Pool', val: 12 }, { label: 'Storage (TB)', val: 65 }
                                ].map((q, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
                                            <span>{q.label}</span>
                                            <span className="text-white">{q.val}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-pink-500/50" style={{ width: `${q.val}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-8 border-red-500/20 bg-red-500/5 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                                <AlertCircle size={32} />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Termination Protocol</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium italic">CAUTION: System-level wipe of tenant data nodes. This action is irreversible.</p>
                            <button className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors">INITIATE WIPE</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
