import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface AIBlobProps {
  className?: string;
}

const AIBlob: React.FC<AIBlobProps> = ({ className }) => {
  // Generate random movement paths for the blobs
  const blobs = useMemo(() => [
    { id: 1, size: 'w-[40rem] h-[40rem]', color: 'bg-indigo-600/30', duration: 25, delay: 0 },
    { id: 2, size: 'w-[35rem] h-[35rem]', color: 'bg-emerald-500/20', duration: 30, delay: -5 },
    { id: 3, size: 'w-[45rem] h-[45rem]', color: 'bg-violet-600/25', duration: 28, delay: -10 },
    { id: 4, size: 'w-[30rem] h-[30rem]', color: 'bg-blue-600/20', duration: 35, delay: -15 },
    { id: 5, size: 'w-[50rem] h-[50rem]', color: 'bg-fuchsia-600/15', duration: 40, delay: -20 },
    { id: 6, size: 'w-32 h-32', color: 'bg-white/10', duration: 15, delay: -2 },
    { id: 7, size: 'w-48 h-48', color: 'bg-cyan-400/10', duration: 18, delay: -8 },
  ], []);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* SVG Filter for the "Gooey" effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -15" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div 
        className="relative w-full h-full filter blur-[120px] opacity-60" 
        style={{ filter: 'url(#goo) blur(120px)' }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className={`absolute rounded-full ${blob.size} ${blob.color} mix-blend-screen`}
            animate={{
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              scale: [1, 1.2, 0.8, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "linear",
              delay: blob.delay,
            }}
            style={{
              left: '-10%',
              top: '-10%',
            }}
          />
        ))}
      </motion.div>
      
      {/* Subtle Grain/Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default AIBlob;
