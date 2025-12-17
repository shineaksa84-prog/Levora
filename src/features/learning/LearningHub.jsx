import { useState, useEffect } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Award, TrendingUp } from 'lucide-react';
import { getCourses, getEmployeeEnrollments, enrollInCourse } from '../../lib/services/learningService';

export default function LearningHub() {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [activeTab, setActiveTab] = useState('browse'); // browse, my-learning
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [coursesData, enrollmentsData] = await Promise.all([
                getCourses(),
                getEmployeeEnrollments('current_user')
            ]);
            setCourses(coursesData);
            setEnrollments(enrollmentsData);
        } catch (error) {
            console.error('Error loading learning data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse('current_user', courseId);
            loadData(); // Reload data
        } catch (error) {
            console.error('Error enrolling:', error);
        }
    };

    const isEnrolled = (courseId) => {
        return enrollments.some(e => e.courseId === courseId);
    };

    if (loading) {
        return <div className="p-6">Loading courses...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Learning & Development</h1>
                <p className="text-muted-foreground mt-1">Grow your skills and advance your career</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                            <p className="text-3xl font-bold text-foreground mt-1">{enrollments.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">
                                {enrollments.filter(e => e.status === 'completed').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                            <p className="text-3xl font-bold text-yellow-600 mt-1">
                                {enrollments.filter(e => e.status === 'in-progress').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Certificates</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                                {enrollments.filter(e => e.certificateUrl).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
                {['browse', 'my-learning'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab === 'browse' ? 'Browse Courses' : 'My Learning'}
                    </button>
                ))}
            </div>

            {/* Browse Courses Tab */}
            {activeTab === 'browse' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-primary" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                        {course.level}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        {course.rating} ⭐
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {course.skills.slice(0, 3).map((skill, idx) => (
                                        <span key={idx} className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {isEnrolled(course.id) ? (
                                    <button className="w-full py-2 rounded-lg bg-green-100 text-green-600 font-medium flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Enrolled
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEnroll(course.id)}
                                        className="w-full py-2 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* My Learning Tab */}
            {activeTab === 'my-learning' && (
                <div className="space-y-4">
                    {enrollments.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No courses enrolled yet. Browse courses to get started!</p>
                        </div>
                    ) : (
                        enrollments.map(enrollment => (
                            <div key={enrollment.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-1">{enrollment.courseTitle}</h3>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${enrollment.status === 'completed'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {enrollment.status}
                                            </span>
                                            <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                                            {enrollment.dueDate && (
                                                <span>Due: {new Date(enrollment.dueDate).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </div>
                                    {enrollment.status === 'completed' && enrollment.certificateUrl && (
                                        <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors flex items-center gap-2">
                                            <Award className="w-4 h-4" />
                                            Certificate
                                        </button>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">Progress</span>
                                        <span className="text-sm font-bold text-primary">{enrollment.progress}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                                        <div
                                            className="gradient-primary h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${enrollment.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {enrollment.status === 'in-progress' && (
                                    <button className="px-4 py-2 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Continue Learning
                                    </button>
                                )}

                                {enrollment.status === 'completed' && enrollment.score && (
                                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-green-800">
                                            <span className="font-semibold">Score:</span> {enrollment.score}% •
                                            Completed on {new Date(enrollment.completedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
