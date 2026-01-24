import { useState } from 'react';
import { Network, CheckCircle2, Lock, Play, ChevronRight, Trophy } from 'lucide-react';

import { getLearningPaths, startModule, completeModule } from '../../lib/services/learningService';
import { toast } from '../../lib/services/toastService';

export default function LearningPaths() {
    const [path, setPath] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPath();
    }, []);

    const loadPath = async () => {
        const paths = await getLearningPaths();
        if (paths.length > 0) {
            setPath(paths[0]); // Just taking the first one for this view
        }
        setLoading(false);
    };

    const handleStart = async (moduleId) => {
        try {
            const updatedPath = await startModule(path.id, moduleId);
            setPath(updatedPath);
            toast.success("Module started! Let's get learning.");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!path) return <div>No active learning path found.</div>;
    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col">
                <div className="mb-8">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                        <Network className="w-6 h-6 text-indigo-600" />
                        {path.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{path.description} Estimated time: {path.duration}.</p>

                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${path.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs font-bold text-gray-500">
                        <span>{path.progress}% Completed</span>
                        <span>{path.modules.filter(m => m.status === 'Completed').length}/{path.modules.length} Modules</span>
                    </div>
                </div>

                <div className="relative flex-1 overflow-y-auto pl-4 space-y-0">
                    {/* Timeline Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200"></div>

                    {path.modules.map((mod, i) => (
                        <div key={mod.id} className="relative pl-12 pb-8 last:pb-0 group">
                            <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 bg-white transition-all ${mod.status === 'Completed' ? 'border-indigo-100 text-indigo-600' :
                                mod.status === 'In Progress' ? 'border-indigo-600 text-white bg-indigo-600 scale-110 shadow-lg' :
                                    'border-gray-100 text-gray-300'
                                }`}>
                                {mod.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> :
                                    mod.status === 'In Progress' ? <Play className="w-4 h-4 fill-current ml-0.5" /> :
                                        <Lock className="w-4 h-4" />}
                            </div>

                            <div className={`p-5 rounded-xl border transition-all ${mod.status === 'In Progress' ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' :
                                mod.status === 'Locked' ? 'bg-gray-50 border-transparent' :
                                    'bg-white border-gray-200 opacity-60 hover:opacity-100'
                                }`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className={`font-bold ${mod.status === 'In Progress' ? 'text-indigo-900' : 'text-gray-900'}`}>
                                                {mod.title}
                                            </h3>
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">{mod.duration}</span>
                                    </div>
                                    {mod.status === 'Locked' && i > 0 && path.modules[i - 1].status === 'Completed' && (
                                        <button
                                            onClick={() => handleStart(mod.id)}
                                            className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50"
                                        >
                                            Start
                                        </button>
                                    )}
                                </div>

                                {mod.status === 'In Progress' && (
                                    <div className="mt-4 flex gap-3">
                                        <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-md">
                                            Continue Learning
                                        </button>
                                        <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 text-xs font-bold rounded-lg hover:bg-indigo-50">
                                            View Resources
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center shadow-lg">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300 drop-shadow-md animate-pulse" />
                    <h3 className="font-bold text-xl mb-2">Keep Going!</h3>
                    <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                        You are on a 5-day streak. Complete this track to earn the <span className="font-bold text-white">"Level 3 Architect"</span> badge.
                    </p>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="font-bold text-2xl">350</p>
                        <p className="text-xs text-indigo-200 uppercase tracking-widest">XP Points</p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm">Recommended Next</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-white hover:shadow-sm cursor-pointer transition-all">
                            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xs">AI</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-xs">Intro to AI Engineering</h4>
                                <p className="text-[10px] text-muted-foreground">New • 2h</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-white hover:shadow-sm cursor-pointer transition-all">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs">UX</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-xs">Accessibility Standards</h4>
                                <p className="text-[10px] text-muted-foreground">Critical • 1h</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
