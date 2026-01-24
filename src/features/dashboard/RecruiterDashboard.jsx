import React, { useState } from 'react';
import { Briefcase, Users, Calendar, UserPlus, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../../components/ui/BentoGrid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RecruiterDashboard() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Levora Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                        Talent <span className="text-primary italic">Acquisition</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-3 max-w-md">
                        Optimizing human capital inflow through predictive matching and streamlined pipelines.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-border/50 rounded-2xl font-black text-xs hover:border-primary/50 transition-all active:scale-95 shadow-xl shadow-black/5">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <button
                        onClick={() => navigate('/app/jobs')}
                        className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-xs shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
                    >
                        Post New Role
                    </button>
                </div>
            </div>

            <BentoGrid>
                {/* Stats 1: Active Jobs */}
                <BentoGridItem
                    title="Active Requisitions"
                    description="12 Open Positions"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center border border-primary/10">
                            <span className="text-4xl font-bold text-primary">12</span>
                        </div>
                    }
                    icon={<Briefcase className="h-4 w-4 text-primary" />}
                    className="md:col-span-1"
                />

                {/* Stats 2: New Applications */}
                <BentoGridItem
                    title="Fresh Talent"
                    description="+145 candidates this week"
                    header={
                        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 items-center justify-center border border-accent/10">
                            <span className="text-4xl font-bold text-accent">145</span>
                        </div>
                    }
                    icon={<UserPlus className="h-4 w-4 text-accent" />}
                    className="md:col-span-1"
                />

                {/* Large Item: Pipeline Overview */}
                <BentoGridItem
                    title="Pipeline Velocity"
                    description="Candidates across all stages"
                    colSpan={1}
                    header={
                        <div className="flex flex-col gap-3 p-4 h-full justify-center">
                            {[
                                { label: 'Screening', count: 45, color: 'bg-primary/40' },
                                { label: 'Interview', count: 28, color: 'bg-primary/70' },
                                { label: 'Offer', count: 12, color: 'bg-primary' }
                            ].map((stage, i) => (
                                <div key={stage.label} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                        <span>{stage.label}</span>
                                        <span>{stage.count}</span>
                                    </div>
                                    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(stage.count / 60) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className={`h-full ${stage.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<TrendingUp className="h-4 w-4 text-primary" />}
                    className="md:col-span-1"
                />

                {/* Wide Item: Interviews Today */}
                <BentoGridItem
                    title="Engagement Schedule"
                    description="5 Interviews Scheduled Today"
                    colSpan={3}
                    header={
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                            {[
                                { name: "Sarah Connor", role: "UX Designer", time: "10:00 AM" },
                                { name: "John Smith", role: "Frontend Dev", time: "11:30 AM" },
                                { name: "Emily Blunt", role: "Product Mgr", time: "02:00 PM" }
                            ].map((interview, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all hover:bg-white/60">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary/20">
                                        {interview.name.charAt(0)}{interview.name.split(' ')[1].charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{interview.name}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{interview.role} • <span className="text-primary">{interview.time}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<Calendar className="h-4 w-4 text-accent" />}
                />
            </BentoGrid>
        </div>
    );
}
