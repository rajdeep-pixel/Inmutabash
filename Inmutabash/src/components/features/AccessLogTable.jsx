import { useState, useEffect } from 'react';
import { XCircle, CheckCircle2, Loader2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function AccessLogTable({ userHash }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      console.log("Table received hash:", userHash); // Debugging line
      
      // 1. Safety Check: If there is no valid hash, turn off the loader and stop.
      if (!userHash || userHash.includes("No Hash")) {
        console.log("No valid hash provided, stopping loader.");
        setIsLoading(false);
        return;
      }
      
      // 2. Fetch the logs
      try {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/logs/${userHash}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Received data from backend:", data);
          setLogs(data);
        } else {
          console.error("Backend returned an error:", response.status);
        }
      } catch (error) {
        console.error("Error fetching access logs:", error);
      } finally {
        // 3. THIS IS CRITICAL: Always turn off the loader no matter what happens!
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [userHash]);

  const handleRevoke = (idToRevoke) => {
    setLogs(currentLogs => 
      currentLogs.map(log => 
        log.id === idToRevoke ? { ...log, status: 'Revoked' } : log
      )
    );
  };

  if (isLoading && logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
        <p>Syncing with Ledger...</p>
      </div>
    );
  }

  return (
    <GlassCard className="w-full rounded-3xl!">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm">
            <th className="p-5 font-medium">Institution</th>
            <th className="p-5 font-medium">Access Type</th>
            <th className="p-5 font-medium">Request Date</th>
            <th className="p-5 font-medium">Status</th>
            <th className="p-5 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-10 text-center text-slate-500">No access requests detected yet.</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5 text-white font-medium">{log.institution}</td>
                <td className="p-5 text-slate-300">{log.accessType}</td>
                <td className="p-5 text-slate-400">{log.requestDate}</td>
                <td className="p-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                    log.status === 'ACTIVE' || log.status === 'COMPLETED' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {(log.status === 'ACTIVE' || log.status === 'COMPLETED') ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {log.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  {(log.status === 'ACTIVE' || log.status === 'COMPLETED') ? (
                    <button 
                      onClick={() => handleRevoke(log.id)}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Revoke Access
                    </button>
                  ) : (
                    <span className="text-slate-600 text-sm font-medium px-4 py-2">Revoked</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </GlassCard>
  );
}