import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2-second fast orchestration (1.7s load + 0.3s exit)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="advanced-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-[#08080c] flex items-center justify-center overflow-hidden"
          >
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              
              {/* Stage 3: Logo Integration (1.2s - 1.7s) */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
                className="absolute text-5xl font-black text-neonCyan text-glow-cyan z-20"
              >
                T.
              </motion.h1>

              {/* Stage 1 & 2: Geometric Canvas & Neural Activation */}
              <svg width="300" height="300" viewBox="0 0 200 200" className="absolute inset-0 z-10 drop-shadow-[0_0_15px_rgba(0,234,238,0.5)]">
                
                {/* Stage 1: Geometric Construction (0 - 0.5s) */}
                <motion.path
                  d="M 100,10 L 180,50 L 180,150 L 100,190 L 20,150 L 20,50 Z"
                  fill="transparent"
                  stroke="#00eaee"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Stage 2a: Neural Network Lines (0.5s - 1.2s) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  stroke="#00eaee"
                  strokeWidth="1"
                >
                  <motion.line x1="100" y1="10" x2="100" y2="190" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} strokeDasharray="4 4" />
                  <motion.line x1="20" y1="50" x2="180" y2="150" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} strokeDasharray="4 4" />
                  <motion.line x1="20" y1="150" x2="180" y2="50" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} strokeDasharray="4 4" />
                  
                  {/* Inner Structural Web */}
                  <motion.polygon 
                    points="100,50 140,100 100,150 60,100" 
                    fill="transparent" 
                    initial={{ pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ delay: 0.7, duration: 0.5 }} 
                  />
                </motion.g>

                {/* Stage 2b: Neural Nodes & Pulses (0.8s onwards) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  fill="#00eaee"
                >
                  {/* Outer Vertices */}
                  <circle cx="100" cy="10" r="3" />
                  <circle cx="180" cy="50" r="3" />
                  <circle cx="180" cy="150" r="3" />
                  <circle cx="100" cy="190" r="3" />
                  <circle cx="20" cy="150" r="3" />
                  <circle cx="20" cy="50" r="3" />
                  
                  {/* Inner Pulsing Nodes */}
                  <motion.circle cx="100" cy="50" r="2.5" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                  <motion.circle cx="140" cy="100" r="2.5" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
                  <motion.circle cx="100" cy="150" r="2.5" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} />
                  <motion.circle cx="60" cy="100" r="2.5" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.9 }} />
                  
                  {/* Central Core Pulse */}
                  <motion.circle cx="100" cy="100" r="5" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.0 }} />
                </motion.g>

              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLoading && children}
    </>
  );
};

export default AdvancedLoader;
