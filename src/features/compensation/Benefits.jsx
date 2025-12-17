import { useState } from 'react';
import {
    Heart,
    Shield,
    Umbrella,
    Briefcase,
    Check,
    ChevronRight,
    Plus
} from 'lucide-react';
import { getEnrolledBenefits, getAvailableBenefits, enrollInBenefit } from '../../lib/services/compensationService';

export default function Benefits() {
    const [enrolledBenefits, setEnrolledBenefits] = useState([]);
    const [availableBenefits, setAvailableBenefits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [enrolled, available] = await Promise.all([
                getEnrolledBenefits('current_user'),
                getAvailableBenefits()
            ]);
            setEnrolledBenefits(enrolled);
            setAvailableBenefits(available);
        } catch (error) {
            console.error('Error loading benefits data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (benefitId) => {
        try {
            await enrollInBenefit('current_user', benefitId);
            // In a real app, we would reload data or update state optimistically
            alert('Enrollment request submitted!');
        } catch (error) {
            console.error('Error enrolling:', error);
        }
    };

    if (loading) {
        return <div className="p-6">Loading benefits data...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Enrolled Benefits */}
            <div>
                <h2 className="text-lg font-semibold mb-4">My Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledBenefits.map((benefit) => {
                        const Icon = benefit.icon || Shield; // Fallback icon
                        return (
                            <div key={benefit.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${benefit.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        {benefit.status}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-lg mb-1">{benefit.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{benefit.provider}</p>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Coverage</span>
                                        <span className="font-medium">{benefit.coverage}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Your Cost</span>
                                        <span className="font-medium">{benefit.cost}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Available Benefits */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Available for Enrollment</h2>
                    <button className="text-primary text-sm font-medium hover:underline">View All Plans</button>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="divide-y divide-border">
                        {availableBenefits.map((benefit) => {
                            const Icon = benefit.icon || Briefcase; // Fallback icon
                            return (
                                <div key={benefit.id} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-muted rounded-xl">
                                            <Icon className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{benefit.name}</h3>
                                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                            <p className="text-xs text-primary mt-1">{benefit.provider}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-foreground">{benefit.cost}</p>
                                            <p className="text-xs text-muted-foreground">Per Month</p>
                                        </div>
                                        <button
                                            onClick={() => handleEnroll(benefit.id)}
                                            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Enroll
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
