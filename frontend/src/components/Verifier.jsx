import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileCheck, X, Loader2, ShieldCheck, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const Verifier = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('certificate', file);

    try {
      setStatus("verifying");
      const response = await axios.post('http://localhost:5000/api/docs/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const resetVerifier = () => {
    setFile(null);
    setStatus("idle");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-2xl mb-4 shadow-sm">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verify Authenticity</h2>
        <p className="text-gray-500 mt-2 text-sm">Instantly check if a document is recorded on the blockchain.</p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' && result ? (
          // --- RESULT VIEW ---
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-3xl border shadow-xl overflow-hidden ${result.status === 'Valid' ? 'bg-white border-green-100' : 'bg-white border-red-100'}`}
          >
            <div className={`p-8 text-center border-b ${result.status === 'Valid' ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ${result.status === 'Valid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {result.status === 'Valid' ? <CheckCircle size={32} /> : <X size={32} />}
              </div>
              <h3 className={`text-2xl font-bold ${result.status === 'Valid' ? 'text-green-900' : 'text-red-900'}`}>
                {result.message}
              </h3>
              <p className={`text-sm mt-1 ${result.status === 'Valid' ? 'text-green-700' : 'text-red-700'}`}>
                {result.status === 'Valid' ? "This document is authentic and unchanged." : "This document does not match our records."}
              </p>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Digital Fingerprint (Hash)</p>
                <p className="text-xs font-mono text-gray-600 break-all bg-white p-2 rounded border border-gray-200">
                  {result.digitalFingerprint}
                </p>
              </div>

              <button onClick={resetVerifier} className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 text-center rounded-xl font-bold hover:bg-gray-50 transition-all">
                Verify Another Document
              </button>
            </div>
          </motion.div>
        ) : (
          // --- UPLOAD VIEW ---
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50 space-y-6"
          >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Document to Verify</label>
              <motion.div 
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className={`relative border-2 border-dashed rounded-2xl p-10 transition-all text-center cursor-pointer group
                  ${file ? 'border-green-500/50 bg-green-50/30' : 'border-gray-200 hover:border-green-400 hover:bg-green-50/30'}`}
              >
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center gap-3 relative z-0">
                  <div className={`p-4 rounded-full shadow-sm transition-all ${file ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400 group-hover:text-green-500 group-hover:shadow-md'}`}>
                    {file ? <FileText size={24} /> : <Search size={24} />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold transition-colors ${file ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {file ? file.name : "Click to select or drag file"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">We calculate the hash locally. Your file is safe.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVerify} 
              disabled={status === 'verifying' || !file}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'verifying' ? <Loader2 size={20} className="animate-spin" /> : "Run Verification"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verifier;