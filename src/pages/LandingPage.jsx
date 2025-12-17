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

export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogin = () => navigate('/login');

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
                            <button onClick={handleLogin} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Log in</button>
                            <button onClick={handleLogin} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-indigo-500/10">
                                Start Free
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
                        <a href="#features" className="block text-sm font-medium text-slate-600">Features</a>
                        <a href="#solutions" className="block text-sm font-medium text-slate-600">Solutions</a>
                        <a href="#pricing" className="block text-sm font-medium text-slate-600">Pricing</a>
                        <button onClick={handleLogin} className="block w-full text-left text-sm font-medium text-slate-600">Log in</button>
                        <button onClick={handleLogin} className="block w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Start Free</button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 font-display">
                        The heart of your <br className="hidden md:block" />
                        <span className="text-indigo-600">organization.</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Levora is a modern HR platform that brings hiring, people management, payroll, performance, and compliance into one calm, connected system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button onClick={handleLogin} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                            Get started free <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="bg-white text-slate-700 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center gap-2">
                            Book a 15-minute demo
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> Secure by design</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Setup in minutes</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-blue-500" /> Built to scale</span>
                    </div>
                </div>
            </section>

            {/* Why Levora Exists */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Work has become complicated.<br />Managing people shouldn’t be.</h2>
                        <p className="text-lg text-slate-600">
                            Most HR teams are stuck juggling spreadsheets, disconnected tools, approvals, payroll stress, and compliance risks.
                            Important work gets buried. <strong>Levora</strong> brings everything back to the center.
                        </p>
                    </div>

                    {/* Comparison */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                            <h3 className="text-lg font-bold text-red-700 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Before Levora
                            </h3>
                            <ul className="space-y-4">
                                {['Scattered employee data', 'Manual payroll corrections', 'Approval delays', 'Compliance anxiety', 'Frustrated teams'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <X className="w-5 h-5 text-red-400 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <h3 className="text-lg font-bold text-indigo-700 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> After Levora
                            </h3>
                            <ul className="space-y-4">
                                {['Centralized, accurate records', 'Reliable payroll, on time', 'Clear workflows', 'Compliance confidence', 'Happier, more focused teams'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section id="solutions" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Built for everyone who keeps work moving.</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'HR Teams', icon: Users, desc: 'Automate operations, reduce errors, and stay compliant — without constant firefighting.' },
                            { title: 'Recruiters', icon: Users, desc: 'Track candidates, collaborate smoothly, and make confident hiring decisions.' },
                            { title: 'Founders & Ops', icon: TrendingUp, desc: 'Get clear visibility into headcount, costs, and team performance.' },
                            { title: 'Employees', icon: Zap, desc: 'Access payslips, leaves, documents, and updates — without chasing HR.' }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything HR needs — thoughtfully connected.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Employee Lifecycle', icon: Users, desc: 'From onboarding to exit, every detail stays organized and accessible.' },
                            { title: 'Attendance & Leave', icon: Clock, desc: 'Real-time tracking, flexible policies, and smooth approvals.' },
                            { title: 'Payroll & Compliance', icon: Shield, desc: 'Accurate payroll with built-in statutory compliance.' },
                            { title: 'Performance & Reviews', icon: TrendingUp, desc: 'Set goals, give feedback, and support growth.' },
                            { title: 'Reports & Insights', icon: BarChart3, desc: 'Understand your workforce with clear, actionable data.' },
                            { title: 'Security & Access', icon: Shield, desc: 'Enterprise-grade protection with role-based permissions.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">{feature.title}</h3>
                                </div>
                                <p className="text-slate-600 text-sm ml-11">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Employee Experience */}
            <section className="py-24 bg-indigo-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-indigo-800"></div>
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">HR software your employees actually enjoy using.</h2>
                    <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-10">
                        Levora gives employees self-service access to what they need — payslips, leave balances, documents, and profiles — so HR teams get fewer interruptions and employees get more clarity.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium border border-white/20">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Employee Self-Service Portal Included
                    </div>
                </div>
            </section>

            {/* Scale & Integrations */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Designed to grow with you.</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-10">
                        Whether you’re a team of 10 or 10,000, Levora scales effortlessly and integrates with payroll tools, accounting systems, biometric devices, and more.
                    </p>
                    <div className="flex justify-center gap-8 grayscale opacity-60">
                        {/* Placeholder logos for integrations */}
                        <div className="text-xl font-bold text-slate-400">QuickBooks</div>
                        <div className="text-xl font-bold text-slate-400">Slack</div>
                        <div className="text-xl font-bold text-slate-400">Google Workspace</div>
                        <div className="text-xl font-bold text-slate-400">Zoom</div>
                    </div>
                </div>
            </section>

            {/* Pricing Teaser */}
            <section id="pricing" className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple pricing. No surprises.</h2>
                    <p className="text-slate-600 mb-10">Plans designed for startups, growing teams, and large organizations.</p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-8 rounded-2xl border border-slate-200 bg-white">
                            <h3 className="font-bold text-lg mb-2">Starter</h3>
                            <p className="text-slate-500 text-sm mb-4">For small teams getting started</p>
                            <div className="text-3xl font-bold text-slate-900 mb-6">Free</div>
                            <button onClick={handleLogin} className="w-full py-2 rounded-lg border border-slate-200 font-medium hover:bg-slate-50">Get started</button>
                        </div>
                        <div className="p-8 rounded-2xl border-2 border-indigo-600 bg-indigo-50/10 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
                            <h3 className="font-bold text-lg mb-2 text-indigo-700">Growth</h3>
                            <p className="text-slate-500 text-sm mb-4">For scaling organizations</p>
                            <div className="text-3xl font-bold text-slate-900 mb-6">$4<span className="text-base font-normal text-slate-500">/user</span></div>
                            <button onClick={handleLogin} className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200">Start free trial</button>
                        </div>
                        <div className="p-8 rounded-2xl border border-slate-200 bg-white">
                            <h3 className="font-bold text-lg mb-2">Enterprise</h3>
                            <p className="text-slate-500 text-sm mb-4">For complex organizations</p>
                            <div className="text-3xl font-bold text-slate-900 mb-6">Custom</div>
                            <button className="w-full py-2 rounded-lg border border-slate-200 font-medium hover:bg-slate-50">Talk to sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-slate-50 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">It’s time HR felt simpler.</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button onClick={handleLogin} className="bg-slate-900 text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Start free
                        </button>
                        <button className="bg-white text-slate-700 px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
                            Talk to our team
                        </button>
                    </div>
                    <p className="text-sm text-slate-500">No credit card required • Cancel anytime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/levora-logo.jpg" alt="Levora" className="h-8 w-auto rounded" />
                    </div>
                    <div className="text-slate-500 text-sm">
                        © 2025 Levora. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-slate-900">Privacy</a>
                        <a href="#" className="hover:text-slate-900">Terms</a>
                        <a href="#" className="hover:text-slate-900">Security</a>
                        <a href="#" className="hover:text-slate-900">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
