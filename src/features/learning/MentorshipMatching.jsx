import { useState } from 'react';
import { Users, Search, Calendar, MessageSquare, Star } from 'lucide-react';

const MENTORS = [
    { id: 1, name: 'Sarah Lee', role: 'Staff Engineer', expertise: ['System Design', 'Leadership'], slots: 2, img: 'bg-purple-100 text-purple-600' },
    { id: 2, name: 'Mike Ross', role: 'Product Director', expertise: ['Product Strategy', 'Roadmapping'], slots: 0, img: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'Rachel Green', role: 'Head of Design', expertise: ['UX Research', 'Design Systems'], slots: 5, img: 'bg-pink-100 text-pink-600' },
];

export default function MentorshipMatching() {
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white shadow-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Find Your Guide</h2>
                        <p className="text-gray-300 text-sm max-w-lg">Connect with experienced leaders to accelerate your career growth. Book 1:1 sessions for guidance and feedback.</p>
                    </div>
                    <Users className="w-16 h-16 text-gray-700" />
                </div>

                <div className="flex-1 bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Available Mentors</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input className="w-full pl-10 py-1.5 rounded-lg border bg-gray-50 text-sm" placeholder="Search by skill or name..." />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 overflow-y-auto pr-2">
                        {MENTORS.map(mentor => (
                            <div key={mentor.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className={`w-12 h-12 rounded-full ${mentor.img} flex items-center justify-center font-bold text-sm shrink-0`}>
                                        {mentor.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{mentor.name}</h4>
                                        <p className="text-xs text-muted-foreground">{mentor.role}</p>
                                    </div>
                                    {mentor.slots > 0 ? (
                                        <span className="ml-auto text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold">
                                            {mentor.slots} Slots Open
                                        </span>
                                    ) : (
                                        <span className="ml-auto text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold">
                                            Full
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {mentor.expertise.map(skill => (
                                        <span key={skill} className="text-[10px] border border-gray-200 px-2 py-0.5 rounded text-gray-600 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    className={`w-full py-2 rounded-lg text-xs font-bold ${mentor.slots > 0 ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {mentor.slots > 0 ? 'Request Mentorship' : 'Join Waitlist'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Upcoming Sessions
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-xs font-bold text-blue-800 mb-1">Career Planning w/ Sarah</p>
                            <p className="text-xs text-blue-600">Tomorrow, 10:00 AM</p>
                            <button className="mt-2 text-[10px] bg-white text-blue-700 px-3 py-1 rounded shadow-sm font-bold">Join Meeting</button>
                        </div>
                        <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl opacity-60">
                            <p className="text-xs font-bold text-gray-800 mb-1">Code Review w/ Mike</p>
                            <p className="text-xs text-gray-600">Nov 28, 2:00 PM (Completed)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> My Goals
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked readOnly className="accent-green-500" />
                            <span className="line-through text-gray-400">Complete System Design Mock</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="accent-primary" />
                            <span className="text-gray-700">Write Engineering Blog Post</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="accent-primary" />
                            <span className="text-gray-700">Lead a Team Sprint</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
