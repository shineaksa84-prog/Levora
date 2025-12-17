import { useState } from 'react';
import { Clock, CheckCircle, AlertOctagon, GitMerge, ArrowRight } from 'lucide-react';

const MOCK_PUNCH_DATA = [
    { id: 1, name: 'John Doe', date: '2023-12-05', assigned: 'GS (09:00 - 18:00)', punchIn: '09:05', punchOut: '18:10', actualShift: 'GS', status: 'Matched' },
    { id: 2, name: 'Jane Smith', date: '2023-12-05', assigned: 'GS (09:00 - 18:00)', punchIn: '14:05', punchOut: '23:10', actualShift: 'ES (14:00 - 23:00)', status: 'Mismatch' },
    { id: 3, name: 'Mike Ross', date: '2023-12-05', assigned: 'NS (22:00 - 07:00)', punchIn: '21:55', punchOut: '07:05', actualShift: 'NS', status: 'Matched' },
    { id: 4, name: 'Sarah Lee', date: '2023-12-05', assigned: 'MS (06:00 - 15:00)', punchIn: '09:12', punchOut: '18:30', actualShift: 'GS', status: 'Mismatch' },
];

export default function AutoShiftDetector() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <GitMerge className="w-6 h-6 text-purple-400" />
                        Auto-Shift Detection AI
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Detects when employees work a different shift than assigned.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">2</p>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Mismatches Found</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {MOCK_PUNCH_DATA.map(record => (
                    <div key={record.id} className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between ${record.status === 'Mismatch' ? 'border-orange-200' : 'border-gray-100'
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${record.status === 'Mismatch' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {record.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{record.name}</h3>
                                <p className="text-xs text-gray-500">Punch: {record.punchIn} - {record.punchOut}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase font-bold">Assigned</p>
                                <div className="font-mono font-bold text-gray-600">{record.assigned.split(' ')[0]}</div>
                            </div>

                            {record.status === 'Mismatch' && <ArrowRight className="w-4 h-4 text-gray-300" />}

                            {record.status === 'Mismatch' && (
                                <div className="text-center">
                                    <p className="text-xs text-orange-500 uppercase font-bold">Detected</p>
                                    <div className="font-mono font-bold text-orange-600">{record.actualShift.split(' ')[0]}</div>
                                </div>
                            )}
                        </div>

                        <div>
                            {record.status === 'Mismatch' ? (
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Update Shift
                                </button>
                            ) : (
                                <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                    <CheckCircle className="w-3 h-3" /> Verified
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center text-sm text-gray-500">
                AI analyzed 145 punch records. 98.6% match rate.
            </div>
        </div>
    );
}
