import { useState } from 'react';
import { Building2, Star, TrendingUp, DollarSign, Plus, MoreHorizontal, Phone, Mail } from 'lucide-react';

const VENDORS = [
    { id: 1, name: 'TechHunters Inc.', type: 'Agency', candidates: 12, hires: 4, successRate: '33%', avgCost: '$12,500', rating: 4.8, status: 'Active' },
    { id: 2, name: 'Global Staffing Solutions', type: 'Agency', candidates: 28, hires: 2, successRate: '7%', avgCost: '$9,200', rating: 3.2, status: 'Probation' },
    { id: 3, name: 'Design Recruits', type: 'Boutique', candidates: 5, hires: 1, successRate: '20%', avgCost: '$15,000', rating: 4.5, status: 'Active' },
    { id: 4, name: 'DevOps Experts', type: 'Contract', candidates: 8, hires: 3, successRate: '37%', avgCost: '$18,000', rating: 4.9, status: 'Active' },
];

export default function VendorManager() {
    const [vendors, setVendors] = useState(VENDORS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    Vendor Management
                </h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Vendor
                </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Vendors</p>
                            <h3 className="text-2xl font-bold mt-1">4</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Building2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Avg Success Rate</p>
                            <h3 className="text-2xl font-bold mt-1 text-green-600">24.2%</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Avg Cost / Hire</p>
                            <h3 className="text-2xl font-bold mt-1">$13,675</h3>
                        </div>
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Vendor List */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Vendor Name</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold text-center">Performance</th>
                                <th className="px-6 py-4 font-semibold text-center">Avg Cost</th>
                                <th className="px-6 py-4 font-semibold text-center">Rating</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {vendors.map((vendor) => (
                                <tr key={vendor.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {vendor.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            {vendor.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{vendor.type}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-gray-900">{vendor.successRate}</span>
                                            <span className="text-xs text-muted-foreground">{vendor.hires} hires / {vendor.candidates} sub</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center tabular-nums">{vendor.avgCost}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold">
                                            {vendor.rating} <Star className="w-3 h-3 fill-current" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${vendor.status === 'Active'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
