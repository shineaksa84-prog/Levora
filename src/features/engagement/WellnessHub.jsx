import { useState } from 'react';
import { Activity, Droplets, Moon, Award, Footprints } from 'lucide-react';

export default function WellnessHub() {
    const [steps, setSteps] = useState(6500);
    const [water, setWater] = useState(4);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-teal-800 text-white p-6 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Activity className="w-6 h-6 text-teal-300" />
                        Wellness Zone
                    </h2>
                    <p className="text-teal-200 text-sm mt-1">
                        Track your health stats and compete in team challenges.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Stats */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-900 mb-4">Today's Activity</h3>

                    {/* Steps */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Footprints className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-700">Steps</span>
                                <span className="font-bold text-gray-900">{steps} / 10,000</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[65%]"></div>
                            </div>
                        </div>
                        <button onClick={() => setSteps(steps + 500)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">+</button>
                    </div>

                    {/* Water */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Droplets className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-700">Hydration</span>
                                <span className="font-bold text-gray-900">{water} / 8 Glasses</span>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`h-2 flex-1 rounded-full ${i < water ? 'bg-blue-500' : 'bg-gray-100'}`}></div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setWater(water + 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">+</button>
                    </div>

                    {/* Sleep */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <Moon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-700">Sleep</span>
                                <span className="font-bold text-gray-900">7h 15m</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[90%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Challenge Card */}
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
                    <Award className="w-32 h-32 absolute -right-6 -bottom-6 text-white opacity-20 rotate-12" />

                    <h3 className="text-2xl font-bold mb-2">October Step-a-thon!</h3>
                    <p className="text-white/90 mb-6 text-sm font-medium">
                        Join the company-wide challenge. Top 3 walkers win an Apple Watch.
                    </p>

                    <div className="bg-white/20 backdrop-blur rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-yellow-100">#1</span>
                                <span className="font-bold">Mike Ross</span>
                            </div>
                            <span className="font-mono">152,000 steps</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80 scale-95 origin-left">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-200">#2</span>
                                <span>Sarah C</span>
                            </div>
                            <span className="font-mono">148,500 steps</span>
                        </div>
                        <div className="bg-white/30 rounded px-2 py-1 flex justify-between items-center mt-2 border border-white/40">
                            <span className="font-bold text-sm">#42 You</span>
                            <span className="font-mono text-sm">65,000 steps</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-white text-orange-600 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-50 transition-colors">
                        View Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
}
