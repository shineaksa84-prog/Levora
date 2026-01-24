import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Network, Globe, Layers, Zap, CheckCircle2, RefreshCw, ChevronRight, Workflow, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orchestration() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-teal-500/30 selection:text-teal-200">
            {/* Global Navbar Stub/Return */}
            <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-teal-500/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-all">
                            <Layers className="w-6 h-6 text-teal-400" />
                        </div>
                        <span className="font-bold text-white tracking-tight">Levora <span className="text-teal-400 font-black italic">Orchestration</span></span>
                    </Link>
                    <button onClick={() => navigate('/login')} className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-teal-50 transition-all">
                        Framework Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-900/10 blur-[150px] -z-10 rounded-full"></div>
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-600/10 blur-[100px] -z-10 animate-pulse"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8 backdrop-blur-md">
                            <RefreshCw className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-300">Synchronized Global Ops</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                            Precision. <br />
                            Velocity. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-white">Equilibrium.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            A unified nervous system for the modern enterprise. Levora Orchestration harmonizes payroll, compliance, and workflows across 50+ jurisdictions in real-time.
                        </p>

                        <div className="flex justify-center gap-6">
                            <button className="bg-teal-600/20 hover:bg-teal-600/30 text-teal-100 border border-teal-500/30 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all backdrop-blur-sm group">
                                <Globe className="w-5 h-5" /> View Coverage Map
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NEW: Integration Fabric */}
            <section className="py-16 border-y border-teal-900/20 bg-[#020202]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">Seamlessly Interconnected with 200+ Systems</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
                        {/* Mock Logos - keeping it simple with text/icons for now as we don't have SVGs */}
                        {['SAP SuccessFactors', 'Workday', 'Slack', 'Microsoft Teams', 'Salesforce', 'Oracle Cloud', 'Jira'].map((partner) => (
                            <span key={partner} className="text-xl font-black text-slate-300 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-teal-800" /> {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Grid - Teal/Emerald Theme */}
            <section className="py-24 bg-[#08080A]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Interactive Workflow Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-teal-500/30 transition-all group md:col-span-2"
                        >
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold text-white mb-4">Autonomous Workflows</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        Triggers, actions, and approvals—automated. From device provisioning to access management, define the logic once and let Levora execute with zero friction.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono">
                                            IF Employee.Region == 'EMEA'
                                        </div>
                                        <ArrowRight className="text-slate-600" />
                                        <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                                            THEN Deploy(GDPR_Pack)
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Flow */}
                                <div className="flex-1 w-full bg-[#050505] p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[40px]"></div>
                                    <div className="space-y-4">
                                        {['New Hire Signed', 'IT Provisioning Triggered', 'Slack Access Granted', 'Welcome Kit Dispatched'].map((step, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i < 3 ? 'bg-teal-500 text-black' : 'bg-white/10 text-slate-500'}`}>
                                                    {i < 3 ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 bg-slate-500 rounded-full"></div>}
                                                </div>
                                                <span className={`text-sm font-bold ${i < 3 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
                                                {i < 3 && <span className="ml-auto text-[10px] text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded">AUTO</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Global Compliance</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Real-time updates for labor laws in 150+ countries. Levora automatically adjusts contracts and payroll calculations, keeping you sovereign in every jurisdiction.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-teal-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Unified Payroll</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Consolidate 50 localized payroll providers into one interface. Pay your entire global workforce in seconds with a single click execution.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-b from-[#08080A] to-teal-950/20 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-black text-white mb-8">Synchronize Your Enterprise.</h2>
                    <button onClick={() => navigate('/signup')} className="bg-white text-black px-10 py-5 rounded-2xl text-lg font-black hover:bg-teal-50 transition-all flex items-center gap-3 mx-auto">
                        Deploy Framework <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

        </div>
    );
}
