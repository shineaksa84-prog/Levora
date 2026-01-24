import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent/5 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                <Link to="/login" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-flex justify-center items-center mb-6">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-white/70">Enter your email for recovery instructions.</p>
                </div>

                {status === 'success' ? (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center animate-in zoom-in-95">
                        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h3 className="text-white font-bold text-lg mb-1">Check your email</h3>
                        <p className="text-white/70 text-sm">We've sent password reset instructions to <span className="font-bold text-white">{email}</span></p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all hover:bg-white/20"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-white text-primary rounded-xl py-3.5 font-bold text-lg hover:bg-white/90 hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Instructions'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
