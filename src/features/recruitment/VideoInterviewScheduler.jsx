import { useState, useEffect } from 'react';
import { Calendar, Video, Clock, Users, Plus, Send, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../../lib/services/toastService';
import { getScheduledInterviews, scheduleInterview, cancelInterview, sendInterviewReminder } from '../../lib/services/interviewSchedulingService';

export default function VideoInterviewScheduler() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [formData, setFormData] = useState({
        candidateName: '',
        role: '',
        date: '',
        time: '',
        platform: 'Zoom',
        interviewer: ''
    });

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {
        try {
            const data = await getScheduledInterviews();
            setInterviews(data);
        } catch (error) {
            toast.error('Failed to load interview schedule.');
        } finally {
            setLoading(false);
        }
    };

    const handleSchedule = async (e) => {
        e.preventDefault();
        try {
            const newInterview = await scheduleInterview(formData);
            setInterviews([...interviews, newInterview]);
            setShowScheduleModal(false);
            setFormData({ candidateName: '', role: '', date: '', time: '', platform: 'Zoom', interviewer: '' });
            toast.success(`Interview scheduled with ${formData.candidateName}. Calendar invite sent.`);
        } catch (error) {
            toast.error('Failed to schedule interview.');
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelInterview(id);
            setInterviews(interviews.filter(i => i.id !== id));
            toast.success('Interview cancelled and notifications sent.');
        } catch (error) {
            toast.error('Failed to cancel interview.');
        }
    };

    const handleSendReminder = async (id) => {
        try {
            await sendInterviewReminder(id);
            toast.success('Reminder sent to candidate and interviewer.');
        } catch (error) {
            toast.error('Failed to send reminder.');
        }
    };

    if (loading) return <div className="p-12 text-center text-muted-foreground font-black uppercase tracking-widest">Loading Interview Calendar...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center glass-card p-6 bg-primary/5 border-primary/20">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Video className="w-7 h-7 text-primary" />
                        Video Interview Scheduler
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">Automated Zoom & Teams integration with calendar sync</p>
                </div>
                <button
                    onClick={() => setShowScheduleModal(true)}
                    className="px-5 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Schedule Interview
                </button>
            </div>

            <div className="grid gap-4">
                {interviews.map((interview) => (
                    <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 hover:border-primary/30 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`p-3 rounded-2xl ${interview.status === 'Completed' ? 'bg-emerald-500/10' : 'bg-primary/10'}`}>
                                    <Video className={`w-6 h-6 ${interview.status === 'Completed' ? 'text-emerald-500' : 'text-primary'}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-black text-lg">{interview.candidateName}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${interview.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {interview.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium mb-3">{interview.role}</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs font-bold">{interview.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs font-bold">{interview.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs font-bold">{interview.interviewer}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Video className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs font-bold">{interview.platform}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {interview.status === 'Scheduled' && (
                                    <>
                                        <button
                                            onClick={() => handleSendReminder(interview.id)}
                                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-all"
                                            title="Send Reminder"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(interview.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-all"
                                            title="Cancel Interview"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                                {interview.status === 'Completed' && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                            </div>
                        </div>

                        {interview.link && interview.status === 'Scheduled' && (
                            <div className="mt-4 p-3 bg-muted/30 rounded-xl border border-border/50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Meeting Link</p>
                                <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-primary hover:underline break-all">
                                    {interview.link}
                                </a>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Schedule Modal */}
            <AnimatePresence>
                {showScheduleModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-card max-w-2xl w-full p-8 space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-black tracking-tight">Schedule Video Interview</h3>
                                <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-muted rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSchedule} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Candidate Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.candidateName}
                                            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Role</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Time</label>
                                        <input
                                            type="time"
                                            required
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Platform</label>
                                        <select
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.platform}
                                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        >
                                            <option>Zoom</option>
                                            <option>Teams</option>
                                            <option>Google Meet</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Interviewer</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                                            value={formData.interviewer}
                                            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setShowScheduleModal(false)} className="flex-1 px-4 py-3 bg-muted font-black text-xs uppercase tracking-widest rounded-xl hover:bg-muted/80">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 px-4 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                        Schedule & Send Invites
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
