import { useState } from 'react';
import axios from 'axios';

const Verifier = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setResult(null);
    }
  };

  const handleVerify = async () => {
    if (!file) return alert("Please select a file first!");

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
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto border border-gray-100">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Verifier Portal</h2>
        <p className="text-gray-500 mt-2">Upload a document to check its authenticity</p>
      </div>

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
        onClick={handleVerify} 
        disabled={status === 'verifying' || !file}
        className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all shadow-md
          ${status === 'verifying' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'}`}
      >
        {status === 'verifying' ? 'Checking Blockchain...' : 'Verify Document'}
      </button>

      {status === 'success' && result && (
        <div className={`mt-8 p-4 border rounded-lg animate-fade-in-up ${result.status === 'Valid' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{result.status === 'Valid' ? '✅' : '❌'}</span>
            <h3 className={`font-bold ${result.status === 'Valid' ? 'text-green-800' : 'text-red-800'}`}>
              {result.message}
            </h3>
          </div>
          <div className="text-sm space-y-1 overflow-hidden">
            <p className="truncate"><span className="font-semibold">Hash:</span> {result.digitalFingerprint}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error verifying credential. Check console for details.
        </div>
      )}
    </div>
  );
};

export default Verifier;