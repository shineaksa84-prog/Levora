import { useState } from 'react';
import { Clock, MapPin, Settings, Save, AlertCircle, PlayCircle } from 'lucide-react';

const INITIAL_RULES = [
    { id: 1, name: 'General Shift', start: '09:00', end: '18:00', grace: '15 mins', type: 'Onsite', active: true },
    { id: 2, name: 'Engineering Flexi', start: '10:00', end: '19:00', grace: '30 mins', type: 'Hybrid', active: true },
    { id: 3, name: 'Support Night', start: '20:00', end: '05:00', grace: '0 mins', type: 'Remote', active: true },
];

export default function AttendanceRules() {
    const [rules, setRules] = useState(INITIAL_RULES);
    const [testTime, setTestTime] = useState('09:20');
    const [testResult, setTestResult] = useState(null);

    const testRule = (time) => {
        // Simple logic simulation
        const [hours, mins] = time.split(':').map(Number);
        const totalMins = hours * 60 + mins;
        const startMins = 9 * 60; // 09:00
        const grace = 15;

        let status = 'On Time';
        if (totalMins > startMins + grace && totalMins <= startMins + 60) status = 'Late (Half Day Deductible)';
        else if (totalMins > startMins + 60) status = 'Absent (Full Day Deductible)';
        else if (totalMins > startMins) status = 'Late (Grace Period)';

        setTestResult(status);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Settings className="w-5 h-5 text-primary" />
                            Attendance & Shift Rules
                        </h2>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                            + Add New Rule
                        </button>
                    </div>

                    <div className="space-y-4">
                        {rules.map((rule) => (
                            <div key={rule.id} className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors bg-card">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{rule.name}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rule.start} - {rule.end}</span>
                                                <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Grace: {rule.grace}</span>
                                                <span className={`px-2 py-0.5 rounded textxs font-medium ${rule.type === 'Remote' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {rule.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={rule.active} className="sr-only peer" readOnly />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Expansion for details (Visual only for now) */}
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground block text-xs uppercase font-bold mb-1">Overtime Policy</span>
                                        <span className="font-medium text-gray-700">Standard (1.5x after 45hrs)</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block text-xs uppercase font-bold mb-1">Regularization Limit</span>
                                        <span className="font-medium text-gray-700">3 per month</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <PlayCircle className="w-5 h-5 text-purple-600" />
                        Rule Simulator
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">Test how your logic handles specific check-in times based on "General Shift".</p>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Simulate Check-in Time</label>
                            <input
                                type="time"
                                value={testTime}
                                onChange={(e) => {
                                    setTestTime(e.target.value);
                                    setTestResult(null);
                                }}
                                className="w-full p-2.5 rounded-lg border border-input bg-background"
                            />
                        </div>

                        <button
                            onClick={() => testRule(testTime)}
                            className="w-full bg-purple-600 text-white font-medium py-2.5 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Run Simulation
                        </button>

                        {testResult && (
                            <div className={`p-4 rounded-lg border mt-4 text-center ${testResult.includes('Late') ? 'bg-orange-50 border-orange-200 text-orange-900' :
                                testResult.includes('Absent') ? 'bg-red-50 border-red-200 text-red-900' :
                                    'bg-green-50 border-green-200 text-green-900'
                                }`}>
                                <h4 className="font-bold text-lg mb-1">{testResult.split('(')[0]}</h4>
                                <span className="text-xs opacity-80">{testResult.includes('(') ? `(${testResult.split('(')[1]}` : ''}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="font-bold text-blue-900 mb-2">Auto-Correction Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-2 list-disc pl-4">
                        <li>Enable "Smart Grace" to ignore &lt; 5 min delays on rainy days.</li>
                        <li>Link "Work from Home" requests to attendance automatically to prevent absent marking.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
