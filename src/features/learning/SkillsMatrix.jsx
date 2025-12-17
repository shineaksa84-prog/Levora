import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Award, Target } from 'lucide-react';
import { getEmployeeSkills, getAllSkills, updateSkillProficiency } from '../../lib/services/learningService';

export default function SkillsMatrix() {
    const [employeeSkills, setEmployeeSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        setLoading(true);
        try {
            const [empSkills, skills] = await Promise.all([
                getEmployeeSkills('current_user'),
                getAllSkills()
            ]);
            setEmployeeSkills(empSkills);
            setAllSkills(skills);
        } catch (error) {
            console.error('Error loading skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const getProficiencyLabel = (level) => {
        const labels = {
            1: 'Beginner',
            2: 'Basic',
            3: 'Intermediate',
            4: 'Advanced',
            5: 'Expert'
        };
        return labels[level] || 'Unknown';
    };

    const getProficiencyColor = (level) => {
        const colors = {
            1: 'bg-red-500',
            2: 'bg-orange-500',
            3: 'bg-yellow-500',
            4: 'bg-blue-500',
            5: 'bg-green-500'
        };
        return colors[level] || 'bg-gray-500';
    };

    const categories = ['all', ...new Set(allSkills.map(s => s.category))];

    const filteredSkills = selectedCategory === 'all'
        ? employeeSkills
        : employeeSkills.filter(es => {
            const skill = allSkills.find(s => s.id === es.skillId);
            return skill?.category === selectedCategory;
        });

    if (loading) {
        return <div className="p-6">Loading skills...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Skills Matrix</h1>
                <p className="text-muted-foreground mt-1">Track and develop your professional skills</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Skills</p>
                            <p className="text-3xl font-bold text-foreground mt-1">{employeeSkills.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Expert Level</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">
                                {employeeSkills.filter(s => s.proficiency === 5).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Avg Proficiency</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                {(employeeSkills.reduce((acc, s) => acc + s.proficiency, 0) / employeeSkills.length).toFixed(1)}
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
                            <p className="text-sm text-muted-foreground">Endorsements</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                {employeeSkills.reduce((acc, s) => acc + s.endorsements, 0)}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSkills.map(skill => (
                    <div key={skill.skillId} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1">{skill.skillName}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Endorsements</p>
                                <p className="text-2xl font-bold text-primary">{skill.endorsements}</p>
                            </div>
                        </div>

                        {/* Proficiency Level */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">Proficiency</span>
                                <span className="text-sm font-bold text-primary">
                                    {getProficiencyLabel(skill.proficiency)}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(level => (
                                    <div
                                        key={level}
                                        className={`flex-1 h-2 rounded-full ${level <= skill.proficiency
                                                ? getProficiencyColor(skill.proficiency)
                                                : 'bg-muted'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors text-sm">
                                Update Level
                            </button>
                            <button className="flex-1 px-3 py-2 rounded-lg bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors text-sm">
                                Find Courses
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skill Gap Analysis */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Skill Gap Analysis</h3>
                <p className="text-muted-foreground mb-4">
                    Based on your current role and career goals, we recommend developing these skills:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg p-4">
                        <p className="font-medium text-foreground mb-1">Predictive Analytics</p>
                        <p className="text-sm text-muted-foreground mb-2">Gap: 4 levels</p>
                        <button className="text-sm text-primary font-medium hover:underline">View Courses →</button>
                    </div>
                    <div className="bg-card rounded-lg p-4">
                        <p className="font-medium text-foreground mb-1">Strategic Planning</p>
                        <p className="text-sm text-muted-foreground mb-2">Gap: 4 levels</p>
                        <button className="text-sm text-primary font-medium hover:underline">View Courses →</button>
                    </div>
                    <div className="bg-card rounded-lg p-4">
                        <p className="font-medium text-foreground mb-1">Advanced Leadership</p>
                        <p className="text-sm text-muted-foreground mb-2">Gap: 2 levels</p>
                        <button className="text-sm text-primary font-medium hover:underline">View Courses →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
