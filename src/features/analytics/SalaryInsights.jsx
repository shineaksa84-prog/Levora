import { useState } from 'react';
import { Search, TrendingUp, DollarSign, MapPin, Briefcase } from 'lucide-react';

export default function SalaryInsights() {
    const [search, setSearch] = useState({ role: '', location: '' });
    const [result, setResult] = useState(null);

    const handleSearch = () => {
        // Mock data response based on inputs or default random data
        const role = search.role || 'Software Engineer';
        const location = search.location || 'San Francisco, CA';

        setResult({
            role,
            location,
            currency: 'USD',
            ranges: {
                low: 110000,
                median: 145000,
                high: 180000
            },
            confidence: 92,
            trend: '+5.4%'
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Market Salary Intelligence
                </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Job Role (e.g. Senior Product Manager)"
                            className="w-full pl-9 p-2.5 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            value={search.role}
                            onChange={(e) => setSearch(prev => ({ ...prev, role: e.target.value }))}
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Location (e.g. New York)"
                            className="w-full pl-9 p-2.5 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            value={search.location}
                            onChange={(e) => setSearch(prev => ({ ...prev, location: e.target.value }))}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-primary-foreground font-medium rounded-md px-4 py-2 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <Search className="w-4 h-4" /> Analyze Ecosystem
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-6 border-b border-border flex justify-between items-start bg-muted/20">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{result.role}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <span className="bg-muted px-2 py-0.5 rounded text-sm">{result.location}</span>
                                <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                                    {result.trend} YoY <TrendingUp className="w-3 h-3" />
                                </span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Confidence Score</p>
                            <div className="flex items-center justify-end gap-1 text-green-600 font-bold">
                                {result.confidence}%
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Salary Visualization */}
                        <div className="relative pt-8 pb-4">
                            <div className="flex justify-between items-end mb-4 text-sm font-medium text-muted-foreground px-4">
                                <div className="text-center">
                                    <p className="text-gray-900 text-lg font-bold">${result.ranges.low.toLocaleString()}</p>
                                    <p>Low</p>
                                </div>
                                <div className="text-center scale-110 origin-bottom">
                                    <p className="text-primary text-2xl font-extrabold">${result.ranges.median.toLocaleString()}</p>
                                    <p className="text-primary">Median</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-900 text-lg font-bold">${result.ranges.high.toLocaleString()}</p>
                                    <p>High</p>
                                </div>
                            </div>

                            {/* Bar Graphic */}
                            <div className="h-4 bg-muted rounded-full overflow-hidden relative mx-4">
                                <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gray-300"></div> {/* 10th percentile */}
                                <div className="absolute left-[20%] top-0 bottom-0 right-[20%] bg-gradient-to-r from-blue-300 via-primary to-blue-300 opacity-80"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gray-300"></div>
                                {/* Median Marker */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white z-10"></div>
                            </div>

                            <div className="flex justify-between text-xs text-muted-foreground mt-2 mx-4">
                                <span>10th Percentile</span>
                                <span>90th Percentile</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-900 mb-2">Compensation Strategy</h4>
                                <p className="text-sm text-blue-800">
                                    For a {result.role} in this market, offering <strong>${Math.round(result.ranges.median * 1.05).toLocaleString()}</strong> (+5%) significantly increases offer acceptance probability.
                                </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <h4 className="font-semibold text-purple-900 mb-2">Demand Index</h4>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-purple-600 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-bold text-purple-700">Very High</span>
                                </div>
                                <p className="text-xs text-purple-800 mt-2">Time to fill is averaging 42 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
