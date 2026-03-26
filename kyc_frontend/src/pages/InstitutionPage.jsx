import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import GlassCard from '../components/ui/GlassCard';

export default function InstitutionPage() {
  const [hash, setHash] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!hash) return;
    
    setIsSearching(true);
    setResult(null); 
    setError(null);  
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/institution/check/${hash}`);
      
      // Stop the loader immediately after getting a response
      setIsSearching(false); 

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else if (response.status === 404) {
        setError("User not found on the Golden Ledger.");
      } else {
        setError("Server error occurred.");
      }
    } catch (err) {
      // Stop the loader if the network crashes
      setIsSearching(false); 
      console.error(err);
      setError("Network error. Check backend connection.");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-[calc(100vh-6rem)] pb-8 relative z-10 overflow-hidden px-6">
      
      <div className="relative flex items-center w-full mb-10 shrink-0 h-16 mt-4">
        <BackButton to="/" />
      </div>

      <div className="flex flex-col justify-center flex-1 min-h-0 w-full max-w-2xl mx-auto pb-20">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Institution Portal</h1>
          <p className="text-slate-400 text-lg">Query the blockchain ledger to instantly verify a user's KYC status.</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-8 w-full">
          <input 
            type="text" 
            placeholder="Enter User Verification Hash (e.g. 0x71C...)"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white pl-6 pr-40 py-5 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 backdrop-blur-md text-lg transition-all shadow-xl"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50"
          >
            {/* THE BUTTON FIX IS HERE */}
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {/* SUCCESS UI */}
          {result && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <GlassCard className="bg-emerald-500/10! border-emerald-500/30! p-8 flex items-start gap-6">
                <div className="p-3 bg-emerald-500/20 rounded-full shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Status: Verified</h3>
                  <p className="text-slate-300 text-base">{result.message}</p>
                  <div className="mt-5 pt-5 border-t border-emerald-500/20 text-sm text-emerald-400/80 font-mono">
                    Wallet: {result.wallet_address} <br/>
                    Ledger Confirmation Hash: {hash}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ERROR / NOT FOUND UI */}
          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <GlassCard className="bg-rose-500/10! border-rose-500/30! p-8 flex items-start gap-6">
                <div className="p-3 bg-rose-500/20 rounded-full shrink-0">
                  <XCircle className="w-8 h-8 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Status: Not Verified</h3>
                  <p className="text-slate-300 text-base">{error}</p>
                  <div className="mt-5 pt-5 border-t border-rose-500/20 text-sm text-rose-400/80 font-mono">
                    Query Hash: {hash}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}