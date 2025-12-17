import { useState } from 'react';
import { Grid, MousePointer2 } from 'lucide-react';

const BOXES = [
    { id: '1A', name: 'Rough Diamond', color: 'bg-yellow-100 border-yellow-200' }, // High Pot, Low Perf
    { id: '1B', name: 'Future Star', color: 'bg-green-100 border-green-200' }, // High Pot, Med Perf
    { id: '1C', name: 'Star Performer', color: 'bg-green-200 border-green-300' }, // High Pot, High Perf
    { id: '2A', name: 'Inconsistent', color: 'bg-orange-100 border-orange-200' }, // Med Pot, Low Perf
    { id: '2B', name: 'Core Player', color: 'bg-blue-50 border-blue-200' }, // Med Pot, Med Perf
    { id: '2C', name: 'High Performer', color: 'bg-green-50 border-green-200' }, // Med Pot, High Perf
    { id: '3A', name: 'Talent Risk', color: 'bg-red-100 border-red-200' }, // Low Pot, Low Perf
    { id: '3B', name: 'Effective', color: 'bg-gray-100 border-gray-200' }, // Low Pot, Med Perf
    { id: '3C', name: 'Trusted Pro', color: 'bg-blue-100 border-blue-200' }, // Low Pot, High Perf
];

const EMPLOYEES = [
    { id: 1, name: 'Alex', box: '1C' }, { id: 2, name: 'Sam', box: '2B' }, { id: 3, name: 'Jordan', box: '3A' },
    { id: 4, name: 'Casey', box: '1B' }, { id: 5, name: 'Taylor', box: '2B' },
];

export default function NineBoxGrid() {
    const [selectedEmp, setSelectedEmp] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Grid className="w-6 h-6 text-indigo-400" />
                        9-Box Talent Matrix
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Calibrate talent by mapping <strong>Performance</strong> vs <strong>Potential</strong>.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                    <MousePointer2 className="w-4 h-4 text-indigo-400" /> Click to view details
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                {/* Labels */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Potential (Low → High)
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Performance (Low → High)
                </div>

                <div className="grid grid-cols-3 gap-4 ml-8 mb-8 pb-8">
                    {BOXES.map(box => {
                        const boxEmps = EMPLOYEES.filter(e => e.box === box.id);
                        return (
                            <div key={box.id} className={`${box.color} border-2 rounded-xl h-32 p-3 relative hover:scale-[1.02] transition-transform`}>
                                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase text-gray-600 bg-white/50 px-2 py-0.5 rounded backdrop-blur-sm">
                                    {box.name}
                                </span>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {boxEmps.map(emp => (
                                        <div
                                            key={emp.id}
                                            onClick={() => setSelectedEmp(emp)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors"
                                            title={emp.name}
                                        >
                                            {emp.name.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedEmp && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex justify-between items-center animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-800">
                            {selectedEmp.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{selectedEmp.name}</h4>
                            <p className="text-xs text-gray-600">Current Zone: <strong>{BOXES.find(b => b.id === selectedEmp.box).name}</strong></p>
                        </div>
                    </div>
                    <div className="text-sm">
                        <button className="text-indigo-600 font-bold hover:underline">View Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
}
