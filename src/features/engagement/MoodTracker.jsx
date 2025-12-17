import { useState } from 'react';
import { Smile, Meh, Frown, Heart, Activity, Calendar } from 'lucide-react';

const MOODS = [
    { id: 'great', label: 'Great', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-100' },
    { id: 'good', label: 'Good', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'bad', label: 'Bad', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'terrible', label: 'Terrible', icon: Activity, color: 'text-red-500', bg: 'bg-red-100' },
];

export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [reason, setReason] = useState('');
    const [history, setHistory] = useState([
        { date: 'Mon', mood: 'good' },
        { date: 'Tue', mood: 'great' },
        { date: 'Wed', mood: 'okay' },
        { date: 'Thu', mood: 'good' },
        { date: 'Fri', mood: null }, // Today
    ]);

    const logMood = () => {
        if (!selectedMood) return;
        const newHistory = [...history];
        newHistory[4].mood = selectedMood.id;
        setHistory(newHistory);
        // Reset or show success
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling today?</h2>
                <p className="text-muted-foreground mb-8 text-sm">Your inputs help us improve the workplace culture. Responses are anonymous by default.</p>

                <div className="flex gap-4 mb-8">
                    {MOODS.map((mood) => {
                        const Icon = mood.icon;
                        const isSelected = selectedMood?.id === mood.id;
                        return (
                            <button
                                key={mood.id}
                                onClick={() => setSelectedMood(mood)}
                                className={`flex flex-col items-center gap-2 transition-all p-3 rounded-xl ${isSelected ? `${mood.bg} ${mood.color} scale-110 shadow-sm` : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Icon className={`w-8 h-8 ${isSelected ? 'fill-current' : ''}`} />
                                <span className="text-xs font-bold">{mood.label}</span>
                            </button>
                        );
                    })}
                </div>

                {selectedMood && (
                    <div className="w-full max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <textarea
                            className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Optional: What's making you feel this way?"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <button
                            onClick={logMood}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md"
                        >
                            Log Check-in
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Weekly Pulse
                </h3>

                <div className="flex-1 flex items-end justify-between px-6 pb-6 gap-4">
                    {history.map((day, i) => {
                        const m = MOODS.find(m => m.id === day.mood);
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                <div className="w-full bg-gray-50 rounded-lg relative h-32 flex items-end justify-center p-1 overflow-hidden">
                                    {m ? (
                                        <div className={`w-full rounded-md transition-all ${m.bg}`} style={{
                                            height: m.id === 'great' ? '100%' : m.id === 'good' ? '80%' : m.id === 'okay' ? '60%' : m.id === 'bad' ? '40%' : '20%'
                                        }}></div>
                                    ) : (
                                        <div className="w-full h-1 bg-gray-200 rounded-md"></div>
                                    )}
                                </div>
                                <span className="text-xs font-bold text-muted-foreground">{day.date}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                    <p className="font-bold mb-1">Tip of the day</p>
                    <p>Taking regular short breaks improves focus and prevents burnout. Try the Pomodoro technique today!</p>
                </div>
            </div>
        </div>
    );
}
