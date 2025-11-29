import { useState } from 'react';
import axios from 'axios';

const Issuer = () => {
  const [file, setFile] = useState(null);
  const [studentAddress, setStudentAddress] = useState(""); // <--- NEW STATE
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setResult(null);
    }
  };

  const handleIssue = async () => {
    if (!file) return alert("Please select a file first!");
    if (!studentAddress) return alert("Please enter the Student's Wallet Address!"); // <--- VALIDATION

    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('studentAddress', studentAddress); // <--- SENDING THE ADDRESS

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
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto border border-gray-100">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Organization Portal</h2>
        <p className="text-gray-500 mt-2">Issue a new credential to the Blockchain</p>
      </div>

      {/* NEW: Student Address Input */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Student Wallet Address</label>
        <input 
          type="text" 
          placeholder="0x..." 
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* File Upload Area */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Certificate (PDF)</label>
        <input 
          type="file" 
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer border border-gray-300 rounded-lg p-2"
        />
      </div>

      <button 
        onClick={handleIssue} 
        disabled={status === 'uploading' || !file || !studentAddress}
        className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all shadow-md
          ${status === 'uploading' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'}`}
      >
        {status === 'uploading' ? 'Issuing to Blockchain...' : 'Issue Credential'}
      </button>

      {/* Success Message */}
      {status === 'success' && result && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">✅</span>
            <h3 className="font-bold text-green-800">Credential Issued!</h3>
          </div>
          <div className="text-sm text-green-700 space-y-1 overflow-hidden">
            <p><span className="font-semibold">Issued To:</span> {studentAddress}</p>
            <p><span className="font-semibold">File:</span> {result.filename}</p>
            <div className="bg-white p-2 rounded border border-green-100 mt-2">
              <p className="truncate"><span className="font-semibold">IPFS CID:</span> {result.ipfsCID}</p>
              <a 
                href={`https://gateway.pinata.cloud/ipfs/${result.ipfsCID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs font-bold mt-1 inline-block"
              >
                View on Decentralized Web 🌍
              </a>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error issuing credential. Check console for details.
        </div>
      )}
    </div>
  );
};

export default Issuer;