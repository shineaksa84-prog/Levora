import { useState } from 'react';
import { Smile, Meh, Frown, TrendingUp, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MOOD_DATA = [
    { day: 'Mon', score: 8.5, sentiment: 'High' },
    { day: 'Tue', score: 7.2, sentiment: 'Medium' },
    { day: 'Wed', score: 6.8, sentiment: 'Medium' },
    { day: 'Thu', score: 9.0, sentiment: 'High' },
    { day: 'Fri', score: 9.5, sentiment: 'Very High' },
];

export default function PulseSurveys() {
    const [mood, setMood] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleVote = (selectedMood) => {
        setMood(selectedMood);
        setSubmitted(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Heart className="w-6 h-6 text-white animate-pulse" />
                        Daily Pulse Check
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                        How are you feeling about work today?
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Voting Booth */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center flex flex-col justify-center">
                    {!submitted ? (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Select your mood</h3>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => handleVote('Sad')}
                                    className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
                                >
                                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <Frown className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 group-hover:text-red-500">Stressed</span>
                                </button>

                                <button
                                    onClick={() => handleVote('Neutral')}
                                    className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
                                >
                                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                        <Meh className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 group-hover:text-yellow-500">Okay</span>
                                </button>

                                <button
                                    onClick={() => handleVote('Happy')}
                                    className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <Smile className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 group-hover:text-green-500">Great!</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Smile className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Thanks for sharing!</h3>
                            <p className="text-gray-500 text-sm mt-2">Your feedback helps us make the workplace better.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-6 text-xs text-gray-400 hover:text-gray-600 underline">Vote again (Demo)</button>
                        </div>
                    )}
                </div>

                {/* Dashboard */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-500" /> Organization Vibe
                        </h3>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">eNPS: +42</span>
                    </div>

                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOOD_DATA}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                    {MOOD_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.score > 8 ? '#22c55e' : entry.score > 6 ? '#eab308' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
