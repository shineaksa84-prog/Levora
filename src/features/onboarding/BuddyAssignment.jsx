import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Star, MessageCircle, Calendar } from 'lucide-react';
import { getAvailableBuddies, assignBuddy } from '../../lib/services/onboardingService';

export default function BuddyAssignment() {
    const [buddies, setBuddies] = useState([]);
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(true);
    const [assignedBuddy, setAssignedBuddy] = useState(null);

    useEffect(() => {
        loadBuddies();
    }, [department]);

    const loadBuddies = async () => {
        setLoading(true);
        const data = await getAvailableBuddies(department);
        setBuddies(data);
        setLoading(false);
    };

    const handleAssign = async (buddy) => {
        try {
            await assignBuddy(buddy.id, 'emp1'); // Mock new hire ID
            setAssignedBuddy(buddy);
        } catch (error) {
            console.error('Buddy assignment failed', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Selection Area */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Buddy & Mentor Assignment
                            </h2>
                            <p className="text-muted-foreground text-sm">Pair new hires with experienced team members</p>
                        </div>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        >
                            <option value="">All Departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Product">Product</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {buddies.map(buddy => (
                            <motion.div
                                key={buddy.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleAssign(buddy)}
                                className={`cursor-pointer p-4 rounded-xl border transition-all ${assignedBuddy?.id === buddy.id
                                        ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                        : 'bg-card border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {buddy.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-foreground">{buddy.name}</h3>
                                        <div className="text-sm text-muted-foreground">{buddy.role}</div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {buddy.expertise.map(exp => (
                                                <span key={exp} className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-medium text-muted-foreground">
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {assignedBuddy?.id === buddy.id && (
                                        <div className="bg-primary text-white p-1 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Assigned Profile Preview */}
                <div className="w-full md:w-80">
                    {assignedBuddy ? (
                        <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 rounded-xl p-6 text-center space-y-4">
                            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20">
                                {assignedBuddy.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{assignedBuddy.name}</h3>
                                <p className="text-primary font-medium text-sm">{assignedBuddy.role}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-primary/10">
                                <div className="text-center">
                                    <div className="font-bold text-lg">4.9</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Rating</div>
                                </div>
                                <div className="text-center border-x border-primary/10">
                                    <div className="font-bold text-lg">12</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Mentees</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-lg">3yr</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Tenure</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90">
                                    <MessageCircle className="w-4 h-4" />
                                    Send Intro Email
                                </button>
                                <button className="w-full py-2 bg-white text-primary border border-primary/20 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/5">
                                    <Calendar className="w-4 h-4" />
                                    Schedule 1:1
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                            <UserPlus className="w-12 h-12 mb-4 opacity-50" />
                            <p>Select a mentor from the list to assign them to the new hire.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Check({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    )
}
