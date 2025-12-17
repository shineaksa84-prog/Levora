import { useState } from 'react';
import { MessageCircle, Users, Send, ShieldCheck, Smile } from 'lucide-react';

const REQUESTS = [
    { id: 1, from: 'John Doe', role: 'Product Manager', status: 'Pending', type: 'Requesting' },
    { id: 2, from: 'Jane Smith', role: 'Lead Developer', status: 'Completed', type: 'Given' },
];

export default function Feedback360() {
    const [feedbackText, setFeedbackText] = useState('');

    // Mock AI Sentiment
    const sentiment = feedbackText.length > 20 ? (feedbackText.includes('good') || feedbackText.includes('great') ? 'Positive' : 'Neutral') : 'Analyze...';

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-6 h-6 text-pink-200" />
                    360° Feedback Hub
                </h2>
                <p className="text-pink-100 text-sm mt-1">
                    Share and receive constructive feedback to grow together.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Give Feedback */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-gray-500" /> Give Feedback
                        </h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-500">Anonymous Mode: ON</span>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3 border border-gray-200">
                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600 text-xs">JD</div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">John Doe (Replied to your request)</p>
                                <p className="text-xs text-gray-500">Product Manager</p>
                            </div>
                        </div>

                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-100 outline-none h-32"
                            placeholder="Share what they did well and what they can improve..."
                        ></textarea>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                                <Smile className={`w-4 h-4 ${sentiment === 'Positive' ? 'text-green-500' : 'text-gray-400'}`} />
                                Tone: {sentiment}
                            </div>
                            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors">
                                <Send className="w-4 h-4" /> Send Feedback
                            </button>
                        </div>
                    </div>
                </div>

                {/* Requests */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700">
                        Feedback Requests
                    </div>
                    <div className="divide-y divide-gray-100 flex-1">
                        {REQUESTS.map(req => (
                            <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                                        {req.from.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{req.from}</p>
                                        <p className="text-xs text-gray-500">{req.type === 'Requesting' ? 'Requested feedback from you' : 'You gave feedback'}</p>
                                    </div>
                                </div>
                                <button className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${req.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}>
                                    {req.status === 'Completed' ? 'Sent' : 'Reply'}
                                </button>
                            </div>
                        ))}
                        <div className="p-4 text-center">
                            <button className="text-pink-600 text-sm font-bold hover:underline flex items-center justify-center gap-1">
                                <ShieldCheck className="w-4 h-4" /> View My Feedback Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
