import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, Calendar, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export function MobileNav() {
    const location = useLocation();

    const tabs = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'People', href: '/employees', icon: Users },
        { name: 'Jobs', href: '/recruitment/jobs', icon: Briefcase },
        { name: 'Calendar', href: '/attendance/ShiftRosterManager', icon: Calendar },
        { name: 'More', href: '/menu', icon: Menu }, // Placeholder for expanding menu
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
            <div className="flex justify-around items-center p-2">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            to={tab.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16",
                                isActive
                                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <tab.icon className={cn("w-5 h-5 mb-1", isActive && "fill-current")} />
                            <span className="text-[10px] font-medium">{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
