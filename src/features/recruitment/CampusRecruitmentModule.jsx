import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, Users, TrendingUp, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import {
    getUniversities,
    getUpcomingEvents,
    getStudentPipeline,
    getCampusAmbassadors,
    getCampusMetrics
} from '../../lib/services/campusRecruitmentService';

export default function CampusRecruitmentModule() {
    const [universities, setUniversities] = useState([]);
    const [events, setEvents] = useState([]);
    const [students, setStudents] = useState([]);
    const [ambassadors, setAmbassadors] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('universities');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [universitiesData, eventsData, studentsData, ambassadorsData, metricsData] = await Promise.all([
                getUniversities(),
                getUpcomingEvents(),
                getStudentPipeline(),
                getCampusAmbassadors(),
                getCampusMetrics()
            ]);

            setUniversities(universitiesData);
            setEvents(eventsData);
            setStudents(studentsData);
            setAmbassadors(ambassadorsData);
            setMetrics(metricsData);
        } catch (error) {
            toast.error('Failed to load campus recruitment data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Loading Campus Data...</div>;

    return (
        <div className="space-y-6">
            {/* Header & Metrics */}
            <div className="glass-card p-8 bg-gradient-to-r from-violet-500/5 to-primary/5 border-violet-500/20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <GraduationCap className="w-7 h-7 text-violet-500" />
                            Campus Recruitment Module
                        </h2>
                        <p className="text-muted-foreground font-medium mt-1">University partnership and event management</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-violet-500">{metrics.activePartnerships}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Partnerships</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-primary">{metrics.upcomingEvents}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upcoming Events</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-emerald-500">{metrics.totalHired}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Hired</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl border border-border/50">
                        <p className="text-2xl font-black text-amber-500">{metrics.internToFTEConversion}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Intern→FTE Rate</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border/50">
                {[
                    { id: 'universities', label: 'Universities', icon: GraduationCap },
                    { id: 'events', label: 'Events', icon: Calendar },
                    { id: 'students', label: 'Student Pipeline', icon: Users },
                    { id: 'ambassadors', label: 'Ambassadors', icon: Award }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all ${activeTab === tab.id
                                ? 'text-primary border-b-2 border-primary bg-primary/5'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'universities' && (
                    <div className="grid lg:grid-cols-2 gap-4">
                        {universities.map((uni, idx) => (
                            <motion.div
                                key={uni.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-card p-6 hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-black text-lg">{uni.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" />
                                            {uni.location}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${uni.tier === 'Tier 1' ? 'bg-violet-500/10 text-violet-500' : 'bg-primary/10 text-primary'
                                        }`}>
                                        {uni.tier}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <p className="text-lg font-black text-primary">{uni.stats.totalApplications}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground">Applications</p>
                                    </div>
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <p className="text-lg font-black text-emerald-500">{uni.stats.hired}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground">Hired</p>
                                    </div>
                                    <div className="text-center p-2 bg-muted/30 rounded-lg">
                                        <p className="text-lg font-black text-amber-500">{uni.stats.conversionRate}%</p>
                                        <p className="text-[9px] font-bold text-muted-foreground">Conv. Rate</p>
                                    </div>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    <p className="font-bold mb-1">Programs: {uni.programs.join(', ')}</p>
                                    <p>Partner since: {new Date(uni.partnerSince).toLocaleDateString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="space-y-3">
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-card p-6 hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-black text-lg">{event.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${event.type === 'Career Fair' ? 'bg-primary/10 text-primary' :
                                                    event.type === 'Hackathon' ? 'bg-violet-500/10 text-violet-500' :
                                                        'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium mb-3">{event.universityName}</p>

                                        <div className="grid grid-cols-3 gap-4 text-xs">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-bold">{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-bold">{event.expectedStudents} expected</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-bold">${event.budget.toLocaleString()} budget</span>
                                            </div>
                                        </div>

                                        {event.notes && (
                                            <p className="text-xs text-muted-foreground mt-3 italic">{event.notes}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="grid lg:grid-cols-2 gap-4">
                        {students.map((student, idx) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-card p-6 hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-black text-lg">{student.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium">{student.major} • Class of {student.graduationYear}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${student.stage === 'Offer' ? 'bg-emerald-500/10 text-emerald-500' :
                                            student.stage === 'Interview' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-primary/10 text-primary'
                                        }`}>
                                        {student.stage}
                                    </span>
                                </div>

                                <div className="flex gap-2 mb-3">
                                    {student.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-muted rounded-full text-[9px] font-bold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    <p>GPA: {student.gpa} • {student.type}</p>
                                    <p>Applied: {student.appliedDate} via {student.source}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'ambassadors' && (
                    <div className="grid lg:grid-cols-3 gap-4">
                        {ambassadors.map((amb, idx) => (
                            <motion.div
                                key={amb.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-card p-6 text-center hover:border-primary/30 transition-all"
                            >
                                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-2xl ${amb.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                                        amb.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white' :
                                            'bg-gradient-to-br from-primary to-secondary text-white'
                                    }`}>
                                    #{amb.rank}
                                </div>

                                <h3 className="font-black text-lg mb-1">{amb.name}</h3>
                                <p className="text-sm text-muted-foreground font-medium mb-4">{amb.university}</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-2 bg-muted/30 rounded-lg">
                                        <p className="text-xl font-black text-primary">{amb.referrals}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground">Referrals</p>
                                    </div>
                                    <div className="p-2 bg-muted/30 rounded-lg">
                                        <p className="text-xl font-black text-amber-500">{amb.points}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground">Points</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
