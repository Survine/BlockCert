import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Calendar, Loader2, Wallet } from 'lucide-react';

const Student = () => {
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/docs/student/${address}`);
      setCertificates(response.data.certificates);
      setFetched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (ts) => new Date(Number(ts) * 1000).toLocaleDateString();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Student Vault</h2>
        <p className="text-gray-500">Access your permanent academic history.</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Wallet className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Paste Wallet Address (0x...)" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-mono text-sm shadow-sm backdrop-blur-sm"
          />
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleFetch}
          disabled={loading}
          className="px-6 bg-gray-900 text-white rounded-2xl hover:bg-black transition-colors disabled:opacity-70 shadow-lg shadow-gray-900/10"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </motion.button>
      </div>

      {fetched && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {certificates.length === 0 ? (
            <div className="text-center py-12 bg-white/30 border border-dashed border-gray-300 rounded-3xl">
              <p className="text-gray-500 font-medium">No credentials found.</p>
              <p className="text-xs text-gray-400 mt-1">Try issuing one first!</p>
            </div>
          ) : (
            certificates.map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm flex justify-between items-center hover:bg-white/60 transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 font-bold text-sm shadow-inner">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Academic Credential</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Calendar size={10} /> Issued {formatDate(cert.timestamp)}
                    </p>
                  </div>
                </div>
                
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsCID}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 bg-white rounded-xl text-gray-400 border border-gray-100 hover:text-blue-600 hover:border-blue-100 hover:shadow-md transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Student;