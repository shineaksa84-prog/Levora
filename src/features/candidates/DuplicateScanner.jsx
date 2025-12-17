import { useState } from 'react';
import { Users, AlertTriangle, Merge, CheckCircle, X } from 'lucide-react';

export default function DuplicateScanner() {
    const [duplicates, setDuplicates] = useState([
        {
            id: 1,
            confidence: 95,
            primary: { name: 'John Smith', email: 'john.smith@gmail.com', phone: '+1 555-0123', applied: '2 days ago' },
            secondary: { name: 'John A. Smith', email: 'john.smith@work.com', phone: '+1 555-0123', applied: '10 days ago' }
        },
        {
            id: 2,
            confidence: 82,
            primary: { name: 'Sarah Connor', email: 'sarah.c@tech.net', phone: '+1 555-9876', applied: '1 week ago' },
            secondary: { name: 'S. Connor', email: 'sarah.connor@gmail.com', phone: 'N/A', applied: '1 month ago' }
        }
    ]);

    const [scannedCount, setScannedCount] = useState(1542);

    const handleMerge = (id) => {
        setDuplicates(duplicates.filter(d => d.id !== id));
        // In real app, this would trigger an API call to merge records
    };

    const handleIgnore = (id) => {
        setDuplicates(duplicates.filter(d => d.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Duplicate Detection</h2>
                    <p className="text-muted-foreground">Review and merge duplicate candidate profiles.</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Scanned {scannedCount} profiles</span>
                    <button className="text-primary hover:underline font-medium">Scan Now</button>
                </div>
            </div>

            <div className="space-y-4">
                {duplicates.map((group) => (
                    <div key={group.id} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium">
                                <AlertTriangle className="w-4 h-4" />
                                {group.confidence}% Match Confidence
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleIgnore(group.id)}
                                    className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted rounded-md transition-colors"
                                >
                                    Ignore
                                </button>
                                <button
                                    onClick={() => handleMerge(group.id)}
                                    className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors flex items-center gap-1"
                                >
                                    <Merge className="w-4 h-4" /> Merge Profiles
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 relative">
                            {/* Connector Line */}
                            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-muted p-2 rounded-full border border-border">
                                <Merge className="w-4 h-4 text-muted-foreground" />
                            </div>

                            {/* Primary Profile */}
                            <div className="bg-background rounded-lg border border-border/50 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase text-green-600 tracking-wider">Primary Record</span>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">{group.primary.name}</h3>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p>{group.primary.email}</p>
                                        <p>{group.primary.phone}</p>
                                        <p>Applied: {group.primary.applied}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Profile */}
                            <div className="bg-background rounded-lg border border-border/50 p-4 opacity-75">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Duplicate Candidate</span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">{group.secondary.name}</h3>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p>{group.secondary.email}</p>
                                        <p>{group.secondary.phone}</p>
                                        <p>Applied: {group.secondary.applied}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {duplicates.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold">Clean Database!</h3>
                        <p className="text-muted-foreground max-w-sm mt-2">No duplicates found in the current scan. Your candidate database is optimized.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
