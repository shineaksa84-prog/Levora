import React, { useState } from 'react';
import {
    Sparkles,
    BarChart3,
    Zap,
    Shield,
    Settings,
    Users,
    Briefcase,
    DollarSign,
    Search,
    Heart,
    Brain,
    Fingerprint,
    Target,
    Compass,
    Activity,
    Lock,
    Globe,
    Database,
    Repeat,
    Cpu,
    Filter,
    FileSignature,
    Rocket,
    Share2,
    VenetianMask,
    Layout,
    Stethoscope,
    Trophy,
    Calendar,
    Navigation,
    CreditCard,
    Plane,
    Eye,
    FolderOpen,
    Palette,
    Mail,
    Edit3,
    Bell,
    Key,
    Languages,
    Bot,
    Wrench,
    LineChart,
    MessageCircle,
    UserMinus,
    Layers,
    Clock,
    UserCheck,
    Truck,
    CheckSquare
} from 'lucide-react';
import FeatureCard from '../components/admin/FeatureCard';
import { motion } from 'framer-motion';

const CATEGORIES = [
    "Strategic Intelligence",
    "Operational Control",
    "Talent Lifecycle",
    "Employee Experience",
    "System Customization"
];

// Helper to fix missing icons
const Laptop = () => <div className="w-5 h-5 border-2 border-current rounded-sm flex items-center justify-center text-[8px] font-bold italic">PC</div>;

