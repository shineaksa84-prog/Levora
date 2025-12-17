import { useState } from 'react';
import {
    CheckSquare,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

export default function OffboardingChecklist({ checklist, onTaskUpdate }) {
    const [expandedCategories, setExpandedCategories] = useState(['HR', 'IT', 'Manager']);

    const toggleCategory = (category) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleTaskStatusChange = (taskId, newStatus) => {
        onTaskUpdate(checklist.id, taskId, newStatus);
    };

    const tasksByCategory = checklist.tasks.reduce((acc, task) => {
        if (!acc[task.category]) {
            acc[task.category] = [];
        }
        acc[task.category].push(task);
        return acc;
    }, {});

    const getCategoryProgress = (category) => {
        const tasks = tasksByCategory[category];
        const completed = tasks.filter(t => t.status === 'completed').length;
        return { completed, total: tasks.length, percentage: (completed / tasks.length) * 100 };
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckSquare className="w-5 h-5 text-green-500" />;
            case 'in-progress':
                return <Clock className="w-5 h-5 text-blue-500" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-gray-400" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">{checklist.employee} - Offboarding Checklist</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Last working day: {checklist.lastDay}
                        </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${checklist.status === 'Completed'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                        {checklist.status}
                    </div>
                </div>

                <div className="space-y-3">
                    {Object.keys(tasksByCategory).map((category) => {
                        const progress = getCategoryProgress(category);
                        const isExpanded = expandedCategories.includes(category);

                        return (
                            <div key={category} className="border border-border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        )}
                                        <div className="text-left">
                                            <h3 className="font-semibold">{category}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {progress.completed} of {progress.total} tasks completed
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-300"
                                                style={{ width: `${progress.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium w-12 text-right">
                                            {Math.round(progress.percentage)}%
                                        </span>
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="border-t border-border bg-muted/20">
                                        {tasksByCategory[category].map((task) => (
                                            <div
                                                key={task.id}
                                                className="p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-0.5">
                                                        {getStatusIcon(task.status)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <h4 className="font-medium">{task.title}</h4>
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    {task.description}
                                                                </p>
                                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                                    <span>Assigned to: {task.assignedTo}</span>
                                                                    <span>Due: {task.deadline}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                                    {task.priority}
                                                                </span>
                                                                <select
                                                                    value={task.status}
                                                                    onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                                                                    className="px-2 py-1 bg-background border border-border rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="in-progress">In Progress</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
