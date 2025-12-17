import React from 'react';
import { FileText, UserCheck, AlertCircle, Clock, Users, Shield, Briefcase, Bell } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../../components/ui/BentoGrid';

export default function HROpsDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    HR Operations
                </h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-glow-sm hover:shadow-glow transition-all">
                    New Onboarding
                </button>
            </div>

            <BentoGrid>
                {/* Item 1: Onboarding Stats */}
                <BentoGridItem
                    title="Onboarding"
                    description="8 Active"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 items-center justify-center border border-indigo-100">
                            <div className="text-center">
                                <span className="text-4xl font-bold text-indigo-600">8</span>
                                <p className="text-xs text-indigo-400 mt-1">New Joiners</p>
                            </div>
                        </div>
                    }
                    icon={<UserCheck className="h-4 w-4 text-indigo-500" />}
                />

                {/* Item 2: Pending Docs */}
                <BentoGridItem
                    title="Pending Docs"
                    description="15 Files Review"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 items-center justify-center border border-yellow-100">
                            <div className="text-center">
                                <span className="text-4xl font-bold text-yellow-600">15</span>
                                <p className="text-xs text-yellow-500 mt-1">Action Needed</p>
                            </div>
                        </div>
                    }
                    icon={<FileText className="h-4 w-4 text-yellow-500" />}
                />

                {/* Item 3: Pulse - Compliance */}
                <BentoGridItem
                    title="Visa Expiry"
                    description="Critical Alerts"
                    colSpan={1}
                    header={
                        <div className="flex items-center justify-center h-full bg-red-50 rounded-xl border border-red-100 p-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white rounded-full shadow-sm">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-red-600">3</p>
                                    <p className="text-xs text-red-400">Expiring Soon</p>
                                </div>
                            </div>
                        </div>
                    }
                    icon={<Shield className="h-4 w-4 text-red-500" />}
                />

                {/* Item 4: Onboarding List - Tall/Wide */}
                <BentoGridItem
                    title="Active Onboarding"
                    description="Status & Progress"
                    colSpan={2}
                    header={
                        <div className="space-y-2 h-full overflow-y-auto pr-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/50 hover:bg-white transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            NJ
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">New Joiner {i}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Product Design</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold bg-yellow-50 text-yellow-700 rounded-md border border-yellow-100">
                                        Docs Pending
                                    </span>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<Briefcase className="h-4 w-4 text-gray-500" />}
                />

                {/* Item 5: Critical Alerts List */}
                <BentoGridItem
                    title="Action Required"
                    description="Compliance & Tasks"
                    colSpan={1}
                    header={
                        <div className="space-y-2">
                            <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 hover:bg-red-50 transition-colors cursor-pointer group">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-red-800 group-hover:underline">Visa Expiry: Sarah</p>
                                        <p className="text-[10px] text-red-600">15 days remaining</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-yellow-50/50 rounded-xl border border-yellow-100 hover:bg-yellow-50 transition-colors cursor-pointer group">
                                <div className="flex items-start gap-3">
                                    <FileText className="w-4 h-4 text-yellow-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-yellow-800 group-hover:underline">Missing Forms</p>
                                        <p className="text-[10px] text-yellow-600">5 employees pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    icon={<Bell className="h-4 w-4 text-orange-500" />}
                />
            </BentoGrid>
        </div>
    );
}
