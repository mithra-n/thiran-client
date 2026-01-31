import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: ['#a855f7', '#ec4899', '#06b6d4', '#ffffff'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-20 h-20 border border-purple-500/20 rounded-lg"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute top-40 right-[15%] w-16 h-16 border border-pink-500/20"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        animate={{
          rotate: [0, -360],
          y: [0, 30, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-40 left-[20%] w-12 h-12 border border-cyan-500/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-[25%] w-24 h-24 border border-purple-500/10 rounded-2xl"
        animate={{
          rotate: [0, 180],
          y: [0, -15, 0],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
  );
};

export default ParticleField;
