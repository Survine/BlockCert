import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Calendar, Loader2, Wallet, GraduationCap, FileCheck } from 'lucide-react';

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

  const formatDate = (ts) => new Date(Number(ts) * 1000).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-2xl mb-4 shadow-sm">
          <GraduationCap size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Student Vault</h2>
        <p className="text-gray-500 mt-2 text-sm">Access your permanent academic history on the blockchain.</p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 mb-8 flex items-center p-2">
        <div className="pl-4 text-gray-400">
          <Wallet size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Paste Wallet Address (0x...)" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 p-3 bg-transparent outline-none font-mono text-sm text-gray-700 placeholder-gray-400"
        />
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-black transition-all disabled:opacity-70 flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          <span>Fetch</span>
        </motion.button>
      </div>

      {/* Results List */}
      <AnimatePresence>
        {fetched && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {certificates.length === 0 ? (
              <div className="text-center py-16 bg-white/50 border border-dashed border-gray-200 rounded-3xl">
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
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
                        <FileCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">Academic Credential</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar size={12} /> Issued on {formatDate(cert.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsCID}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2"
                    >
                      View PDF <ExternalLink size={12} />
                    </a>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Blockchain Hash</p>
                    <p className="text-xs font-mono text-gray-500 truncate bg-gray-50 p-2 rounded-lg">{cert.documentHash}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Student;