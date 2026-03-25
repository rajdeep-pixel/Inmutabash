import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  if (location.pathname === '/verify' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="w-full bg-transparent pt-12 pb-4 z-50 absolute top-0 left-0">
      <div className="container mx-auto px-6 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-widest text-white uppercase mt-0.5">
            Golden Profile
          </span>
        </Link>
      </div>
    </nav>
  );
}