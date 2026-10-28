import React, { useEffect, useRef } from 'react';

const AgriParticles = ({ count = 40, theme = 'hero' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive parallax effect
    let mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Particle Palette (Organic Bio-Nutrient Glow: Lime, Gold Amber, Emerald)
    const colors = theme === 'hero' 
      ? ['rgba(163, 230, 53, 0.65)', 'rgba(245, 158, 11, 0.6)', 'rgba(52, 211, 153, 0.55)', 'rgba(254, 240, 138, 0.7)']
      : ['rgba(63, 98, 18, 0.35)', 'rgba(180, 83, 9, 0.3)', 'rgba(101, 163, 13, 0.35)'];

    // Initialize Particles
    const particles = [];
    const particleCount = Math.min(count, Math.floor(width / 25));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1.2,
        baseRadius: Math.random() * 3 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.75,
        vy: -Math.random() * 0.8 - 0.2, // Gentle upward spore drift
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.03 + Math.random() * 0.02
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spore pulsating glow
        p.pulse += p.pulseSpeed;
        const currentRadius = p.baseRadius + Math.sin(p.pulse) * 0.8;

        // Mouse interaction (repel & glow)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            p.x -= directionX * force * 3;
            p.y -= directionY * force * 3;
          }
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = theme === 'hero' ? 12 : 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance

        // Subtle organic web connections between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = theme === 'hero' 
              ? `rgba(163, 230, 53, ${0.15 * (1 - dist / 90)})`
              : `rgba(63, 98, 18, ${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [count, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default AgriParticles;
