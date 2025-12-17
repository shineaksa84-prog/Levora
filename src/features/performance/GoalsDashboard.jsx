import { useState, useEffect } from 'react';
import { Target, TrendingUp, Calendar, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { getEmployeeGoals, updateGoalProgress } from '../../lib/services/performanceService';

export default function GoalsDashboard() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, completed

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        setLoading(true);
        try {
            const data = await getEmployeeGoals('current_user');
            setGoals(data);
        } catch (error) {
            console.error('Error loading goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'on-track': 'text-green-600 bg-green-50',
            'at-risk': 'text-yellow-600 bg-yellow-50',
            'off-track': 'text-red-600 bg-red-50',
            'completed': 'text-blue-600 bg-blue-50'
        };
        return colors[status] || 'text-gray-600 bg-gray-50';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': 'text-red-600 bg-red-50',
            'medium': 'text-yellow-600 bg-yellow-50',
            'low': 'text-blue-600 bg-blue-50'
        };
        return colors[priority] || 'text-gray-600 bg-gray-50';
    };

    const filteredGoals = goals.filter(goal => {
        if (filter === 'all') return true;
        if (filter === 'active') return goal.status !== 'completed';
        if (filter === 'completed') return goal.status === 'completed';
        return true;
    });

    if (loading) {
        return <div className="p-6">Loading goals...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Goals & Objectives</h1>
                    <p className="text-muted-foreground mt-1">Track and manage your performance goals</p>
                </div>
                <button className="gradient-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                    <Plus className="w-5 h-5" />
                    New Goal
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Goals</p>
                            <p className="text-3xl font-bold text-foreground mt-1">{goals.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">On Track</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">
                                {goals.filter(g => g.status === 'on-track').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Avg Progress</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">At Risk</p>
                            <p className="text-3xl font-bold text-yellow-600 mt-1">
                                {goals.filter(g => g.status === 'at-risk').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {['all', 'active', 'completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === f
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Goals List */}
            <div className="space-y-4">
                {filteredGoals.map(goal => (
                    <div key={goal.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                                        {goal.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                                        {goal.priority}
                                    </span>
                                </div>
                                {goal.type === 'OKR' && (
                                    <p className="text-sm text-muted-foreground mb-3">{goal.objective}</p>
                                )}
                                {goal.type === 'SMART' && (
                                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Due Date</p>
                                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(goal.dueDate || goal.timeBound).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">Progress</span>
                                <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="gradient-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Key Results (for OKR) */}
                        {goal.type === 'OKR' && goal.keyResults && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">Key Results:</p>
                                {goal.keyResults.map(kr => (
                                    <div key={kr.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <span className="text-sm text-foreground">{kr.description}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {kr.current} / {kr.target} {kr.unit}
                                            </span>
                                            <div className="w-24 bg-background rounded-full h-1.5">
                                                <div
                                                    className="bg-primary h-1.5 rounded-full"
                                                    style={{ width: `${(kr.current / kr.target) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SMART Criteria (for SMART goals) */}
                        {goal.type === 'SMART' && (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                                <div className="p-2 bg-muted rounded">
                                    <p className="font-medium text-foreground">Specific</p>
                                    <p className="text-muted-foreground">{goal.specific}</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <p className="font-medium text-foreground">Measurable</p>
                                    <p className="text-muted-foreground">{goal.measurable}</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <p className="font-medium text-foreground">Achievable</p>
                                    <p className="text-muted-foreground">{goal.achievable}</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <p className="font-medium text-foreground">Relevant</p>
                                    <p className="text-muted-foreground">{goal.relevant}</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                    <p className="font-medium text-foreground">Time-Bound</p>
                                    <p className="text-muted-foreground">{new Date(goal.timeBound).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
