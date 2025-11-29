import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, FileCheck, X, Loader2, ShieldCheck } from 'lucide-react';

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

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verify Authenticity</h2>
        <p className="text-gray-500">Check document integrity against the blockchain.</p>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01, borderColor: "#10b981" }}
        className="border-2 border-dashed border-gray-300/80 rounded-3xl p-10 text-center cursor-pointer relative bg-white/30 hover:bg-green-50/30 transition-all group"
      >
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} className="text-green-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-700">
              {file ? file.name : "Drop document to verify"}
            </p>
            <p className="text-xs text-gray-400 mt-1">We don't store this file</p>
          </div>
        </div>
      </motion.div>

      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={handleVerify} 
        disabled={status === 'verifying' || !file}
        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg shadow-gray-900/10 hover:shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'verifying' ? <Loader2 size={20} className="animate-spin" /> : "Run Verification"}
      </motion.button>

      {status === 'success' && result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-2xl border backdrop-blur-sm ${result.status === 'Valid' ? 'bg-green-50/80 border-green-200/80' : 'bg-red-50/80 border-red-200/80'}`}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className={`p-3 rounded-full ${result.status === 'Valid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {result.status === 'Valid' ? <FileCheck size={28} /> : <X size={28} />}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${result.status === 'Valid' ? 'text-green-900' : 'text-red-900'}`}>
                {result.message}
              </h3>
              <p className="text-xs text-gray-500 font-mono mt-2 break-all bg-white/50 p-2 rounded-lg border border-gray-100/50">
                {result.digitalFingerprint}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Verifier;