import { useState, useRef } from 'react';
import { Camera, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Camera as CameraPro } from 'react-camera-pro';

export default function SelfieCapture({ onCaptureSubmit }) {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const takePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      setImage(photo); 
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full h-62.5 bg-transparent backdrop-blur-sm border border-white/15 rounded-3xl flex flex-col items-center justify-center overflow-hidden shadow-xl">
        
        {image ? (
          <img src={image} alt="Selfie preview" className="w-full h-full object-cover scale-x-[-1]" />
        ) : (
          <CameraPro 
            ref={cameraRef}
            aspectRatio={16/9}
            numberOfCamerasCallback={setNumberOfCameras}
            errorMessages={{
              noCameraAccessible: 'Camera device inaccessible.',
              permissionDenied: 'Permission denied. Please allow camera.',
            }}
          />
        )}

        {!image && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-40 h-48 border-2 border-dashed border-blue-400/50 rounded-[100px] shadow-[0_0_0_1000px_rgba(2,6,23,0.5)]" />
          </div>
        )}

        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 px-6 z-10">
          {image ? (
            <button 
              onClick={() => setImage(null)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-white backdrop-blur-md transition-all text-xs font-medium"
            >
              <RefreshCcw className="w-3 h-3" />
              Retake Photo
            </button>
          ) : (
            <button 
              onClick={takePhoto}
              disabled={numberOfCameras === 0}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              Capture Liveness
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={() => image && onCaptureSubmit(image)}
        disabled={!image}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
          image 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer' 
            : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
        }`}
      >
        <ShieldCheck className="w-4 h-4" />
        Start AI Verification
      </button>
    </div>
  );
}