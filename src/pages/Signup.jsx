import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Default role is 'admin' for new sign-ups (assuming they are workspace creators)
            await signup(email, password, 'admin', { displayName: name });
            navigate('/app');
        } catch (err) {
            console.error('Signup error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <div className="inline-flex justify-center items-center mb-6">
                        <img src="/levora-logo.jpg" alt="Levora" className="h-20 w-auto rounded-xl shadow-lg" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-white/70">Join Levora and transform your team.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-white animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all hover:bg-white/20"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all hover:bg-white/20"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all hover:bg-white/20"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-slate-900 rounded-xl py-3.5 font-bold text-lg hover:bg-indigo-50 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-95 mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Get Started <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-white/60 text-sm">
                            Already have an account? <Link to="/login" className="text-white font-medium hover:underline">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
