import { useState } from 'react';
import { Star, User, Users, ClipboardCheck, ArrowRight } from 'lucide-react';

const STAGES = [
    { id: 1, name: 'Self Review', status: 'Completed', date: 'Oct 15' },
    { id: 2, name: 'Manager Review', status: 'In Progress', date: 'Due: Oct 30' },
    { id: 3, name: 'HR Calibration', status: 'Pending', date: 'Nov 05' },
    { id: 4, name: 'Release Discussion', status: 'Locked', date: 'Nov 10' },
];

export default function AppraisalCycleManager() {
    const [rating, setRating] = useState(4);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-400" />
                        Annual Performance Review (2025)
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Current Cycle Phase: <strong>Manager Review</strong>
                    </p>
                </div>
            </div>

            {/* Progress Stepper */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center relative">
                    {/* Line connecting steps */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>

                    {STAGES.map((stage, idx) => {
                        const isCompleted = stage.status === 'Completed';
                        const isActive = stage.status === 'In Progress';

                        return (
                            <div key={stage.id} className="relative z-10 flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${isCompleted ? 'bg-green-600 border-green-600 text-white' :
                                    isActive ? 'bg-white border-blue-600 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-400'
                                    }`}>
                                    {idx + 1}
                                </div>
                                <p className={`mt-3 text-sm font-bold ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-400'
                                    }`}>{stage.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{stage.date}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Action Area */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-gray-500" /> Manager Evaluation Form
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Performance Rating (1-5)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${rating >= star ? 'bg-yellow-100 text-yellow-600 ring-2 ring-yellow-400' : 'bg-gray-100 text-gray-300'
                                                }`}
                                        >
                                            <Star className={`w-6 h-6 ${rating >= star ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                    <div className="ml-4 flex items-center text-sm font-bold text-gray-600">
                                        {rating === 5 ? 'Exceptional' : rating === 4 ? 'Exceeds Expectations' : rating === 3 ? 'Meets Expectations' : 'Needs Improvement'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Key Strengths observed this year</label>
                                <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-24" placeholder="E.g. Excellent leadership in Project X..."></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Areas for Improvement</label>
                                <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-24" placeholder="E.g. Needs to improve on time management..."></textarea>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 mt-6 pt-6 flex justify-end gap-3">
                            <button className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg">Save Draft</button>
                            <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg flex items-center gap-2">
                                Submit Review <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <ClipboardCheck className="w-5 h-5" /> Goal Achievement
                        </h3>
                        <p className="text-sm text-blue-800 mb-4">
                            Employee achieved <strong>85%</strong> of their OKRs this year.
                        </p>
                        <div className="h-2 bg-white rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-500 w-[85%]"></div>
                        </div>
                        <button className="text-xs font-bold text-blue-600 hover:underline">View OKR Details</button>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                        <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                            <Users className="w-5 h-5" /> Peer Feedback
                        </h3>
                        <p className="text-sm text-purple-800">
                            <strong>3 Peers</strong> have submitted feedback. Use this to inform your rating.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
