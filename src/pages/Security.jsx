import { Shield, Lock, FileText, UserCheck } from 'lucide-react';

export default function Security() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Security Operations</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
                    <Shield className="w-12 h-12 text-green-500 mb-2" />
                    <h3 className="font-bold">Threat Monitor</h3>
                    <p className="text-xs text-muted-foreground">0 High Risks Detected</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
                    <Lock className="w-12 h-12 text-blue-500 mb-2" />
                    <h3 className="font-bold">Access Logs</h3>
                    <p className="text-xs text-muted-foreground">Monitoring active sessions</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
                    <FileText className="w-12 h-12 text-purple-500 mb-2" />
                    <h3 className="font-bold">Compliance</h3>
                    <p className="text-xs text-muted-foreground">SOC2 Audit Passed</p>
                </div>
            </div>
        </div>
    );
}
