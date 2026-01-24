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
    Lock,
    DollarSign
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
        <div className="font-sans text-slate-900 bg-[#0A0A0A] min-h-screen selection:bg-accent/20 selection:text-accent">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5 p-1 border border-white/10 flex items-center justify-center">
                                <img src="/levora-logo.jpg" alt="Levora" className="h-8 w-auto rounded-lg" />
                            </div>
                            <span className="text-white font-black tracking-tighter text-xl">Levora <span className="text-accent italic">AI</span></span>
                        </div>

                        <div className="hidden md:flex items-center space-x-10">
                            <a onClick={() => navigate('/intelligence')} className="cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">Intelligence</a>
                            <a onClick={() => navigate('/orchestration')} className="cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">Orchestration</a>
                            <a href="#pricing" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">Pricing</a>
                            {user ? (
                                <button onClick={handleGoToApp} className="bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all border border-white/10 flex items-center gap-2">
                                    <Layout className="w-4 h-4" /> Go to Control Center
                                </button>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <button onClick={handleLogin} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</button>
                                    <button onClick={handleSignup} className="bg-accent text-accent-foreground px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent/20">
                                        Initiate Setup
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-400">
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                        <Zap className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">The Sovereign Interface</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 font-display leading-[0.9]">
                        Architecting <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-white italic">Organizational Equilibrium.</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Levora is the high-fidelity intelligence layer for elite enterprises. A unified ecosystem designed to orchestrate talent, automate complexity, and synthesize operational excellence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        {user ? (
                            <button onClick={handleGoToApp} className="bg-primary text-white px-10 py-4 rounded-2xl text-lg font-black hover:bg-primary/80 transition-all border border-white/10 flex items-center gap-3 active:scale-95 shadow-2xl shadow-black">
                                Access Control Center <ArrowRight className="w-5 h-5 text-accent" />
                            </button>
                        ) : (
                            <>
                                <button onClick={handleSignup} className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-black hover:bg-accent hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5 flex items-center gap-3">
                                    Initiate Deployment <ArrowRight className="w-5 h-5" />
                                </button>
                                <button onClick={() => alert("Thank you. A strategist will contact you shortly.")} className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-4 rounded-2xl text-lg font-black hover:bg-white/10 transition-all active:scale-95">
                                    Request Strategic Briefing
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Sovereign Security</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                        <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-accent" /> Immutable Ledger</span>
                    </div>
                </motion.div>
            </section>

            {/* Dimensional Perspective */}
            <section className="py-32 bg-white relative overflow-hidden rounded-[4rem] mx-4 md:mx-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">Work evolved. <br />Managing it didn’t. <span className="text-accent italic text-3xl">Until now.</span></h2>
                        <p className="text-xl text-slate-500 font-medium">
                            Fragmented systems create operational friction. Levora resolves this through a sophisticated intelligence layer that harmonizes every human capital touchpoint.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100"
                        >
                            <h3 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-[0.3em]">The Legacy Paradigm</h3>
                            <ul className="space-y-6">
                                {['Fragmented Talent Data', 'Manual Financial Reconciliations', 'Decision Inertia', 'Regulatory Anxiety', 'Institutional Stagnation'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-500 text-sm font-bold">
                                        <X className="w-5 h-5 text-red-300 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0A0A0A] p-12 rounded-[3rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                            <h3 className="text-xs font-black text-accent mb-8 uppercase tracking-[0.3em]">The Levora Standard</h3>
                            <ul className="space-y-6">
                                {['Unified Human Capital Synthesis', 'Precise Financial Orchestration', 'Strategic Momentum', 'Immutable Compliance', 'Elite Performance Vectors'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white font-black text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Intelligence Components */}
            <section id="features" className="py-32 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Capabilities</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Strategic Intelligence <br />Architectures.</h2>
                        </div>
                        <p className="text-slate-400 max-w-md font-medium">Thoughtfully engineered interfaces designed to scale institutional intelligence and operational velocity.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {[
                            { title: 'Talent Lifecycle', icon: Users, desc: 'End-to-end orchestration of the human capital journey, from initial engagement to institutional exit.' },
                            { title: 'Operational Control', icon: Clock, desc: 'Real-time synchronization of attendance vectors and automated leave management protocols.' },
                            { title: 'Fiscal Synthesis', icon: DollarSign, desc: 'High-precision payroll orchestration with integrated statutory compliance safeguards.' },
                            { title: 'Performance Equilibrium', icon: TrendingUp, desc: 'Dynamic goal alignment and multi-dimensional feedback cycles for organizational evolution.' },
                            { title: 'Strategic Analytics', icon: BarChart3, desc: 'Advanced data synthesis providing granular visibility into institutional momentum.' },
                            { title: 'Sovereign Security', icon: Shield, desc: 'Enterprise-grade encryption and role-specific access architectures for data integrity.' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-accent/40 transition-all hover:bg-white/[0.07]"
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="w-14 h-14 bg-white/5 text-accent rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white text-xl mb-3 tracking-tight">{feature.title}</h3>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed leading-[1.6]">{feature.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Final CTA: The Call to Integration */}
            <section className="py-40 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
                <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 rounded-full blur-[150px]"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-accent mb-8 block">Final Interface</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-none">The Future <br /><span className="text-accent italic">is Orchestrated.</span></h2>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                            <button onClick={handleSignup} className="bg-white text-black px-12 py-5 rounded-2xl text-xl font-black hover:bg-accent hover:text-white transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95">
                                Start Deployment
                            </button>
                            <button className="bg-white/5 backdrop-blur-xl text-white px-12 py-5 rounded-2xl text-xl font-black hover:bg-white/10 transition-all border border-white/10">
                                Talk to Architects
                            </button>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">No credit card required • Infinite scalability • Setup in minutes</p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 bg-white rounded-[4rem] mx-4 md:mx-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Investment</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Enterprise Velocity <br />at Scale.</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Core', price: 'Custom', desc: 'For growing organizations seeking operational order.', features: ['Talent Orchestration', 'Payroll Synthesis', 'Basic Analytics'] },
                            { name: 'Sovereign', price: 'Custom', desc: 'For market leaders demanding absolute control.', features: ['Full Suite Access', 'Dedicated Neural Core', 'Sovereign Security', '24/7 Strategic Support'], active: true },
                            { name: 'Global', price: 'Custom', desc: 'For multinational conglomerates.', features: ['Multi-Jurisdiction Compliance', 'Distributed Ledger', 'Global Payroll'] }
                        ].map((plan, i) => (
                            <div key={i} className={`p-10 rounded-[2.5rem] border ${plan.active ? 'bg-[#0A0A0A] text-white border-white/5 shadow-2xl relative overflow-hidden' : 'bg-slate-50 text-slate-900 border-slate-100'}`}>
                                {plan.active && <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>}
                                <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                                <p className={`text-sm font-medium mb-8 ${plan.active ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                                <div className="text-3xl font-black mb-8">{plan.price}</div>
                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm font-bold">
                                            <CheckCircle2 className={`w-4 h-4 ${plan.active ? 'text-accent' : 'text-slate-900'}`} /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${plan.active ? 'bg-accent text-black hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                    Contact Sales
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#0A0A0A] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-8 text-center">
                            <a onClick={() => { navigate('/intelligence'); setMobileMenuOpen(false); }} className="text-2xl font-black text-white hover:text-accent">Intelligence</a>
                            <a onClick={() => { navigate('/orchestration'); setMobileMenuOpen(false); }} className="text-2xl font-black text-white hover:text-accent">Orchestration</a>
                            <a onClick={() => setMobileMenuOpen(false)} href="#pricing" className="text-2xl font-black text-white hover:text-accent">Pricing</a>
                            <div className="h-px bg-white/10 w-full my-4"></div>
                            <button onClick={handleLogin} className="text-xl font-black text-slate-400">Login</button>
                            <button onClick={handleSignup} className="bg-accent text-black py-4 rounded-xl text-xl font-black">Initiate Setup</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            {/* Footer */}
            <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center p-1 border border-white/10">
                            <img src="/levora-logo.jpg" alt="Levora" className="h-6 w-auto rounded" />
                        </div>
                        <span className="font-black text-white tracking-tighter text-lg">Levora <span className="text-accent">AI</span></span>
                    </div>

                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        © 2025 Levora. Architected for humans.
                    </div>

                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <button onClick={() => alert("Privacy Policy: Data is encrypted at rest and in transit.")} className="hover:text-accent transition-colors">Privacy</button>
                        <button onClick={() => alert("Security Protocols: SOC2 Type II Compliant.")} className="hover:text-accent transition-colors">Security</button>
                        <button onClick={() => alert("System Protocols: v24.0.1 Stable")} className="hover:text-accent transition-colors">Protocols</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
