import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Shield,
    Zap,
    Users,
    Menu,
    X,
    Layout,
    Clock,
    BarChart3,
    TrendingUp,
    FileText
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogin = () => navigate('/login');
    const handleSignup = () => navigate('/signup');
    const handleGoToApp = () => navigate('/app');

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <img src="/levora-logo.jpg" alt="Levora" className="h-10 w-auto rounded-lg" />
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                            <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Solutions</a>
                            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
                            {user ? (
                                <button onClick={handleGoToApp} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/10 flex items-center gap-2">
                                    <Layout className="w-4 h-4" /> Go to Dashboard
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleLogin} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Log in</button>
                                    <button onClick={handleSignup} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-indigo-500/10">
                                        Start Free
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 overflow-hidden"
                        >
                            <a href="#features" className="block text-sm font-medium text-slate-600">Features</a>
                            <a href="#solutions" className="block text-sm font-medium text-slate-600">Solutions</a>
                            <a href="#pricing" className="block text-sm font-medium text-slate-600">Pricing</a>
                            {user ? (
                                <button onClick={handleGoToApp} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Go to Dashboard</button>
                            ) : (
                                <>
                                    <button onClick={handleLogin} className="block w-full text-left text-sm font-medium text-slate-600">Log in</button>
                                    <button onClick={handleSignup} className="block w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Start Free</button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 font-display leading-[1.1]">
                        The heart of your <br className="hidden md:block" />
                        <span className="text-indigo-600">organization.</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Levora is a modern HR platform that brings hiring, people management, payroll, performance, and compliance into one calm, connected system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        {user ? (
                            <button onClick={handleGoToApp} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                                Go to Dashboard <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <>
                                <button onClick={handleSignup} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                                    Get started free <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="bg-white text-slate-700 px-8 py-3.5 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center gap-2">
                                    Book a demo
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> Secure by design</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Setup in minutes</span>
                    </div>
                </motion.div>
            </section>

            {/* Why Levora Exists */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Work has become complicated.<br />Managing people shouldn’t be.</h2>
                        <p className="text-lg text-slate-600">
                            Most HR teams are stuck juggling spreadsheets and disconnected tools. Levora brings everything back to the center with a modern cloud intelligence layer.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-red-50/50 p-8 rounded-2xl border border-red-100"
                        >
                            <h3 className="text-lg font-black text-red-700 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Before Levora
                            </h3>
                            <ul className="space-y-4">
                                {['Scattered employee data', 'Manual payroll corrections', 'Approval delays', 'Compliance anxiety', 'Frustrated teams'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                        <X className="w-5 h-5 text-red-400 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100 shadow-2xl shadow-indigo-500/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <h3 className="text-lg font-black text-indigo-700 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> After Levora
                            </h3>
                            <ul className="space-y-4">
                                {['Centralized, accurate records', 'Reliable payroll, on time', 'Clear workflows', 'Compliance confidence', 'Happier, more focused teams'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-800 font-bold text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Everything HR needs — thoughtfully connected.</h2>
                    </div>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: 'Employee Lifecycle', icon: Users, desc: 'From onboarding to exit, every detail stays organized and accessible.' },
                            { title: 'Attendance & Leave', icon: Clock, desc: 'Real-time tracking, flexible policies, and smooth approvals.' },
                            { title: 'Payroll & Compliance', icon: Shield, desc: 'Accurate payroll with built-in statutory compliance.' },
                            { title: 'Performance & Reviews', icon: TrendingUp, desc: 'Set goals, give feedback, and support growth.' },
                            { title: 'Reports & Insights', icon: BarChart3, desc: 'Understand your workforce with clear, actionable data.' },
                            { title: 'Security & Access', icon: Shield, desc: 'Enterprise-grade protection with role-based permissions.' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-900/5"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-black text-slate-900">{feature.title}</h3>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-900"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">It’s time HR felt simpler.</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                            <button onClick={handleSignup} className="bg-white text-slate-900 px-10 py-4 rounded-2xl text-lg font-black hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                                Start free
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-2xl text-lg font-black hover:bg-white/20 transition-all border border-white/20">
                                Talk to experts
                            </button>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest text-white/40">No credit card required • Setup in minutes</p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img src="/levora-logo.jpg" alt="Levora" className="h-8 w-auto rounded" />
                        <span className="font-black text-slate-900 tracking-tight">Levora AI</span>
                    </div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        © 2025 Levora. Built for humans.
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
