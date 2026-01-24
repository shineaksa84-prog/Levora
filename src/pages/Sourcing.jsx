import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Globe, Linkedin, Users, TrendingUp, Filter, Plus, MoreHorizontal, ArrowUpRight, Mail, Zap, LayoutGrid, Briefcase } from 'lucide-react';
import OutreachCampaigns from '../features/sourcing/OutreachCampaigns';
import TalentMarketplace from '../features/sourcing/TalentMarketplace';
import InternalSourcing from '../features/sourcing/InternalSourcing';
import SourcingCommand from '../features/sourcing/SourcingCommand';
import { toast } from '../lib/services/toastService';

export default function Sourcing() {
    const [activeTab, setActiveTab] = useState('campaigns');
    const [commandQuery, setCommandQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.context === 'succession' && location.state?.role) {
            setActiveTab('marketplace');
            // Small delay to ensure toast shows after navigation
            setTimeout(() => {
                toast.success(`Succession Protocol Active: Scouting for ${location.state.role}`);
            }, 500);
        }
    }, [location]);

    const handleCommand = (action, query) => {
        setActiveTab(action);
        setCommandQuery(query);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-12 text-white border border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <Globe className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/80">Global Acquisition</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter leading-none mb-4">
                        Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary italic">Sourcing</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                        Identify, engage, and acquire elite human capital through AI-driven outreach vectors and global talent marketplaces.
                    </p>
                </div>
            </div>

            {/* AI Strategic Command Bar */}
            <div className="py-4">
                <SourcingCommand onCommand={handleCommand} />
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl w-fit mx-auto">
                <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'campaigns'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        }`}
                >
                    <Mail className="w-4 h-4" />
                    Active Campaigns
                </button>
                <div className="w-px h-4 bg-border/50" />
                <button
                    onClick={() => setActiveTab('marketplace')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'marketplace'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        }`}
                >
                    <Globe className="w-4 h-4" />
                    Talent Marketplace
                </button>
                <div className="w-px h-4 bg-border/50" />
                <button
                    onClick={() => setActiveTab('internal')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'internal'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    Internal Mobility
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'campaigns' && <OutreachCampaigns />}
                {activeTab === 'marketplace' && <TalentMarketplace />}
                {activeTab === 'internal' && <InternalSourcing />}
            </div>
        </div>
    );
}
