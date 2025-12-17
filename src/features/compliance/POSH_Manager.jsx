import { useState } from 'react';
import { Lock, Shield, Send, Users, FileText } from 'lucide-react';

export default function POSH_Manager() {
    const [view, setView] = useState('report'); // report, admin

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-pink-50 border border-pink-100 rounded-xl p-6 shadow-sm">
                    <Shield className="w-10 h-10 text-pink-600 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">POSH Compliance</h2>
                    <p className="text-sm text-gray-600 mb-6">Internal Complaints Committee (ICC) portal for a safe workplace.</p>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setView('report')}
                            className={`px-4 py-3 rounded-lg text-sm font-bold text-left flex items-center gap-3 transition-colors ${view === 'report' ? 'bg-pink-600 text-white shadow-md' : 'bg-white hover:bg-gray-50 border border-gray-100 text-gray-700'}`}
                        >
                            <Lock className="w-4 h-4" /> Report an Incident
                        </button>
                        <button
                            onClick={() => setView('admin')}
                            className={`px-4 py-3 rounded-lg text-sm font-bold text-left flex items-center gap-3 transition-colors ${view === 'admin' ? 'bg-gray-800 text-white shadow-md' : 'bg-white hover:bg-gray-50 border border-gray-100 text-gray-700'}`}
                        >
                            <Users className="w-4 h-4" /> ICC Admin Panel
                        </button>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Resources</h3>
                    <ul className="text-xs space-y-2 text-primary font-medium">
                        <li className="hover:underline cursor-pointer">• POSH Policy PDF</li>
                        <li className="hover:underline cursor-pointer">• List of ICC Members</li>
                        <li className="hover:underline cursor-pointer">• Employee Awareness Video</li>
                    </ul>
                </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
                {view === 'report' && (
                    <div className="p-8">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3 text-sm text-yellow-800">
                            <Lock className="w-5 h-5 shrink-0" />
                            <p>Your report is <strong>encrypted</strong> and accessible only to the ICC Presiding Officer. You may choose to remain anonymous.</p>
                        </div>

                        <div className="space-y-4 max-w-lg">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Nature of Incident</label>
                                <select className="w-full mt-1 px-4 py-2 border rounded-lg font-medium bg-white">
                                    <option>Select Category...</option>
                                    <option>Physical Harassment</option>
                                    <option>Verbal Harassment</option>
                                    <option>Creating Hostile Work Environment</option>
                                    <option>Quid Pro Quo</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <textarea className="w-full mt-1 px-4 py-3 border rounded-lg font-medium h-32 resize-none" placeholder="Provide details of the incident..."></textarea>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="anon" className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500" />
                                <label htmlFor="anon" className="text-sm font-bold text-gray-700">Submit Anonymously</label>
                            </div>

                            <button className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors shadow-lg">
                                <Send className="w-4 h-4" /> Submit to ICC
                            </button>
                        </div>
                    </div>
                )}

                {view === 'admin' && (
                    <div className="flex-1 flex flex-col">
                        <div className="p-6 border-b border-border bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Active Cases</h3>
                            <span className="text-xs font-bold bg-white border px-2 py-1 rounded text-gray-600">Confidential Area</span>
                        </div>
                        <div className="p-6">
                            <table className="w-full text-sm">
                                <thead className="text-gray-500 font-bold uppercase text-xs border-b">
                                    <tr>
                                        <th className="py-2 text-left">Case ID</th>
                                        <th className="py-2 text-left">Date</th>
                                        <th className="py-2 text-left">Type</th>
                                        <th className="py-2 text-left">Status</th>
                                        <th className="py-2 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="group hover:bg-gray-50">
                                        <td className="py-4 font-mono font-bold text-gray-700">#ICC-2023-004</td>
                                        <td className="py-4 text-gray-600">Oct 12, 2023</td>
                                        <td className="py-4 font-medium text-gray-900">Verbal Harassment</td>
                                        <td className="py-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">Investigation</span></td>
                                        <td className="py-4 text-right"><button className="text-pink-600 font-bold text-xs hover:underline">View Case</button></td>
                                    </tr>
                                    <tr className="group hover:bg-gray-50">
                                        <td className="py-4 font-mono font-bold text-gray-700">#ICC-2023-003</td>
                                        <td className="py-4 text-gray-600">Sep 28, 2023</td>
                                        <td className="py-4 font-medium text-gray-900">Hostile Environment</td>
                                        <td className="py-4"><span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">Closed</span></td>
                                        <td className="py-4 text-right"><button className="text-pink-600 font-bold text-xs hover:underline">View Report</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
