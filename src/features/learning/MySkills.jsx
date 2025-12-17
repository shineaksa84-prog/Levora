import { useState } from 'react';
import { Target, Zap, BookOpen, ChevronRight } from 'lucide-react';

const SKILLS = [
    { id: 1, name: 'React.js', level: 4, label: 'Expert', category: 'Technical' },
    { id: 2, name: 'UI Design', level: 3, label: 'Advanced', category: 'Design' },
    { id: 3, name: 'Team Leadership', level: 2, label: 'Intermediate', category: 'Soft Skill' },
    { id: 4, name: 'Node.js', level: 1, label: 'Beginner', category: 'Technical' },
];

export default function MySkills() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        My Skill Matrix
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">Last Updated: Nov 2023</span>
                </div>

                <div className="space-y-6">
                    {SKILLS.map(skill => (
                        <div key={skill.id}>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <h4 className="font-bold text-gray-900">{skill.name}</h4>
                                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded h-fit ${skill.level >= 4 ? 'bg-green-100 text-green-700' :
                                        skill.level === 3 ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {skill.label}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${skill.level >= 4 ? 'bg-green-500' :
                                            skill.level === 3 ? 'bg-blue-500' :
                                                skill.level === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                        }`}
                                    style={{ width: `${(skill.level / 5) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-medium">
                                <span>Beginner</span>
                                <span>Intermediate</span>
                                <span>Advanced</span>
                                <span>Expert</span>
                                <span>Master</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" /> Recommended Training
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 border rounded-lg hover:bg-gray-50 bg-white group cursor-pointer transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-sm">Advanced Node.js Patterns</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Video Course • 4 Hours</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </div>
                        </div>
                        <div className="p-3 border rounded-lg hover:bg-gray-50 bg-white group cursor-pointer transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-sm">Leadership 101</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Workshop • 2 Days</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                        <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <h4 className="font-bold">Skill Gap Alert</h4>
                        <p className="text-xs text-gray-300 mt-1">
                            Your 'Node.js' proficiency is below the expected level for 'Senior Engineer' role target.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
