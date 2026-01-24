import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, BarChart3, Users, Globe, Linkedin, ArrowUpRight } from 'lucide-react';
import { sourcingService } from '../../lib/services/sourcingService';
import { toast } from '../../lib/services/toastService';
import MagneticButton from '../../components/ui/MagneticButton';

export default function OutreachCampaigns() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        const data = await sourcingService.getCampaigns();
        setCampaigns([...data]);
    };

    const handleInitialize = async () => {
        const newCampaign = await sourcingService.createCampaign();
        setCampaigns([newCampaign, ...campaigns]);
        toast.success(`Campaign initialized for ${newCampaign.name} via ${newCampaign.platform}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                            <Send className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">This Month</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-foreground">1,248</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wide">Outreach Vectors Initiated</p>
                    </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Conversion</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-foreground">28.4%</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wide">Global Response Rate</p>
                    </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pipeline</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-foreground">142</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wide">Candidates Engaged</p>
                    </div>
                </div>
            </div>

            {/* Campaign Matrix */}
            <div className="glass-card overflow-hidden border border-border/50">
                <div className="p-8 border-b border-border bg-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Active Signal Channels</h3>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Real-time engagement telemetry</p>
                    </div>
                    <MagneticButton className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                        <button onClick={handleInitialize} className="flex items-center gap-2">
                            <Send className="w-3 h-3" />
                            Initialize Campaign
                        </button>
                    </MagneticButton>
                </div>

                <div className="divide-y divide-border/50">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="p-6 hover:bg-white/5 transition-all group animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl ${campaign.platform.includes('LinkedIn') ? 'bg-blue-500/10 text-blue-500' :
                                        campaign.platform.includes('GitHub') ? 'bg-slate-500/10 text-slate-500' :
                                            'bg-pink-500/10 text-pink-500'
                                        }`}>
                                        {campaign.platform.includes('LinkedIn') ? <Linkedin className="w-6 h-6" /> :
                                            campaign.platform.includes('GitHub') ? <Globe className="w-6 h-6" /> :
                                                <Globe className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{campaign.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{campaign.platform}</span>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider ${campaign.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-center">
                                        <div className="text-xs font-black text-foreground">{campaign.sent}</div>
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Sent</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs font-black text-foreground">{campaign.openRate}%</div>
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Open Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs font-black text-emerald-500">{campaign.responseRate}%</div>
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Replied</div>
                                    </div>

                                    <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar Visual */}
                            <div className="mt-4 h-1.5 w-full bg-border/30 rounded-full overflow-hidden flex">
                                <div className="h-full bg-primary" style={{ width: `${campaign.openRate}%` }}></div>
                                <div className="h-full bg-emerald-500" style={{ width: `${campaign.responseRate}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