const FEATURES = [
    // 1. Strategic Intelligence
    { id: 1, category: "Strategic Intelligence", title: "Predictive Vectoring", description: "Forecasting future talent trajectory based on historical growth and emerging market signals.", icon: LineChart, status: "active" },
    { id: 2, category: "Strategic Intelligence", title: "Empathy Analytics", description: "Deciphering the emotional pulse and morale of the organization across all vectors.", icon: Heart, status: "active" },
    { id: 3, category: "Strategic Intelligence", title: "Competency Blueprinting", description: "High-resolution organizational mapping to identify and resolve critical skill voids.", icon: Target, status: "active" },
    { id: 4, category: "Strategic Intelligence", title: "Retentive Equilibrium", description: "AI-stabilization of workforce continuity by identifying and mitigating flight risks.", icon: UserMinus, status: "active" },
    { id: 5, category: "Strategic Intelligence", title: "Equity Sentinel", description: "Unbiased, automated auditing of universal diversity and inclusion metrics.", icon: Eye, status: "active" },
    { id: 6, category: "Strategic Intelligence", title: "Sovereign Scout", description: "Autonomous AI-sourcing for securing elite, high-impact talent.", icon: Search, status: "active" },
    { id: 7, category: "Strategic Intelligence", title: "Market Resonance", description: "Real-time global compensation benchmarking for fiscal alignment.", icon: DollarSign, status: "active" },
    { id: 8, category: "Strategic Intelligence", title: "Interview Oracle", description: "Context-aware AI synthesis for high-fidelity talent assessment protocols.", icon: MessageCircle, status: "beta" },
    { id: 9, category: "Strategic Intelligence", title: "Output Velocity", description: "Granular monitoring of organizational productivity and operational momentum.", icon: Activity, status: "active" },
    { id: 10, category: "Strategic Intelligence", title: "Legacy Architect", description: "Strategically identifying and grooming the future stewards of the enterprise.", icon: Compass, status: "active" },

    // 2. Operational Control
    { id: 11, category: "Operational Control", title: "Workflow Orchestrator", description: "Visual canvas for constructing sophisticated HR automation pathways.", icon: Layers, status: "active" },
    { id: 12, category: "Operational Control", title: "Command Tower", description: "High-level oversight for all requisition and capital allocation approvals.", icon: CheckSquare, status: "active" },
    { id: 13, category: "Operational Control", title: "Fiscal Vault", description: "Precision tracking of human capital investment and operational expenditure.", icon: CreditCard, status: "active" },
    { id: 14, category: "Operational Control", title: "Regulatory Fortress", description: "Unassailable automated auditing of global legal and operational standards.", icon: Shield, status: "active" },
    { id: 15, category: "Operational Control", title: "Immutable Ledger", description: "Crytographically secure logs for every administrative maneuver.", icon: Fingerprint, status: "active" },
    { id: 16, category: "Operational Control", title: "Sovereign Perms", description: "Granular administrative control and multi-layered access protocols.", icon: Lock, status: "active" },
    { id: 17, category: "Operational Control", title: "Global Nexus", description: "Seamless orchestration of multi-national entities and subsidiaries.", icon: Globe, status: "active" },
    { id: 18, category: "Operational Control", title: "Integration Forge", description: "High-performance synchronization with the global SaaS ecosystem.", icon: Repeat, status: "active" },
    { id: 19, category: "Operational Control", title: "Core Migrator", description: "Enterprise-strength data synthesis and porting utilities.", icon: Database, status: "active" },
    { id: 20, category: "Operational Control", title: "Security Bastion", description: "Enforcement of global security policies and biometric-grade access.", icon: Key, status: "active" },

    // 3. Talent Lifecycle
    { id: 21, category: "Talent Lifecycle", title: "Funnel Optimization", description: "Deep conversion analytics across the entire talent acquisition spectrum.", icon: Filter, status: "active" },
    { id: 22, category: "Talent Lifecycle", title: "Covenant Forge", description: "Automated contract synthesis and immutable e-signature execution.", icon: FileSignature, status: "active" },
    { id: 23, category: "Talent Lifecycle", title: "Onboarding Odyssey", description: "Immersive, high-performance integration pathways for elite new talent.", icon: Rocket, status: "active" },
    { id: 24, category: "Talent Lifecycle", title: "Echo Network", description: "Strategically incentivized internal referral dynamics.", icon: Share2, status: "active" },
    { id: 25, category: "Talent Lifecycle", title: "Agent Interface", description: "Sovereign management of external talent partners and agencies.", icon: VenetianMask, status: "active" },
    { id: 26, category: "Talent Lifecycle", title: "Broadcast Hub", description: "Omnichannel synchronization to global talent marketplaces.", icon: Briefcase, status: "active" },
    { id: 27, category: "Talent Lifecycle", title: "Cultural Resonance", description: "Continuous micro-synthesis of real-time organizational engagement.", icon: Brain, status: "active" },
    { id: 28, category: "Talent Lifecycle", title: "360 Equilibrium", description: "Precision-orchestrated feedback cycles for professional evolution.", icon: Zap, status: "active" },
    { id: 29, category: "Talent Lifecycle", title: "Knowledge Beacon", description: "Intelligence dashboard for organizational learning and skill mastery.", icon: Sparkles, status: "active" },
    { id: 30, category: "Talent Lifecycle", title: "Offboarding Protocol", description: "Automated transitional procedures and critical knowledge preservation.", icon: Truck, status: "active" },

    // 4. Employee Experience
    { id: 31, category: "Employee Experience", title: "Org Topology", description: "Interactive, multi-dimensional visualization of organizational structure.", icon: Layout, status: "active" },
    { id: 32, category: "Employee Experience", title: "Inventory Axis", description: "Universal tracking of physical and digital enterprise assets.", icon: Laptop, status: "active" },
    { id: 33, category: "Employee Experience", title: "Wellness Compass", description: "Advanced synthesis of workforce mental health and vitality metrics.", icon: Stethoscope, status: "active" },
    { id: 34, category: "Employee Experience", title: "Laurel Wall", description: "Prestige platform for institutional peer-to-peer recognition.", icon: Trophy, status: "active" },
    { id: 35, category: "Employee Experience", title: "Absence Matrix", description: "Global synchronization of human capital availability and leave planning.", icon: Calendar, status: "active" },
    { id: 36, category: "Employee Experience", title: "Benefit Synthesis", description: "Unified portal for bespoke employee rewards and benefit frameworks.", icon: Navigation, status: "active" },
    { id: 37, category: "Employee Experience", title: "Reward Engine", description: "Total transparency into remuneration cycles, tax, and pay-runs.", icon: CreditCard, status: "active" },
    { id: 38, category: "Employee Experience", title: "Expedition Manager", description: "High-level orchestration of corporate travel and fiscal logistics.", icon: Plane, status: "active" },
    { id: 39, category: "Employee Experience", title: "Guest Access", description: "Security-first monitoring of physical office intersections.", icon: UserCheck, status: "active" },
    { id: 40, category: "Employee Experience", title: "Archive Core", description: "Version-controlled nerve center for organizational policy and vision.", icon: FolderOpen, status: "active" },

    // 5. System Customization
    { id: 41, category: "System Customization", title: "BrandStudio", description: "White-label UI customization and theme management.", icon: Palette, status: "active" },
    { id: 42, category: "System Customization", title: "EmailForge", description: "Drag-and-drop HTML email template builder.", icon: Mail, status: "active" },
    { id: 43, category: "System Customization", title: "FieldLab", description: "Custom field definitions for all system entities.", icon: Edit3, status: "active" },
    { id: 44, category: "System Customization", title: "NotificationPulse", description: "Global alert and notification frequency settings.", icon: Bell, status: "active" },
    { id: 45, category: "System Customization", title: "APIDeck", description: "Manage developer tokens and webhook endpoints.", icon: Cpu, status: "active" },
    { id: 46, category: "System Customization", title: "LanguageManager", description: "Multi-lingual localization and translation tools.", icon: Languages, status: "active" },
    { id: 47, category: "System Customization", title: "BotManager", description: "AI chatbot personality and behavior customization.", icon: Bot, status: "active" },
    { id: 48, category: "System Customization", title: "MaintenanceMode", description: "Scheduled updates and system-wide broadcast tools.", icon: Wrench, status: "active" },
    { id: 49, category: "System Customization", title: "MetricMaster", description: "Define custom KPIs and reporting formulas.", icon: BarChart3, status: "active" },
    { id: 50, category: "System Customization", title: "FeedbackVault", description: "Stakeholder feature requests and internal feedback hub.", icon: MessageCircle, status: "active" },
];


export default function AdminToolkit() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredFeatures = selectedCategory === "All"
        ? FEATURES
        : FEATURES.filter(f => f.category === selectedCategory);

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-white border border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <Wrench className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/80">Control Suite</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                        Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary italic">Toolkit</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed">
                        A high-fidelity orchestration layer for managing every critical facet of your enterprise talent architecture. Precision tools for leading-edge organizational design.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl w-fit border border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === "All"
                        ? "bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                        : "text-slate-500 hover:text-slate-900"
                        }`}
                >
                    All Features
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                            ? "bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                            : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Features Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {filteredFeatures.map((feature) => (
                    <FeatureCard
                        key={feature.id}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        category={feature.category}
                        status={feature.status}
                    />
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredFeatures.length === 0 && (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">No features found in this category.</p>
                </div>
            )}
        </div>
    );
}
