import { useRef, useState } from 'react';
import { UploadCloud, FileCheck, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IDDropzone({ onFileSelect }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      alert("Invalid file type. Please upload an image or PDF.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
      className={`w-full rounded-2xl backdrop-blur-md border border-white/15 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group h-45 
        ${dragActive ? 'border-blue-500 bg-blue-600/10 scale-[1.01]' : 'bg-white/5 hover:bg-white/10'} 
        ${selectedFile ? 'border-emerald-500/40 bg-emerald-600/5' : ''}`}
    >
      <input ref={fileInputRef} type="file" accept="image/*,application/pdf" onChange={(e) => e.target.files && handleFile(e.target.files[0])} className="hidden" />

      {selectedFile ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center p-4 text-center">
          <div className="relative p-3 bg-emerald-600/20 rounded-full mb-3 border border-emerald-500/30">
            <FileCheck className="w-8 h-8 text-emerald-400" />
            <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null); fileInputRef.current.value = ""; }} className="absolute -top-1 -right-1 p-1 bg-black rounded-full border border-white/20 text-slate-400 hover:text-rose-400">
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-emerald-300 font-medium text-sm truncate max-w-xs">{selectedFile.name}</p>
          <p className="text-emerald-500/70 text-xs mt-2 font-medium">Document uploaded successfully.</p>
        </motion.div>
      ) : (
        <div className="p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-white/5 border border-white/10 rounded-full mb-3 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
            <UploadCloud className="w-6 h-6 text-white opacity-60 group-hover:opacity-100" />
          </div>
          <p className="text-white font-medium text-base">Click or Drag & Drop Identification</p>
          <p className="text-slate-500 text-xs mt-2 max-w-sm">Supports JPG, PNG, or PDF</p>
        </div>
      )}
    </div>
  );
}