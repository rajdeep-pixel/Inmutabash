import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center max-w-6xl mx-auto h-[calc(100vh-6rem)] relative z-10 selection:bg-blue-500/20 px-6">
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.15] mb-8 max-w-5xl mx-auto">
          Your Identity, <br className="hidden md:block"/>
          <span className="text-transparent [-webkit-text-stroke:1px_#fff] opacity-90">
            Verified Once,
          </span> <br className="hidden md:block"/>
          Shared Everywhere.
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Bring onboarding, compliance, and privacy together in one AI-powered workspace. Built to turn verification into a seamless experience.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl group/choices">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onClick={() => navigate('/verify')}
          className="group relative p-10 bg-white/5 backdrop-blur-lg border border-white/15 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden text-left shadow-[0_20px_40px_rgba(0,0,0,0.3)] opacity-90 hover:opacity-100! hover:scale-[1.02] hover:bg-white/10"
        >
          <User className="w-10 h-10 text-blue-400 mb-7 transition-colors" />
          <h2 className="text-2xl font-bold text-white mb-2">I am a User</h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-sm">
            Verify your identity once and instantly share your profile with verified institutions securely.
          </p>
          <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
            Start Verification <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          onClick={() => navigate('/institution')}
          className="group relative p-10 bg-white/5 backdrop-blur-lg border border-white/15 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden text-left shadow-[0_20px_40px_rgba(0,0,0,0.3)] opacity-90 hover:opacity-100! hover:scale-[1.02] hover:bg-white/10"
        >
          <Building2 className="w-10 h-10 text-emerald-400 mb-7 transition-colors" />
          <h2 className="text-2xl font-bold text-white mb-2">I am an Institution</h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-sm">
            Check user KYC status instantly via the blockchain ledger without storing sensitive documents.
          </p>
          <div className="flex items-center text-emerald-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
            Check KYC Status <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}