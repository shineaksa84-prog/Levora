import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, MoreHorizontal, Plus, ChevronLeft, ChevronRight, Filter, Star, X, Check, Loader2, Sparkles } from 'lucide-react';
import { submitInterviewFeedback } from '../lib/services/interviewFeedbackService';
import FeedbackGenerator from '../features/recruitment/FeedbackGenerator';

export default function Interviews() {
    const [view, setView] = useState('list'); // 'list' or 'calendar'
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);

    const upcomingInterviews = [
        {
            id: 1,
            candidateId: "cand_1",
            candidate: "Sarah Wilson",
            role: "Senior Product Designer",
            type: "Technical Interview",
            date: "Today",
            time: "2:00 PM - 3:00 PM",
            interviewer: "Mike Johnson",
            status: "Confirmed",
            platform: "Zoom"
        },
        {
            id: 2,
            candidateId: "cand_2",
            candidate: "James Chen",
            role: "Frontend Developer",
            type: "Initial Screen",
            date: "Tomorrow",
            time: "10:00 AM - 10:30 AM",
            interviewer: "Emily Davis",
            status: "Pending",
            platform: "Google Meet"
        },
        {
            id: 3,
            candidateId: "cand_3",
            candidate: "Alex Thompson",
            role: "Product Manager",
            type: "Final Round",
            date: "Nov 15",
            time: "11:00 AM - 12:00 PM",
            interviewer: "Sarah Wilson",
            status: "Confirmed",
            platform: "In-person"
        }
    ];

    const handleFeedbackSubmit = (interview) => {
        setSelectedInterview(interview);
        setShowFeedbackModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground mt-1">Manage and schedule candidate interviews.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-muted/50 p-1 rounded-lg flex">
                        <button
                            onClick={() => setView('list')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'calendar' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Calendar
                        </button>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Schedule Interview
                    </button>
                </div>
            </div>

            {view === 'list' ? (
                <div className="grid gap-4">
                    {upcomingInterviews.map((interview) => (
                        <div key={interview.id} className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary font-bold">
                                    <span className="text-xs uppercase">{interview.date.split(' ')[0]}</span>
                                    <span className="text-lg">{interview.date.includes(' ') ? interview.date.split(' ')[1] : new Date().getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{interview.role}</span>
                                        <span>•</span>
                                        <span>{interview.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex flex-col gap-1 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        {interview.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        {interview.platform === 'In-person' ? <MapPin className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                        {interview.platform}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium">Interviewer</p>
                                        <p className="text-sm text-muted-foreground">{interview.interviewer}</p>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${interview.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                                        'bg-yellow-100 text-yellow-700 border-yellow-200'
                                        }`}>
                                        {interview.status}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleFeedbackSubmit(interview)}
                                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5"
                                        >
                                            <Star className="w-3 h-3 text-yellow-300" />
                                            Submit Feedback
                                        </button>
                                        <button className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="font-semibold text-lg">November 2025</h2>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-accent rounded-md"><ChevronLeft className="w-5 h-5" /></button>
                                <button className="p-1 hover:bg-accent rounded-md"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent">Today</button>
                            <button className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-accent flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 border-b border-border bg-muted/30">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[120px]">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className={`p-2 border-b border-r border-border hover:bg-muted/10 transition-colors ${i < 3 || i > 32 ? 'bg-muted/20' : ''}`}>
                                <span className={`text-sm ${i === 15 ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center' : 'text-muted-foreground'}`}>
                                    {i < 3 ? 29 + i : i > 32 ? i - 32 : i - 2}
                                </span>
                                {i === 15 && (
                                    <div className="mt-2 p-1.5 bg-primary/10 border border-primary/20 rounded text-xs text-primary font-medium truncate">
                                        2:00 PM - Sarah W.
                                    </div>
                                )}
                                {i === 16 && (
                                    <div className="mt-2 p-1.5 bg-yellow-100 border border-yellow-200 rounded text-xs text-yellow-800 font-medium truncate">
                                        10:00 AM - James C.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showFeedbackModal && (
                <FeedbackModal
                    interview={selectedInterview}
                    onClose={() => setShowFeedbackModal(false)}
                />
            )}
        </div>
    );
}

function FeedbackModal({ interview, onClose }) {
    const [activeTab, setActiveTab] = useState('eval'); // 'eval' or 'ai'
    const [formData, setFormData] = useState({
        technicalSkills: { programming: 0, problemSolving: 0, systemDesign: 0, codeQuality: 0 },
        softSkills: { communication: 0, teamwork: 0, leadership: 0, adaptability: 0 },
        cultureFit: 0,
        overallRating: 0,
        notes: '',
        recommendation: 'pending'
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await submitInterviewFeedback(interview.candidateId, {
                ...formData,
                interviewerId: 'mike_j',
                interviewerName: 'Mike Johnson'
            });
            alert('Feedback submitted successfully and linked to candidate profile.');
            onClose();
        } catch (error) {
            console.error(error);
            alert('Operation failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderRating = (category, key, value) => (
        <div key={key} className="flex items-center justify-between group">
            <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({
                            ...prev,
                            [category]: { ...prev[category], [key]: star }
                        }))}
                        className={`p-1 transition-colors ${value >= star ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-200'}`}
                    >
                        <Star className="w-4 h-4 fill-current" />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-250 flex flex-col max-h-[90vh]">
                <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-white m-0">Interviewer Evaluation Matrix</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mt-1">Candidate: {interview.candidate} / Role: {interview.role}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('eval')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'eval' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                        Standard Evaluation
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/30' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                        <Sparkles className="w-3 h-3" /> AI Feedback Synthesis
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-1">
                    {activeTab === 'eval' ? (
                        <form id="feedback-form" onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-2">Technical Core</h4>
                                    <div className="space-y-3">
                                        {Object.entries(formData.technicalSkills).map(([key, value]) => renderRating('technicalSkills', key, value))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-2">Soft Assets</h4>
                                    <div className="space-y-3">
                                        {Object.entries(formData.softSkills).map(([key, value]) => renderRating('softSkills', key, value))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600">Culture Fit Protocol</h4>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, cultureFit: star })}
                                                className={`p-1.5 rounded-lg border transition-all ${formData.cultureFit >= star ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 border-gray-200 text-gray-300 hover:border-indigo-100'}`}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600">Strategic Recommendation</h4>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, recommendation: 'hire' })}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg border transition-all ${formData.recommendation === 'hire' ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-green-50'}`}
                                        >
                                            Recommend Hire
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, recommendation: 'reject' })}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg border transition-all ${formData.recommendation === 'reject' ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-red-50'}`}
                                        >
                                            Reject Candidate
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-indigo-600">Synthesis / Key Observations</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                    placeholder="Summarize the candidate's performance, key highlights, and mission-critical observations..."
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </form>
                    ) : (
                        <div className="h-full overflow-y-auto">
                            <FeedbackGenerator isInterviewerMode={true} />
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 font-bold text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={submitting}
                        onClick={handleSubmit}
                        className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Check className="w-4 h-4 text-white" />}
                        Commit Evaluation
                    </button>
                </div>
            </div>
        </div>
    );
}
