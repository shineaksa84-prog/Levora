import { Search, Upload, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export default function AISourcer() {
    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Candidate Sourcing
                </h2>
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Paste job description or type requirements (e.g. 'Senior React Dev with 5 years exp in Fintech')..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Find Matches
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                    JD
                                </div>
                                <div>
                                    <h3 className="font-semibold">John Doe</h3>
                                    <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-bold text-green-600">94%</span>
                                <span className="text-xs text-muted-foreground">Match Score</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>5+ years React experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Fintech background</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <XCircle className="w-4 h-4 text-red-400" />
                                <span>Missing: GraphQL</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                            <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                                View Profile
                            </button>
                            <button className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">
                                Shortlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
