import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, ChevronRight, CheckCircle2, Shield,
    Briefcase, LayoutDashboard, Users, Zap,
    Play, X, ArrowRight, Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const STEPS = [
    { id: 'identity', title: 'Identity & Security', subtitle: 'Secure your digital presence.' },
    { id: 'role', title: 'Role Intelligence', subtitle: 'Define your command level.' },
    { id: 'intent', title: 'Strategic Intent', subtitle: 'Calibrate your dashboard focus.' }
];

const ROLES = [
    { id: 'admin', icon: LayoutDashboard, label: 'Administrator', desc: 'Full system control & oversight.' },
    { id: 'recruiter', icon: Users, label: 'Talent Acquisition', desc: 'Pipeline & candidate management.' },
    { id: 'manager', icon: Briefcase, label: 'Hiring Manager', desc: 'Team growth & performance.' },
    { id: 'employee', icon: Shield, label: 'Employee', desc: 'Personal metrics & development.' }
];

const INTENTS = [
    { id: 'ops', label: 'Operational Efficiency', desc: 'Streamline workflows and reduce friction.' },
    { id: 'talent', label: 'Top Talent Density', desc: 'Attract and retain world-class performers.' },
    { id: 'compliance', label: 'Risk & Compliance', desc: 'Ensure global regulatory adherence.' },
    { id: 'growth', label: 'Rapid Scaling', desc: 'Hyper-growth infrastructure setup.' }
];

export default function OnboardingWizard() {
    const [step, setStep] = useState(0);
    const [showVideo, setShowVideo] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [formData, setFormData] = useState({
        photo: null,
        mobile: '',
        designation: '',
        role: '',
        intents: []
    });
    const navigate = useNavigate();
    const { user, updateUserData } = useAuth(); // Added updateUserData
    const [isSaving, setIsSaving] = useState(false);

    const handleNext = async () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            // Complete onboarding and save data
            try {
                setIsSaving(true);
                await updateUserData({
                    ...formData,
                    onboardingCompleted: true,
                    updatedAt: new Date()
                });
                navigate('/app');
            } catch (error) {
                console.error('Error saving onboarding data:', error);
                // Optionally show a toast here
            } finally {
                setIsSaving(false);
            }
        }
    };

    const toggleIntent = (id) => {
        setFormData(prev => ({
            ...prev,
            intents: prev.intents.includes(id)
                ? prev.intents.filter(i => i !== id)
                : [...prev.intents, id]
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-3xl p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-4xl bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-6 right-6 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>



                            <div className="aspect-video bg-zinc-900 relative group flex items-center justify-center overflow-hidden">
                                {isPlaying ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/fMuR6J41qSE?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0"
                                        title="Levora Intro"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div onClick={() => setIsPlaying(true)} className="w-full h-full relative cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                                        <img
                                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                                            alt="Introduction"
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-accent group-hover:text-black transition-all"
                                            >
                                                <Play className="w-8 h-8 fill-current translate-x-1" />
                                            </motion.div>
                                        </div>
                                        <div className="absolute bottom-8 left-8 z-20">
                                            <h2 className="text-3xl font-black tracking-tighter mb-2">Welcome to Levora</h2>
                                            <p className="text-white/70 font-medium">A 2-minute primer on the future of work.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex justify-between items-center bg-[#050505]">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Zap className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deployment Ready</div>
                                        <div className="text-xs text-white/50">System v4.2.0</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent transition-colors flex items-center gap-2"
                                >
                                    Start Setup <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20 h-screen flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-2">System Initialization</div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                            {STEPS[step].title}
                        </h1>
                        <p className="text-white/60 text-lg">{STEPS[step].subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        {STEPS.map((s, i) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <div className={`h-1 w-8 md:w-16 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent' : 'bg-white/10'}`}></div>
                            </div>
                        ))}
                        <div className="ml-4 text-xs font-black text-white/30">STEP 0{step + 1} / 03</div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-center max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full"
                        >
                            {step === 0 && ( /* Identity Step */
                                <div className="space-y-8">
                                    <div className="flex items-center gap-8">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-32 h-32 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-accent/50">
                                                {formData.photo ? (
                                                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera className="w-10 h-10 text-white/30" />
                                                )}
                                            </div>
                                            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-black shadow-lg">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-lg font-bold mb-1">Profile Photo</div>
                                            <div className="text-white/50 text-sm">Recommend 400x400px. AI-enhanced cropping enabled.</div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-white/50 tracking-wider">Designation</label>
                                            <input
                                                type="text"
                                                value={formData.designation}
                                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                                placeholder="e.g. Senior VP of Operations"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-white/50 tracking-wider">Mobile Handshake</label>
                                            <input
                                                type="tel"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 1 && ( /* Role Intelligence */
                                <div className="grid md:grid-cols-2 gap-4">
                                    {ROLES.map(role => (
                                        <div
                                            key={role.id}
                                            onClick={() => setFormData({ ...formData, role: role.id })}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${formData.role === role.id ? 'bg-accent text-black border-accent' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
                                        >
                                            <role.icon className="w-8 h-8 mb-4 opacity-80" />
                                            <div className="font-bold text-lg mb-1">{role.label}</div>
                                            <div className={`text-xs font-medium leading-relaxed ${formData.role === role.id ? 'text-black/70' : 'text-white/50'}`}>{role.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 2 && ( /* Strategic Intent */
                                <div className="space-y-4">
                                    {INTENTS.map(intent => (
                                        <div
                                            key={intent.id}
                                            onClick={() => toggleIntent(intent.id)}
                                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${formData.intents.includes(intent.id) ? 'bg-white/10 border-accent/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${formData.intents.includes(intent.id) ? 'bg-accent border-accent' : 'border-white/30'}`}>
                                                    {formData.intents.includes(intent.id) && <CheckCircle2 className="w-4 h-4 text-black" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{intent.label}</div>
                                                    <div className="text-xs text-white/50">{intent.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-8">
                    <button
                        onClick={() => step > 0 && setStep(step - 1)}
                        className={`text-sm font-bold text-white/50 hover:text-white transition-colors ${step === 0 ? 'invisible' : ''}`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isSaving}
                        className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                            step === STEPS.length - 1 ? 'Launch Interface' : 'Continue'
                        )}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
