import { useState } from 'react';
import { Search, Globe, Linkedin, Users, TrendingUp, Filter, Plus, MoreHorizontal, ArrowUpRight, Mail } from 'lucide-react';

export default function Sourcing() {
    const stats = [
        { label: 'Total Sourced', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Response Rate', value: '42%', change: '+5%', icon: Mail, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Active Campaigns', value: '8', change: '0', icon: Globe, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Pipeline Value', value: '$120k', change: '+18%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    const campaigns = [
        { id: 1, name: 'Senior React Developer', source: 'LinkedIn', candidates: 145, contacted: 82, replied: 35, status: 'Active' },
        { id: 2, name: 'Product Manager', source: 'Indeed', candidates: 89, contacted: 45, replied: 12, status: 'Active' },
        { id: 3, name: 'UX Designer', source: 'Dribbble', candidates: 56, contacted: 56, replied: 28, status: 'Completed' },
        { id: 4, name: 'DevOps Engineer', source: 'GitHub', candidates: 230, contacted: 110, replied: 45, status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sourcing</h1>
                    <p className="text-muted-foreground mt-1">Manage sourcing channels and candidate outreach campaigns.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Campaign
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg ${stat.bg}`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Campaigns */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold">Active Campaigns</h2>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-4">Campaign Name</th>
                            <th className="px-6 py-4">Source</th>
                            <th className="px-6 py-4">Candidates</th>
                            <th className="px-6 py-4">Contacted</th>
                            <th className="px-6 py-4">Replied</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-medium">{campaign.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {campaign.source === 'LinkedIn' ? <Linkedin className="w-4 h-4 text-blue-600" /> : <Globe className="w-4 h-4 text-muted-foreground" />}
                                        {campaign.source}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{campaign.candidates}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(campaign.contacted / campaign.candidates) * 100}%` }} />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{campaign.contacted}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(campaign.replied / campaign.contacted) * 100}%` }} />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{campaign.replied}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${campaign.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                                            'bg-gray-100 text-gray-700 border-gray-200'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
