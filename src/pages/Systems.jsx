import { Server, Activity, Shield, AlertTriangle } from 'lucide-react';

export default function Systems() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">System Status</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                    <h3 className="font-bold flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-green-500" /> Operational Health
                    </h3>
                    <div className="space-y-4">
                        {['ERP Core', 'Payroll Engine', 'Recruiting Portal', 'Database Cluster'].map(sys => (
                            <div key={sys} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium">{sys}</span>
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded font-bold">Operational</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                    <h3 className="font-bold flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" /> Recent Incidents
                    </h3>
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                        No active incidents reported in the last 24 hours.
                    </div>
                </div>
            </div>
        </div>
    );
}
