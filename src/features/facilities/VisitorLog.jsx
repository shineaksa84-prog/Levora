import { useState } from 'react';
import { User, Clock, Printer, CheckCircle2, Search, Filter } from 'lucide-react';

const VISITORS = [
    { id: 1, name: 'John Doe', purpose: 'Interview (Engineering)', host: 'Alice Freeman', checkIn: '09:30 AM', checkOut: '-', status: 'Checked In' },
    { id: 2, name: 'Jane Smith', purpose: 'Vendor Meeting', host: 'Operations Head', checkIn: '10:15 AM', checkOut: '11:45 AM', status: 'Checked Out' },
];

export default function VisitorLog() {
    const [visitors, setVisitors] = useState(VISITORS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                        <input className="w-full pl-9 p-2 border rounded-lg text-sm" placeholder="Search Visitors..." />
                    </div>
                    <button className="p-2 border rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4" /></button>
                </div>
                <button className="bg-primary text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-primary/90 shadow-lg shadow-primary/20">
                    New Visitor Check-in
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visitors.map(visitor => (
                    <div key={visitor.id} className="bg-white p-5 rounded-xl border border-border flex justify-between items-center hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{visitor.name}</h4>
                                <p className="text-sm text-muted-foreground">{visitor.purpose}</p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground font-medium">
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> Host: {visitor.host}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> In: {visitor.checkIn}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${visitor.status === 'Checked In' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                                }`}>
                                {visitor.status}
                            </span>
                            {visitor.status === 'Checked In' && (
                                <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                                    <Printer className="w-3 h-3" /> Print Badge
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
