import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Check, Loader2, User, FileText } from 'lucide-react';

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

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Issue Credential</h2>
        <p className="text-gray-500">Mint a new permanent record on Sepolia.</p>
      </div>

      <div className="space-y-5">
        {/* Wallet Input */}
        <div className="group">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Student Wallet</label>
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="0x..." 
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200/80 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono text-sm shadow-sm backdrop-blur-sm"
            />
          </div>
        </div>

        {/* File Dropzone */}
        <motion.div 
          whileHover={{ scale: 1.01, borderColor: "#3b82f6" }}
          className="border-2 border-dashed border-gray-300/80 rounded-2xl p-8 text-center cursor-pointer relative bg-white/30 hover:bg-blue-50/30 transition-all group"
        >
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <Upload size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {file ? file.name : "Click to upload PDF"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Max file size 10MB</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={handleIssue} 
        disabled={status === 'uploading'}
        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg shadow-gray-900/10 hover:shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'uploading' ? <Loader2 size={20} className="animate-spin" /> : "Mint Credential"}
      </motion.button>

      {status === 'success' && result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-green-50/80 border border-green-200/80 rounded-2xl flex items-start gap-4 backdrop-blur-sm"
        >
          <div className="p-2 bg-green-100 rounded-full text-green-600 mt-1"><Check size={16} /></div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-green-900">Successfully Issued</p>
            <p className="text-xs text-green-700 mt-1 mb-2">Hash: {result.digitalFingerprint.slice(0, 20)}...</p>
            <a href={`https://gateway.pinata.cloud/ipfs/${result.ipfsCID}`} target="_blank" className="text-xs font-bold text-green-800 hover:underline flex items-center gap-1">
              <FileText size={12} /> View on IPFS
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Issuer;