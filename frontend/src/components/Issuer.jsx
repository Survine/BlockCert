import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, Loader2, Wallet, FileText, X, Shield } from 'lucide-react';

const Issuer = () => {
  const [file, setFile] = useState(null);
  const [studentAddress, setStudentAddress] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState(null);

  const handleIssue = async () => {
    if (!file || !studentAddress) return;
    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('studentAddress', studentAddress);

    try {
      setStatus("uploading");
      const response = await axios.post('http://localhost:5000/api/docs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFile(null);
    setStudentAddress("");
    setStatus("idle");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4 shadow-sm">
          <Shield size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Issue New Credential</h2>
        <p className="text-gray-500 mt-2 text-sm">Securely Issue Certificates with Blockcert.</p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' && result ? (
          // --- SUCCESS VIEW ---
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl border border-green-100 shadow-xl overflow-hidden"
          >
            <div className="bg-green-50/50 p-8 text-center border-b border-green-100">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-900">Credential Issued!</h3>
              <p className="text-green-700 text-sm mt-1">Permanently recorded on the blockchain.</p>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Recipient</p>
                    <p className="text-sm font-mono text-gray-900 font-bold">{studentAddress.slice(0, 6)}...{studentAddress.slice(-4)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium uppercase">File</p>
                  <p className="text-sm text-gray-900 font-bold truncate max-w-[150px]">{file.name}</p>
                </div>
              </div>

              <div className="space-y-2">
                <a 
                  href={`https://sepolia.etherscan.io/tx/${result.transactionHash}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full py-3 px-4 bg-gray-900 text-white text-center rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-900/20"
                >
                  View on Etherscan ↗
                </a>
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${result.ipfsCID}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 text-center rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  View on IPFS 🌍
                </a>
              </div>
              
              <button onClick={resetForm} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Issue Another Credential
              </button>
            </div>
          </motion.div>
        ) : (
          // --- FORM VIEW ---
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Input Group */}
            <div className="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
              
              {/* Wallet Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Student Wallet Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Wallet className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. 0x71C...9A2" 
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Credential Document</label>
                <motion.div 
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all text-center cursor-pointer group
                    ${file ? 'border-blue-500/50 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}`}
                >
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  
                  <div className="flex flex-col items-center gap-3 relative z-0">
                    <div className={`p-4 rounded-full shadow-sm transition-all ${file ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 group-hover:text-blue-500 group-hover:shadow-md'}`}>
                      {file ? <FileText size={24} /> : <Upload size={24} />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold transition-colors ${file ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (MAX. 10MB)</p>
                    </div>
                    {file && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 transition-colors z-20"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleIssue} 
              disabled={status === 'uploading' || !file || !studentAddress}
              className="w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-bold shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {status === 'uploading' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Minting on Blockchain...</span>
                </>
              ) : (
                <>
                  <span>Mint Credential</span>
                  <ArrowRightIcon />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Tiny helper for the arrow
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default Issuer;