import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [industry, setIndustry] = useState('');
    const [challenge, setChallenge] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Collecting Sales Lead Data
            const leadData = {
                displayName: name,
                companySize,
                industry,
                primaryChallenge: challenge,
                leadStatus: 'NEW',
                marketingConsent: true
            };

            await signup(email, password, 'admin', leadData);
            navigate('/onboarding');
        } catch (err) {
            console.error('Signup error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F5F7] text-slate-900 font-sans p-4">
            {/* Split Layout */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[700px]">

                {/* Left: Branding & Value */}
                <div className="hidden md:flex flex-col justify-between bg-slate-900 p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 rounded-xl bg-white/10 p-1 border border-white/20 flex items-center justify-center">
                                <img src="/levora-logo.jpg" alt="Levora" className="h-8 w-auto rounded-lg" />
                            </div>
                            <span className="font-bold tracking-tight text-xl">Levora</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            Architecting the <br /> <span className="text-blue-400">Future of Work.</span>
                        </h2>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Deploy in under 5 minutes</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> SOC2 Type II Certified</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Dedicated Solution Architect</li>
                        </ul>
                    </div>

                    <div className="relative z-10">
                        <blockquote className="text-lg italic text-slate-300 mb-4">
                            "Levora gave us the visibility we didn't know we were missing."
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                            <div className="text-sm">
                                <div className="font-bold">Sarah Jenkins</div>
                                <div className="text-slate-500">VP HR, FinTech Corp</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Lead Capture Form */}
                <div className="p-12 md:p-16 flex flex-col justify-center overflow-y-auto max-h-[900px]">
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Initiate Setup</h1>
                        <p className="text-slate-500">Tell us about your organization to calibrate your workspace.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
                            <AlertCircle className="w-5 h-5 shrink-0" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Work Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                    placeholder="jane@company.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Company Size</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={companySize}
                                        onChange={(e) => setCompanySize(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Size</option>
                                        <option value="1-50">1 - 50 Employees</option>
                                        <option value="51-200">51 - 200 Employees</option>
                                        <option value="201-1000">201 - 1,000 Employees</option>
                                        <option value="1000+">1,000+ Employees</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Industry</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Industry</option>
                                        <option value="tech">Technology / SaaS</option>
                                        <option value="finance">Finance / Banking</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="retail">Retail / E-commerce</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Primary Challenge</label>
                            <div className="relative">
                                <select
                                    required
                                    value={challenge}
                                    onChange={(e) => setChallenge(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>What is your biggest HR pain point?</option>
                                    <option value="retention">Employee Retention & Churn</option>
                                    <option value="recruitment">Hiring Speed & Quality</option>
                                    <option value="compliance">Global Compliance & Risk</option>
                                    <option value="payroll">Payroll Errors & Efficiency</option>
                                    <option value="culture">Remote Culture & Engagement</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                placeholder="Min. 8 characters"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold text-lg hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform active:scale-95 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Workspace <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-slate-500 text-sm">
                                Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
