import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ShieldCheck, Check } from 'lucide-react';
import AccessLogTable from '../components/features/AccessLogTable';
import BackButton from '../components/ui/BackButton';
import GlassCard from '../components/ui/GlassCard';
import { useLocation } from 'react-router-dom'; 


export default function DashboardPage() {
  const location = useLocation();

  // Grab the real hash from the previous page, OR show an error message if they didn't verify
  const hash = location.state?.userHash || "No Hash Generated. Please complete Verification."; 

  const [isCopied, setIsCopied] = useState(false);
  // ... rest of the code stays exactly the same

  // The function to handle copying to the clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setIsCopied(true);
      
      // Reset back to the copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-[calc(100vh-6rem)] pb-8 relative z-10 overflow-hidden px-6">
      
      {/* IDENTICAL HEADER: Return Button perfectly aligned to top left */}
      <div className="relative flex items-center w-full mb-10 shrink-0 h-16 mt-4">
        <BackButton />
      </div>

      <div className="flex flex-col gap-8 flex-1 min-h-0 justify-center w-full">
        
        <GlassCard className="relative w-full p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="w-32 h-32 bg-emerald-500/10 border border-emerald-500/30 rounded-4xl rotate-12 flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.2)] shrink-0">
            <div className="-rotate-12">
              <ShieldCheck className="w-16 h-16 text-emerald-400" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Status: Verified on Blockchain
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Your Core ID</h1>
            <p className="text-slate-400 mb-6 text-sm max-w-lg">Your identity has been securely hashed and minted to the ledger. You are in full control of your data.</p>
            
            {/* UPDATED COPY BOX SECTION */}
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-2.5 rounded-2xl max-w-md mx-auto md:mx-0">
              <code className="text-blue-300 font-mono text-sm truncate flex-1 ml-2">{hash}</code>
              <button 
                onClick={handleCopy}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors hover:text-white flex items-center justify-center w-10 h-10"
                title="Copy to clipboard"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>
        </GlassCard>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="w-full"
        >
          <h2 className="text-xl font-bold text-white mb-4 px-2">Recent Access Logs</h2>
          <AccessLogTable userHash={hash} />
        </motion.div>

      </div>
    </div>
  );
}