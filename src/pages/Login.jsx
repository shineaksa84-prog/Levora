import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/app';

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            if (email.includes('agency')) {
                navigate('/agency/app', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Failed to log in. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Ambient Corporate Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-100 contrast-150"></div>
            </div>

            <div className="w-full max-w-md glass-card p-8 md:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                    <div className="inline-flex justify-center items-center mb-6 p-4 bg-muted/30 rounded-2xl shadow-inner">
                        <img src="/levora-logo.jpg" alt="Levora" className="h-16 w-auto mix-blend-multiply opacity-90" />
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-muted-foreground font-medium">Sign in to access your HRIMS dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2 shadow-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-bold">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-12 py-3.5 text-foreground placeholder:text-muted-foreground/50 font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all hover:border-primary/30"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">Password</label>
                            <Link to="/forgot-password" className="text-xs font-bold text-primary hover:text-primary/80 hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-border rounded-xl px-12 py-3.5 text-foreground placeholder:text-muted-foreground/50 font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all hover:border-primary/30"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <MagneticButton className="w-full">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cyber-button-primary flex items-center justify-center gap-2 py-4 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </button>
                    </MagneticButton>

                    <div className="text-center pt-2">
                        <p className="text-muted-foreground text-sm font-medium">
                            Don't have an account? <Link to="/signup" className="text-foreground font-bold hover:text-primary underline decoration-2 decoration-primary/30 hover:decoration-primary underline-offset-4 transition-all cursor-pointer">Create Account</Link>
                        </p>
                    </div>

                    {/* Demo Login Helpers */}
                    <div className="pt-8 mt-2 border-t border-border/50">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-black mb-4 text-center">Quick Access (Dev)</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Admin', role: 'admin@levora.ai' },
                                { label: 'Recruiter', role: 'recruiter@levora.ai' },
                                { label: 'Employee', role: 'employee@levora.ai' },
                                { label: 'Agency', role: 'agency@partners.com', special: true }
                            ].map((demo) => (
                                <button
                                    key={demo.label}
                                    type="button"
                                    onClick={() => { setEmail(demo.role); setPassword('demo123'); }}
                                    className={`px-3 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all border ${
                                        demo.special 
                                        ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                                        : 'bg-muted/50 text-muted-foreground border-border/50 hover:bg-white hover:text-primary hover:border-primary/30 hover:shadow-sm'
                                    }`}
                                >
                                    {demo.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="absolute bottom-6 text-center w-full">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Secured by Levora AI</p>
            </div>
        </div>
    );
}
