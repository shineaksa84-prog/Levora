import { useState } from 'react';
import { Star, CheckCircle, User, Award, ArrowRight } from 'lucide-react';

const SECTIONS = [
    { id: 'goals', title: 'Goal Achievement', weight: '40%' },
    { id: 'competency', title: 'Core Competencies', weight: '30%' },
    { id: 'values', title: 'Values & Culture', weight: '30%' },
];

export default function AppraisalReview() {
    const [step, setStep] = useState(1); // 1: Self, 2: Manager, 3: HR, 4: Complete
    const [rating, setRating] = useState({ goals: 4, competency: 3, values: 5 });

    const totalScore = ((rating.goals * 0.4) + (rating.competency * 0.3) + (rating.values * 0.3)).toFixed(1);

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 border-r border-border pr-6 space-y-6">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        Annual Review
                    </h2>
                    <p className="text-sm text-muted-foreground">Cycle: FY 2023-24</p>
                </div>

                <div className="space-y-0 relative">
                    {[
                        { id: 1, label: 'Self Review', status: 'Completed', date: 'Nov 15' },
                        { id: 2, label: 'Manager Review', status: 'In Progress', date: 'Due Nov 30' },
                        { id: 3, label: 'Calibration', status: 'Pending', date: 'Dec 05' },
                        { id: 4, label: 'Release', status: 'Pending', date: 'Dec 10' }
                    ].map((s, i) => (
                        <div key={s.id} className="flex gap-4 pb-8 relative group">
                            {i !== 3 && <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200"></div>}
                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step > s.id ? 'bg-green-500 border-green-500 text-white' :
                                    step === s.id ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-300'
                                }`}>
                                {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${step === s.id ? 'text-blue-700' : 'text-gray-900'}`}>{s.label}</p>
                                <p className="text-xs text-muted-foreground">{s.status} • {s.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-3 bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col overflow-y-auto">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                        <p className="text-muted-foreground">Senior Engineer • Engineering</p>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-xs font-bold uppercase text-muted-foreground">Overall Rating</p>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-black text-purple-600">{totalScore}</span>
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} className={`w-4 h-4 ${star <= Math.round(totalScore) ? 'fill-current' : 'text-gray-200'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {SECTIONS.map(section => (
                        <div key={section.id} className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-lg text-gray-800">{section.title} <span className="text-sm font-normal text-muted-foreground">({section.weight})</span></h4>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setRating({ ...rating, [section.id]: val })}
                                            className={`w-8 h-8 rounded border text-sm font-bold transition-all ${rating[section.id] === val
                                                    ? 'bg-purple-600 text-white border-purple-600'
                                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none"
                                rows={3}
                                placeholder={`Enter comments for ${section.title}...`}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t flex justify-between items-center">
                    <button className="text-sm font-bold text-gray-500 hover:text-gray-900">Save Draft</button>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-shadow shadow-md flex items-center gap-2">
                        Submit Review <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
