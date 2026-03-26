import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IDDropzone from '../components/features/IDDropzone';
import SelfieCapture from '../components/features/SelfieCapture';
import BackButton from '../components/ui/BackButton';
import GlassCard from '../components/ui/GlassCard';
import { Loader2, ShieldCheck, CheckCircle2, CircleDashed, Fingerprint, FileText, X } from 'lucide-react';

export default function VerifyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [docFile, setDocFile] = useState(null);
  
  const [aiStatus, setAiStatus] = useState({
    docScan: 'pending', type: null, country: null, liveness: 'pending',
  });

  const handleDocUpload = (file) => {
    setDocFile(file);
    setAiStatus(prev => ({ ...prev, docScan: 'scanning', type: 'Scanning...' }));
    setTimeout(() => {
      setAiStatus(prev => ({ ...prev, docScan: 'done', type: 'Passport', country: 'United States' }));
      setStep(2);
    }, 2000);
  };

  const handleFinalSubmit = async (capturedSelfie) => {
    setStep(3);
    setAiStatus(prev => ({ ...prev, liveness: 'scanning' }));

    // 1. Create the FormData object for the real backend
    const formData = new FormData();
    
    // Generate a dummy wallet for the hackathon demo
    const dummyWallet = "0x" + Math.random().toString(16).slice(2, 10);
    formData.append("wallet_address", dummyWallet);
    
    // Append the ID Document
    formData.append("id_document", docFile);

    // Append the Selfie and convert Base64 to Blob if needed
    if (typeof capturedSelfie === 'string' && capturedSelfie.startsWith('data:image')) {
        const fetchResponse = await fetch(capturedSelfie);
        const blob = await fetchResponse.blob();
        formData.append("live_selfie", blob, "selfie.jpg");
    } else {
        formData.append("live_selfie", capturedSelfie);
    }

    try {
      // 2. Hit your local FastAPI server!
      const response = await fetch("http://127.0.0.1:8000/verify", {
          method: "POST",
          body: formData, 
      });

      const data = await response.json();
      
      if (data.status === "Success") {
        console.log("Minted to DB! Hash:", data.verification_hash);
        setAiStatus(prev => ({ ...prev, liveness: 'done' }));
        
        // THE FIX: Pass the real hash through the router state!
        setTimeout(() => navigate('/dashboard', { state: { userHash: data.verification_hash } }), 1500);
      }

       else {
          throw new Error("Verification failed on backend");
      }
    } catch (error) {
      console.error("FastAPI Error:", error);
      setAiStatus(prev => ({ ...prev, liveness: 'error' }));
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto h-[calc(100vh-4rem)] pt-6 pb-8 relative z-10 px-6">
      
      {/* HEADER: Perfectly aligned Return Button & Stepper */}
      <div className="relative flex items-center w-full mb-8 shrink-0 h-16">
        <BackButton to="/" />

        <div className="relative flex justify-between w-full max-w-md mx-auto">
          {[
            { label: 'Upload ID', icon: FileText }, 
            { label: 'Live Selfie', icon: Fingerprint }, 
            { label: 'Verification', icon: ShieldCheck }
          ].map((item, idx) => {
            const isActive = step > idx;
            const isCurrent = step === idx + 1;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all bg-[#020617] ${
                  isActive ? 'border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 
                  isCurrent ? 'border-blue-400 text-blue-300' : 'border-white/20 text-slate-500'
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] md:text-xs font-bold tracking-wider uppercase bg-transparent px-2 ${isActive || isCurrent ? 'text-white' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`w-full flex-1 min-h-0 flex transition-all duration-300 ${
        step === 2 
          ? 'flex-col md:flex-row items-center justify-center gap-8 md:gap-12' 
          : 'flex-col items-center justify-center gap-8 max-w-3xl mx-auto'
      }`}>
        
        <div className={`w-full ${step === 2 ? 'md:w-1/2' : 'w-full'}`}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h1 className="text-3xl font-bold text-white tracking-tight">Upload Identification</h1>
                <p className="text-slate-400 text-sm max-w-md mb-2">Please provide a valid government-issued photo ID. Ensure details are clearly visible.</p>
                <IDDropzone onFileSelect={handleDocUpload} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h1 className="text-3xl font-bold text-white tracking-tight">Biometric Capture</h1>
                <p className="text-slate-400 text-sm max-w-md mb-2">Look directly at the camera. Ensure your face is evenly lit. Do not wear sunglasses.</p>
                <SelfieCapture onCaptureSubmit={handleFinalSubmit} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                className="flex flex-col items-center justify-center h-45 w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <motion.div animate={{ y: ['-100%', '500%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-transparent to-blue-500/20 border-b border-blue-500/50" />
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3 z-10" />
                <h3 className="text-xl font-bold text-white mb-1 z-10">AI Verification in Progress</h3>
                <p className="text-slate-400 text-xs text-center max-w-sm z-10">Running liveness checks and matching biometrics. Please wait.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`w-full flex flex-col ${step === 2 ? 'md:w-1/2' : 'w-full'}`}>
          <GlassCard className="w-full h-fit rounded-2xl! p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">AI Status Check</h2>
            </div>
            <StatusItem icon={FileText} label="Document Analysis" status={aiStatus.docScan} />
            <div className="pl-10 space-y-2">
              <DataField label="Document Type" value={aiStatus.type} status={aiStatus.docScan} />
              <DataField label="Issuer Country" value={aiStatus.country} status={aiStatus.docScan} />
            </div>
            <div className="border-t border-white/10 my-2" />
            <StatusItem icon={Fingerprint} label="Biometric Match" status={aiStatus.liveness} />
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

const StatusItem = ({ icon: Icon, label, status }) => {
  const currentStatus = status === 'done' ? { text: 'Complete', class: 'text-emerald-400', icon: CheckCircle2 } : 
                        status === 'scanning' ? { text: 'Processing', class: 'text-blue-400', icon: Loader2 } : 
                        status === 'error' ? { text: 'Action Needed', class: 'text-rose-400', icon: Loader2 } : 
                        { text: 'Pending', class: 'text-slate-500', icon: CircleDashed };
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg border ${status === 'pending' ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-blue-600/10 border-blue-500/20 text-blue-400'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-semibold text-white text-sm">{label}</span>
      </div>
      <div className={`flex items-center gap-1.5 text-xs font-medium ${currentStatus.class}`}>
        {currentStatus.text}
        <currentStatus.icon className={`w-3.5 h-3.5 ${status === 'scanning' ? 'animate-spin' : ''}`} />
      </div>
    </div>
  );
};

const DataField = ({ label, value, status }) => (
  <div className="flex items-baseline justify-between gap-2">
    <span className="text-xs text-slate-500">{label}:</span>
    <span className={`text-xs font-medium tabular-nums ${status === 'pending' || value?.includes('...') ? 'text-slate-600 italic' : 'text-slate-200'}`}>
      {value || 'Not scanned yet'}
    </span>
  </div>
);