import { useState } from 'react';
import { Lightbulb, ThumbsUp, MessageSquarePlus, Filter } from 'lucide-react';

const INITIAL_IDEAS = [
    { id: 1, title: 'WFH Flexibility on Fridays', desc: 'Allow employees to work remotely every Friday to save commute time.', votes: 42, status: 'Under Review' },
    { id: 2, title: 'Better Coffee Machine', desc: 'The current machine on 2nd floor breaks down weekly.', votes: 15, status: 'New' },
];

export default function SuggestionBox() {
    const [ideas, setIdeas] = useState(INITIAL_IDEAS);

    const handleVote = (id) => {
        setIdeas(ideas.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-yellow-400" />
                        Digital Suggestion Box
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Have an idea? Drop it here. Top voted ideas get implemented.
                    </p>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-colors">
                    <MessageSquarePlus className="w-4 h-4" /> Submit Idea
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex gap-4 text-sm font-bold text-gray-500">
                        <button className="text-gray-900 border-b-2 border-yellow-500 pb-1">Top Voted</button>
                        <button className="hover:text-gray-700">Newest</button>
                        <button className="hover:text-gray-700">Under Review</button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {ideas.map(idea => (
                        <div key={idea.id} className="p-6 flex gap-6 hover:bg-gray-50 transition-colors">
                            {/* Vote Counter */}
                            <button
                                onClick={() => handleVote(idea.id)}
                                className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gray-100 hover:bg-yellow-100 text-gray-500 hover:text-yellow-700 transition-colors border border-gray-200 group"
                            >
                                <ThumbsUp className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-lg">{idea.votes}</span>
                            </button>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${idea.status === 'Under Review' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                                        }`}>{idea.status}</span>
                                </div>
                                <p className="text-gray-600 mb-2 leading-relaxed">{idea.desc}</p>
                                <div className="text-xs text-gray-400 font-medium">Submitted anonymously • 2 days ago</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
