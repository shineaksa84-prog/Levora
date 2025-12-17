import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';
import { getReferralStats } from '../../lib/services/referralService';
import { useState, useEffect } from 'react';

const timeToHireData = [
    { name: 'Jan', days: 25 },
    { name: 'Feb', days: 22 },
    { name: 'Mar', days: 20 },
    { name: 'Apr', days: 18 },
    { name: 'May', days: 15 },
    { name: 'Jun', days: 18 },
];

export default function AnalyticsDashboard() {
    const [sourceData, setSourceData] = useState([
        { name: 'LinkedIn', value: 45, color: '#0077b5' },
        { name: 'Referral', value: 0, color: '#10b981' }, // Initial 0
        { name: 'Agency', value: 15, color: '#f59e0b' },
        { name: 'Website', value: 10, color: '#6366f1' },
    ]);

    useEffect(() => {
        const stats = getReferralStats();
        if (stats.total > 0) {
            setSourceData(prev => prev.map(item =>
                item.name === 'Referral' ? { ...item, value: stats.total } : item
            ));
        }
    }, []);
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Last 30 Days
                    </button>
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Time to Hire Chart */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Average Time to Hire (Days)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timeToHireData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="days" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hires by Source */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Hires by Source</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {sourceData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <span className="text-xl">✨</span> AI Insights
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        Time to hire has decreased by <span className="font-medium text-foreground">15%</span> over the last 3 months.
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span className="font-medium text-foreground">LinkedIn</span> remains the top performing source with highest retention rate.
                    </li>
                    <li className="flex gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        Engineering department attrition risk is slightly elevated (<span className="font-medium text-foreground">12%</span>) - consider scheduling stay interviews.
                    </li>
                </ul>
            </div>
        </div>
    );
}
