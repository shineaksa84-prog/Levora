import { useState } from 'react';
import {
    Coffee, Clock, Calendar, Gift, Megaphone,
    Smile, LayoutGrid, Users, Award, MapPin
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../../components/ui/BentoGrid';
import { StoryMode } from '../../components/ui/StoryMode';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { ConfettiFX } from '../../components/ui/ConfettiFX';
import MoodTracker from '../engagement/MoodTracker';
import RecognitionWall from '../engagement/RecognitionWall';
import CompanyDirectory from '../employees/CompanyDirectory';
import HolidayCalendar from '../attendance/HolidayCalendar';
import OrgChart from '../employees/OrgChart';
import InternalJobs from '../recruitment/InternalJobs';
import ProfileManager from '../employees/ProfileManager';
import LeavePlanner from '../attendance/LeavePlanner';
import CourseCatalog from '../learning/CourseCatalog';
import LearningPaths from '../learning/LearningPaths';
import CertificationVault from '../learning/CertificationVault';
import MentorshipMatching from '../learning/MentorshipMatching';

export default function EmployeeDashboard() {
    const [view, setView] = useState('home');
    const [showStory, setShowStory] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Mock User
    const user = { name: 'Alice', role: 'UX Designer', dept: 'Product' };

    const weeklyRecapStories = [
        {
            title: "Weekly Recap 🚀",
            content: "You crushed it this week! Let's see what you achieved.",
            background: "linear-gradient(to bottom right, #4f46e5, #ec4899)",
            metric: "45 Tasks"
        },
        {
            title: "Top Performer 🏆",
            content: "You were in the top 5% of your department for task completion.",
            background: "linear-gradient(to bottom right, #f59e0b, #ef4444)",
            metric: "Top 5%"
        },
        {
            title: "Learning Goat 🐐",
            content: "You completed the 'Advanced React' module. Keep learning!",
            background: "linear-gradient(to bottom right, #10b981, #3b82f6)",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 flex items-center gap-2">
                        <Coffee className="w-6 h-6 text-orange-500" />
                        Good Morning, {user.name}
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-500 font-medium mt-1">Ready to make an impact today?</p>
                        <MagneticButton
                            onClick={() => {
                                setShowStory(true);
                                setShowConfetti(true);
                                setTimeout(() => setShowConfetti(false), 2000);
                            }}
                            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow hover:scale-105 transition-transform"
                        >
                            View Weekly Recap 🎥
                        </MagneticButton>
                    </div>
                </div>

                <div className="flex gap-1 bg-white/50 p-1.5 rounded-xl border border-white/20 shadow-sm overflow-x-auto max-w-2xl scrollbar-hide">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'mood', label: 'Wellness' },
                        { id: 'recognition', label: 'Kudos' },
                        { id: 'directory', label: 'Directory' },
                        { id: 'org', label: 'Org Chart' },
                        { id: 'jobs', label: 'Jobs' },
                        { id: 'skills', label: 'Skills' },
                        { id: 'learning', label: 'Learning' },
                        { id: 'mentorship', label: 'Mentors' },
                        { id: 'holidays', label: 'Holidays' },
                        { id: 'profile', label: 'Profile' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all duration-200 ${view === tab.id ? 'bg-white text-orange-600 shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-white/30'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {view === 'mood' && <MoodTracker />}
            {view === 'recognition' && <RecognitionWall />}
            {view === 'directory' && <CompanyDirectory />}
            {view === 'org' && <OrgChart />}
            {view === 'jobs' && <InternalJobs />}
            {view === 'skills' && <div className="p-10 text-center text-gray-500">Skills Component Placeholder</div>}
            {view === 'learning' && (
                <div className="space-y-6">
                    <CourseCatalog />
                    <div className="grid lg:grid-cols-2 gap-6">
                        <LearningPaths />
                        <CertificationVault />
                    </div>
                </div>
            )}
            {view === 'mentorship' && <MentorshipMatching />}
            {view === 'profile' && <ProfileManager />}
            {view === 'planner' && <LeavePlanner />}
            {view === 'holidays' && <HolidayCalendar />}

            {view === 'home' && (
                <BentoGrid>
                    {/* Item 1: Shift Timer */}
                    <BentoGridItem
                        title="Your Shift"
                        description="Ends at 06:30 PM"
                        header={
                            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white p-4">
                                <Clock className="w-8 h-8 opacity-80 mb-2" />
                                <h3 className="text-3xl font-bold">04:12</h3>
                                <div className="flex gap-2 mt-3">
                                    <button className="bg-white/20 hover:bg-white/30 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors">Break</button>
                                    <button className="bg-white text-indigo-600 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors">Out</button>
                                </div>
                            </div>
                        }
                        icon={<Clock className="h-4 w-4 text-indigo-500" />}
                    />

                    {/* Item 2: Quick Actions */}
                    <BentoGridItem
                        title="Quick Actions"
                        description="Common tasks"
                        header={
                            <div className="grid grid-cols-2 gap-3 h-full content-center">
                                <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl flex flex-col items-center justify-center transition-colors group">
                                    <Calendar className="w-6 h-6 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-blue-700">Leave</span>
                                </button>
                                <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-xl flex flex-col items-center justify-center transition-colors group">
                                    <Clock className="w-6 h-6 text-orange-500 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-orange-700">Fix Punch</span>
                                </button>
                            </div>
                        }
                        icon={<MapPin className="h-4 w-4 text-blue-500" />}
                    />

                    {/* Item 3: Announcements - Wide */}
                    <BentoGridItem
                        title="Announcements"
                        description="Latest updates from HR & IT"
                        colSpan={2}
                        header={
                            <div className="space-y-3 h-full overflow-y-auto pr-2">
                                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">HR Action Required</span>
                                        <span className="text-[10px] text-gray-400">2h ago</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-800">Open Enrollment Ending Soon</h4>
                                    <p className="text-xs text-gray-500 mt-1">Final reminder to add dependents to your health policy before Friday.</p>
                                </div>
                                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">IT Update</span>
                                        <span className="text-[10px] text-gray-400">5h ago</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-800">Scheduled Maintenance</h4>
                                    <p className="text-xs text-gray-500 mt-1">ERP system downtime this Saturday (10 PM - 2 AM).</p>
                                </div>
                            </div>
                        }
                        icon={<Megaphone className="h-4 w-4 text-red-500" />}
                    />

                    {/* Item 4: Celebrations */}
                    <BentoGridItem
                        title="Celebrations"
                        description="Birthdays & Work Anniversaries"
                        header={
                            <div className="flex items-center gap-4 bg-pink-50/50 p-4 rounded-xl border border-pink-100 h-full">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-xl">🎂</div>
                                <div>
                                    <p className="font-bold text-gray-800">John Smith</p>
                                    <p className="text-xs text-pink-600 font-medium">Birthday Today!</p>
                                    <button className="mt-2 text-xs bg-white border border-pink-200 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-50 font-bold shadow-sm">
                                        Send Wish
                                    </button>
                                </div>
                            </div>
                        }
                        icon={<Gift className="h-4 w-4 text-pink-500" />}
                    />

                    {/* Item 5: Holidays */}
                    <BentoGridItem
                        title="Next Holiday"
                        description="Christmas"
                        header={
                            <div className="h-full flex flex-col items-center justify-center bg-green-50/50 rounded-xl border border-green-100 p-4 text-center">
                                <div className="text-2xl mb-1">🎄</div>
                                <h4 className="text-lg font-bold text-green-900">Christmas Day</h4>
                                <p className="text-xs text-green-700 font-medium">Mon, Dec 25</p>
                                <span className="mt-2 text-[10px] bg-white text-green-800 px-2 py-0.5 rounded border border-green-200 shadow-sm">Long Weekend!</span>
                            </div>
                        }
                        icon={<Calendar className="h-4 w-4 text-green-500" />}
                    />

                </BentoGrid>
            )}

            {showStory && (
                <StoryMode
                    stories={weeklyRecapStories}
                    onClose={() => setShowStory(false)}
                />
            )}

            <ConfettiFX isExploding={showConfetti} count={60} />
        </div>
    );
}
