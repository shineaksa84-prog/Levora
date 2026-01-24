import { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Key, AlertTriangle, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NuclearVaultAuth({ onAuthSuccess }) {
    const [pin, setPin] = useState(['', '', '', '']);
    const [error, setError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const inputs = [useRef(), useRef(), useRef(), useRef()];

    // The Secret Key (Hardcoded for demo, would be env var in prod)
    const SECRET_PIN = '1984';

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value.slice(-1);
        setPin(newPin);

        if (value && index < 3) {
            inputs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputs[index - 1].current.focus();
        }
    };

    const verify = () => {
        const enteredPin = pin.join('');
        if (enteredPin === SECRET_PIN) {
            onAuthSuccess();
        } else {
            setError(true);
            setPin(['', '', '', '']);
            setAttempts(prev => prev + 1);
            inputs[0].current.focus();
            setTimeout(() => setError(false), 800);
        }
    };

    useEffect(() => {
        if (pin.every(digit => digit !== '')) {
            verify();
        }
    }, [pin]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-md w-full glass-card p-12 border-white/5 text-center relative z-10"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 text-primary shadow-2xl shadow-primary/20">
                    <Shield className="w-8 h-8" />
                </div>

                <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Nuclear Vault</h1>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-10">Secondary Authorization Required</p>

                <div className={`flex justify-center gap-4 mb-8 ${error ? 'animate-shake' : ''}`}>
                    {pin.map((digit, i) => (
                        <input
                            key={i}
                            ref={inputs[i]}
                            type="password"
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`w-14 h-18 bg-white/5 border-2 rounded-2xl text-center text-2xl font-black text-white outline-none transition-all ${error ? 'border-red-500 bg-red-500/10' : 'border-white/10 focus:border-primary focus:bg-primary/5'
                                }`}
                            maxLength={1}
                        />
                    ))}
                </div>

                {attempts > 0 && (
                    <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Intrusion Attempt {attempts}: Logged
                    </p>
                )}

                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                    <Fingerprint className="w-4 h-4" /> Biometric Link: Pulse Active
                </div>
            </motion.div>
        </div>
    );
}
