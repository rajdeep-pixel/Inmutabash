import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  // Screen sizing (using default window width/height or safe fallback)
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;

  // Track mouse coordinates
  const mouseX = useMotionValue(windowWidth / 2);
  const mouseY = useMotionValue(windowHeight / 2);

  // Add smoothing to the mouse movements
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  // Map coordinates to 360 rotation
  const rotateX = useTransform(smoothY, [0, windowHeight], [180, -180]);
  const rotateY = useTransform(smoothX, [0, windowWidth], [-180, 180]);

  // Listener for mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full h-screen bg-[#00051a] text-slate-100 flex flex-col justify-center items-center px-6 overflow-hidden relative">

      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-3 cursor-default select-none pointer-events-auto">
        <img
          src="/kyc-logo.svg"
          alt="KYC Logo"
          className="w-12 h-12"
        />

        <span
          className="font-bold text-sm md:text-base tracking-[0.2em] text-white uppercase mt-1.5"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif'
          }}
        >
          INMUTABASH
        </span>
      </div>

      {/* 3D Rotating Interactive Card Background */}
      <div
        className="absolute inset-0 z-0 bg-[#00051a] overflow-hidden flex items-center justify-center pointer-events-none"
        style={{ perspective: 1500 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-200 h-150 flex items-center justify-center opacity-60 scale-100"
        >
          {/* Subtle Grid Backdrop for the floating cards */}
          <div
            className="absolute inset-0 border-2 border-slate-700 bg-slate-900/40 p-10 flex flex-col justify-between"
            style={{ transform: 'translateZ(-20px)' }}
          >
            <div className="w-1/2 h-3 mx-auto bg-slate-700/80 mb-6"></div>

            {/* Horizontal Line Connecting The Cards */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-600 flex items-center -translate-y-1/2 z-0">
              <div className="w-2 h-2 rounded-full bg-slate-400 absolute left-[35%]"></div>
              <div className="w-2 h-2 rounded-full bg-slate-400 absolute right-[35%]"></div>
            </div>

            {/* Top Left Card Framework */}
            <div
              className="absolute top-[8%] left-[8%] w-95 h-55 bg-slate-800/80 p-6 flex gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
              style={{ transform: 'translateZ(60px)' }}
            >
              {/* KYC Verification Laser Scan */}
              <motion.div
                animate={{ y: ["-20px", "240px", "-20px"] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-20 pointer-events-none"
              />
              <div className="w-28 h-full bg-slate-700/80 flex flex-col items-center justify-end overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-slate-600 mb-2"></div>
                <div className="w-20 h-10 bg-slate-600 rounded-t-xl"></div>
              </div>
              <div className="flex-1 flex flex-col gap-3 py-2">
                <div className="w-full h-3 bg-slate-600"></div>
                <div className="w-3/4 h-2 bg-slate-700 mt-2"></div>
                <div className="w-full h-2 bg-slate-700"></div>
                <div className="w-5/6 h-2 bg-slate-700"></div>
                <div className="w-1/2 h-2 bg-slate-700 mt-auto"></div>
                <div className="w-1/3 h-2 bg-slate-700"></div>
              </div>
            </div>

            <div
              className="absolute bottom-[8%] right-[8%] w-95 h-55 bg-slate-800/80 p-6 flex gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
              style={{ transform: 'translateZ(100px)' }}
            >
              <motion.div
                animate={{ y: ["240px", "-20px", "240px"] }}
                transition={{ duration: 3.5, ease: "linear", repeat: Infinity, delay: 0.5 }}
                className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-20 pointer-events-none"
              />
              <div className="w-28 h-full bg-slate-700/80 flex flex-col items-center justify-end overflow-hidden">
                <div className="w-12 h-12 rounded-[5px] bg-slate-600 mb-2"></div>
                <div className="w-20 h-10 bg-slate-600 rounded-t-xl"></div>
              </div>
              <div className="flex-1 flex flex-col gap-3 py-2">
                <div className="w-full h-3 bg-slate-600"></div>
                <div className="w-3/4 h-2 bg-slate-700 mt-2"></div>
                <div className="w-full h-2 bg-slate-700"></div>
                <div className="w-5/6 h-2 bg-slate-700"></div>
                <div className="flex gap-3 mt-auto">
                  <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-1 bg-slate-800/50 mt-auto"></div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">

        <div className="mb-10 cursor-default">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-slate-100 flex flex-col items-center gap-1">
            <span className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              Digital Trust,
            </span>

            <motion.span
              whileHover={{
                filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5)) drop-shadow(0px 0px 6px rgba(59, 130, 246, 0.8))",
                WebkitTextStroke: "1px rgba(96, 165, 250, 0.9)"
              }}
              transition={{ duration: 0.3 }}
              className="relative inline-block drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] cursor-default"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(209, 240, 255, 0.6)'
              }}
            >
              Verified Once,
            </motion.span>

            <span className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              Shared Everywhere.
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed mb-10"
        >
          The future of KYC is decentralized. Instantly prove your identity without compromising privacy using zero-knowledge cryptography.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5 w-full max-w-3xl">
          {/* User Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/verify')}
            className="group cursor-pointer p-6 bg-transparent border-2 border-slate-800 hover:border-slate-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 text-left flex flex-col h-full backdrop-blur-sm relative overflow-hidden"
          >
            <motion.div
              variants={{
                hover: {
                  y: ["-20px", "300px"],
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 1.5, ease: "linear", repeat: Infinity }
                }
              }}
              initial={{ opacity: 0, y: "-20px" }}
              className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-50 pointer-events-none"
            />

            <div className="w-12 h-12 bg-transparent border-2 border-slate-800 group-hover:border-slate-500 flex items-center justify-center mb-5 transition-colors duration-200">
              <User className="w-6 h-6 text-slate-100" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-slate-100">User Node</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 flex-1">
              Verify once, own your data. Instantly share your compliance status securely.
            </p>
            <div className="mt-auto flex items-center gap-2 font-bold text-slate-100 border-t-2 border-slate-800 pt-4 group-hover:border-slate-500 transition-colors">
              <span className="text-[11px] md:text-xs uppercase tracking-widest">Connect Wallet</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Institution Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/institution')}
            className="group cursor-pointer p-6 bg-transparent border-2 border-slate-800 hover:border-slate-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 text-left flex flex-col h-full backdrop-blur-sm relative overflow-hidden"
          >
            <motion.div
              variants={{
                hover: {
                  y: ["-20px", "300px"],
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 1.5, ease: "linear", repeat: Infinity }
                }
              }}
              initial={{ opacity: 0, y: "-20px" }}
              className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-50 pointer-events-none"
            />

            <div className="w-12 h-12 bg-transparent border-2 border-slate-800 group-hover:border-slate-500 flex items-center justify-center mb-5 transition-colors duration-200">
              <Building2 className="w-6 h-6 text-slate-100" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-slate-100">Institution Hub</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 flex-1">
              Verify customer status directly from the ledger. Eliminate document liabilities.
            </p>
            <div className="mt-auto flex items-center gap-2 font-bold text-slate-100 border-t-2 border-slate-800 pt-4 group-hover:border-slate-500 transition-colors">
              <span className="text-[11px] md:text-xs uppercase tracking-widest">Access Ledger</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}