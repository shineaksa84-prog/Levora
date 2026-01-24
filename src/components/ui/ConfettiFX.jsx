import React, { useEffect, useRef } from 'react';

export function ConfettiFX({ active, duration = 2000 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#E29578', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20,
                life: Math.random() * 100 + 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 5 + 2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.5; // Gravity
                p.life--;

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            if (particles.some(p => p.life > 0)) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        animate();

        const timer = setTimeout(() => {
            // Cleanup if needed? Canvas clears itself when particles die
        }, duration);

        return () => clearTimeout(timer);

    }, [active]);

    if (!active) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
        />
    );
}

export default ConfettiFX;
