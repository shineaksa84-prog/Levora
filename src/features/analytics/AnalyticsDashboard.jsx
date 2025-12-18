import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Calendar, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { geminiService } from '../../lib/ai/gemini';
import { getRecruitmentAnalytics } from '../../lib/services/analyticsService';

const COLORS = ['#0077b5', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true);
    const [timeToHireTrends, setTimeToHireTrends] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [insights, setInsights] = useState([]);
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const analyticsData = await getRecruitmentAnalytics();
                setMetrics(analyticsData);

                // Format Time to Hire Trends
                if (analyticsData.timeToHireTrends) {
                    setTimeToHireTrends(analyticsData.timeToHireTrends);
                }

                // Format Source Data for Pie Chart
                if (analyticsData.sourceEffectiveness) {
                    const formattedSource = Object.entries(analyticsData.sourceEffectiveness).map(([name, data], index) => ({
                        name,
                        value: data.total,
                        color: COLORS[index % COLORS.length]
                    }));
                    setSourceData(formattedSource);
                }

                // Fetch AI insights with real data
                const results = await geminiService.generateAnalyticsInsights(analyticsData);
                setInsights(results);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Analyzing real-time HR data...</p>
            </div>
        );
    }

    const handleExport = () => {
        if (!metrics) return;
        const csvRows = [
            ['Metric', 'Value'],
            ['Total Applicants', metrics.funnel?.totalApplicants || 0],
            ['Total Hired', metrics.funnel?.totalHired || 0],
            ['Conversion Overall', `${metrics.funnel?.conversionRates?.Overall || 0}%`],
            ['Avg Time to Hire (Days)', metrics.timeToHire?.average || 0],
            ['Min Time to Hire', metrics.timeToHire?.min || 0],
            ['Max Time to Hire', metrics.timeToHire?.max || 0]
        ];

        const csvString = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Recruitment_Report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Last 6 Months
                    </button>
                    <button className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <TrendingUp className="w-32 h-32 text-primary" />
                </div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <span className="text-2xl animate-pulse">✨</span> AI Recruitment Insights
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {insights.map((insight, idx) => (
                        <div key={idx} className="flex flex-col gap-3 p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
                            <div className={`w-8 h-1 rounded-full ${insight.status === 'success' ? 'bg-green-500' :
                                insight.status === 'warning' ? 'bg-orange-500' :
                                    'bg-blue-500'
                                }`} />
                            <p className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors">{insight.text}</p>
                        </div>
                    ))}
                    {insights.length === 0 && (
                        <div className="col-span-3 text-center py-4 text-muted-foreground italic">
                            Synthesizing cloud data for strategic insights...
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Time to Hire Chart */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Time to Hire Trend</h3>
                        {metrics?.timeToHire && (
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">{metrics.timeToHire.average}d</p>
                                <p className="text-xs text-muted-foreground">Average Days</p>
                            </div>
                        )}
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timeToHireTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="days"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={4}
                                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recruitment Funnel */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Recruitment Funnel</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={metrics?.funnel?.stages ? Object.entries(metrics.funnel.stages).map(([name, value]) => ({ name, value })) : []}
                                margin={{ left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24}>
                                    {metrics?.funnel?.stages && Object.entries(metrics.funnel.stages).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hires by Source */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Candidate Sources</h3>
                    <div className="h-72 w-full flex items-center justify-center">
                        {sourceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                                <Filter className="w-8 h-8 opacity-20" />
                                No source data available
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
                        {sourceData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2 text-xs">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-muted-foreground font-medium">{entry.name} ({entry.value})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Distribution */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Workforce by Department</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics?.departmentMetrics ? Object.entries(metrics.departmentMetrics).map(([name, data]) => ({ name, value: data.employees })) : []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--primary) / 0.05)' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
