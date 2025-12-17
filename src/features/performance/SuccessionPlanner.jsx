import { useState } from 'react';
import { Crown, Users, AlertTriangle, ArrowUpRight } from 'lucide-react';

const KEY_ROLES = [
    {
        id: 1, role: 'Chief Technology Officer', incumbent: 'Sarah Connor', risk: 'Medium', successors: [
            { name: 'Kyle Reese', readiness: 'Ready Now' },
            { name: 'T-800', readiness: '1-2 Years' }
        ]
    },
    { id: 2, role: 'VP Sales', incumbent: 'Glengarry Ross', risk: 'High', successors: [] }, // No successor risk
];

export default function SuccessionPlanner() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        Succession Planning Board
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Identify and groom future leaders for critical roles.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {KEY_ROLES.map(role => (
                    <div key={role.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{role.role}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                        {role.incumbent.charAt(0)}
                                    </div>
                                    <p className="text-sm text-gray-600">Incumbent: {role.incumbent}</p>
                                </div>
                            </div>
                            {role.successors.length === 0 && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                    <AlertTriangle className="w-3 h-3" /> No Successor
                                </span>
                            )}
                        </div>

                        <div className="p-5 space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identified Successors</p>

                            {role.successors.length > 0 ? (
                                <div className="space-y-3">
                                    {role.successors.map((succ, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                                                    {succ.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-gray-900 text-sm">{succ.name}</span>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${succ.readiness === 'Ready Now' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {succ.readiness}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                    <p className="text-xs">Risk Alert: No internal successors identified.</p>
                                    <button className="text-indigo-600 font-bold text-xs mt-2 hover:underline flex items-center justify-center gap-1 w-full">
                                        <ArrowUpRight className="w-3 h-3" /> Scout Internal Talent
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                            <button className="text-xs font-bold text-gray-500 hover:text-gray-900">View Development Plan</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
