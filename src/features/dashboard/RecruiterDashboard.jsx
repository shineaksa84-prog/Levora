import React, { useState } from 'react';
import { Briefcase, Users, Calendar, UserPlus, TrendingUp } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../../components/ui/BentoGrid';
import { motion } from 'framer-motion';

export default function RecruiterDashboard() {
    return (
        <div className="space-y-6">
            <BentoGrid>
                {/* Stats 1: Active Jobs */}
                <BentoGridItem
                    title="Active Jobs"
                    description="12 Open Positions"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 items-center justify-center">
                            <span className="text-4xl font-bold text-blue-600">12</span>
                        </div>
                    }
                    icon={<Briefcase className="h-4 w-4 text-blue-500" />}
                    className="md:col-span-1"
                />

                {/* Stats 2: New Applications */}
                <BentoGridItem
                    title="New Applications"
                    description="+145 this week"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 items-center justify-center">
                            <span className="text-4xl font-bold text-violet-600">145</span>
                        </div>
                    }
                    icon={<UserPlus className="h-4 w-4 text-violet-500" />}
                    className="md:col-span-1"
                />

                {/* Large Item: Pipeline Overview */}
                <BentoGridItem
                    title="Pipeline Overview"
                    description="Candidates across all stages"
                    colSpan={1}
                    header={
                        <div className="flex flex-col gap-2 p-2 h-full justify-center">
                            {['Screening', 'Interview', 'Offer'].map((stage, i) => (
                                <div key={stage} className="flex items-center gap-2">
                                    <div className="w-20 text-xs text-gray-500">{stage}</div>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${80 - (i * 20)}%` }}
                                            className="h-full bg-blue-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<TrendingUp className="h-4 w-4 text-green-500" />}
                    className="md:col-span-1"
                />

                {/* Wide Item: Interviews Today */}
                <BentoGridItem
                    title="Today's Interviews"
                    description="5 Scheduled"
                    colSpan={3}
                    header={
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-white/20">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">John Doe</p>
                                        <p className="text-xs text-blue-600">10:00 AM • Video</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<Calendar className="h-4 w-4 text-rose-500" />}
                />
            </BentoGrid>
        </div>
    );
}
