import { useState, useEffect } from 'react';
import {
    CheckSquare,
    Clock,
    AlertCircle,
    CheckCircle,
    User,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { generateOnboardingTasks, getOnboardingProgress } from '../../lib/services/onboardingAutomation';

export default function OnboardingDashboard({ employeeId }) {
    const [tasks, setTasks] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching employee and generating tasks
        const fetchEmployeeData = () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                // Mock employee data
                const mockEmployee = {
                    id: employeeId || 'emp1',
                    name: 'Sarah Wilson',
                    position: 'Senior Software Engineer',
                    department: 'Engineering',
                    startDate: '2024-01-15'
                };
                setEmployee(mockEmployee);

                // Generate tasks
                const generatedTasks = generateOnboardingTasks(mockEmployee);
                setTasks(generatedTasks);
                setLoading(false);
            }, 800);
        };

        fetchEmployeeData();
    }, [employeeId]);

    const toggleTaskStatus = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
                : task
        ));
    };

    const progress = getOnboardingProgress(tasks);

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading onboarding plan...</div>;
    }

    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Onboarding Plan: {employee.name}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {employee.position} • {employee.department}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{progress}%</div>
                        <div className="text-xs text-muted-foreground">Completion</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Tasks List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
                    <div key={category} className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-4 py-3 bg-muted/30 border-b border-border font-medium flex items-center justify-between">
                            <span>{category} Tasks</span>
                            <span className="text-xs bg-background px-2 py-1 rounded-full border border-border">
                                {categoryTasks.filter(t => t.status === 'Completed').length}/{categoryTasks.length}
                            </span>
                        </div>
                        <div className="divide-y divide-border">
                            {categoryTasks.map(task => (
                                <div
                                    key={task.id}
                                    className={`p-4 flex items-start gap-3 hover:bg-muted/10 transition-colors ${task.status === 'Completed' ? 'opacity-60' : ''
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleTaskStatus(task.id)}
                                        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.status === 'Completed'
                                                ? 'bg-primary border-primary text-primary-foreground'
                                                : 'border-muted-foreground hover:border-primary'
                                            }`}
                                    >
                                        {task.status === 'Completed' && <CheckCircle className="w-3.5 h-3.5" />}
                                    </button>

                                    <div className="flex-1">
                                        <div className={`font-medium text-sm ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''
                                            }`}>
                                            {task.title}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                            <span className={`px-1.5 py-0.5 rounded flex items-center gap-1 ${task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                    task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                <AlertCircle className="w-3 h-3" />
                                                {task.priority}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {task.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Due: {task.dueDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
