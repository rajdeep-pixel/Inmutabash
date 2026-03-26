import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = -1, className = "" }) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(to)}
      className={`absolute left-0 z-50 flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 group ${className}`}
    >
      <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
    </button>
  );
}