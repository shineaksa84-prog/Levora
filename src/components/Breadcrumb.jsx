import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels = {
    '': 'Dashboard',
    'app': 'Dashboard', // Map 'app' to Dashboard
    'candidates': 'Candidates',
    'employees': 'Employees',
    'jobs': 'Jobs',
    'analytics': 'Analytics',
    'performance': 'Performance',
    'learning': 'Learning & Development',
    'compensation': 'Compensation & Benefits',
    'engagement': 'Employee Engagement',
    'offboarding': 'Offboarding',
    'automation': 'Automation'
};

export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    if (pathnames.length === 0) {
        return null; // Don't show breadcrumb on home page
    }

    const breadcrumbs = [
        { label: 'Home', path: '/app', icon: Home } // Point to /app
    ];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
        // Skip 'app' root segment to avoid duplicate Home/Dashboard link
        if (segment === 'app' && index === 0) return;

        currentPath += `/${segment}`;

        // Check if it's a dynamic ID (numeric or UUID-like)
        const isId = /^[0-9a-f-]+$/i.test(segment);

        if (!isId) {
            breadcrumbs.push({
                label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
                path: currentPath
            });
        } else if (index > 0) {
            // For IDs, use the previous segment to determine the label
            const previousSegment = pathnames[index - 1];
            const entityType = previousSegment.charAt(0).toUpperCase() + previousSegment.slice(1, -1); // Remove 's' from plural
            breadcrumbs.push({
                label: `${entityType} Details`,
                path: currentPath
            });
        }
    });

    return (
        <nav className="flex items-center gap-2 text-sm mb-6">
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const Icon = crumb.icon;

                return (
                    <div key={crumb.path} className="flex items-center gap-2">
                        {index === 0 && Icon ? (
                            <Link
                                to={crumb.path}
                                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                                <span>{crumb.label}</span>
                            </Link>
                        ) : isLast ? (
                            <span className="text-foreground font-medium">{crumb.label}</span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {crumb.label}
                            </Link>
                        )}

                        {!isLast && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
