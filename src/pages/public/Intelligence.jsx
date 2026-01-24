import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Cpu, Network, Sparkles, Zap, Lock, ArrowRight, Activity, GitBranch, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Intelligence() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Global Navbar Stub/Return */}
            <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-indigo-500/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                            <Brain className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="font-bold text-white tracking-tight">Levora <span className="text-indigo-400 font-black italic">Intelligence</span></span>
                    </Link>
                    <button onClick={() => navigate('/login')} className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">
                        Access Neural Core
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 inset-x-0 h-[600px] bg-indigo-600/10 blur-[120px] -z-10 rounded-b-full"></div>
                <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/20 blur-[100px] -z-10 animate-pulse"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Cognitive Architecture v2.0</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                            Predictive. <br />
                            Adaptive. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-white">Sovereign.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Levora Intelligence isn't just analytics. It's a sentient layer that anticipates retention risks, bias-checks recruitment, and simulates organizational futures.
                        </p>

                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-100 border border-indigo-500/30 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all backdrop-blur-sm group"
                            >
                                <Cpu className="w-5 h-5" /> View Active Models
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NEW: The Sentient Layer Detail */}
            <section id="features" className="py-20 border-b border-white/5 bg-[#0A0A0C]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl font-black text-white mb-6">The Sentient Layer</h2>
                        <div className="h-1 w-20 bg-indigo-500"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'Natural Language Synthesis', desc: 'Decoding unstructured communication (Slack, Emails, Tickets) to map informal organizational networks and cultural health.', icon: Sparkles },
                            { title: 'Anomaly Detection', desc: 'Real-time identification of pay disparities, compliance breaches, or unusual access patterns across the enterprise.', icon: Activity },
                            { title: 'Behavioral Modeling', desc: 'Constructing psychometric profiles of high-performers to clone success factors in recruitment algorithms.', icon: Brain }
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-all">
                                    <item.icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Grid - Violet/Indigo Theme */}
            <section className="py-24 bg-[#08080A]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Large Feature */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group p-12 rounded-[3rem] bg-gradient-to-br from-indigo-900/10 to-transparent border border-white/5 relative overflow-hidden md:col-span-2"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold text-white mb-4">Predictive Human Capital</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        Our neural engine processes thousands of data points—from engagement pulses to market compensation trends—to predict retention risks with 94% accuracy before they become resignations.
                                    </p>
                                    <ul className="space-y-4">
                                        {['Sentiment Drift Analysis', 'Flight Risk Scoring', 'Compensation Benchmarking'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-indigo-300 font-mono text-sm">
                                                <Activity className="w-4 h-4" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 w-full">
                                    {/* Mock Graph UI */}
                                    <div className="bg-[#050505] p-6 rounded-2xl border border-white/10 shadow-2xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Retention Probability</div>
                                            <div className="text-xs font-bold text-emerald-400">Stable</div>
                                        </div>
                                        <div className="flex items-end gap-2 h-32">
                                            {[40, 65, 45, 80, 55, 90, 85].map((h, i) => (
                                                <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group cursor-pointer hover:bg-indigo-500/40 transition-all">
                                                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: `${h}%` }}></div>
                                                    {i === 5 && (
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded">
                                                            Projected
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Smaller Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Bias-Zero Hiring</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Anonymized skill extraction algorithms ensure that talent is evaluated purely on merit, stripping away demographic bias markers from the sourcing layer.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Network className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Organizational Network</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Visualize informal leadership structures and communication bottlenecks that org charts miss. Understand how work *actually* flows.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-b from-[#08080A] to-indigo-950/20 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-black text-white mb-8">Deploy Intelligence.</h2>
                    <button onClick={() => navigate('/signup')} className="bg-white text-black px-10 py-5 rounded-2xl text-lg font-black hover:bg-indigo-50 transition-all flex items-center gap-3 mx-auto">
                        Start Free Pilot <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

        </div>
    );
}
