import { useState } from 'react';
import axios from 'axios';

const Student = () => {
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!address) return alert("Please enter an address!");
    
    setLoading(true);
    setError("");
    setCertificates([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/docs/student/${address}`);
      // The backend now returns a list of Structs (Objects)
      setCertificates(response.data.certificates);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch certificates. Check the address.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format the timestamp from Blockchain (seconds) to a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    // Blockchain uses seconds, JS uses milliseconds
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Portal</h2>
      
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Your Wallet Address</label>
        <input 
          type="text" 
          placeholder="Paste your address (0x...)" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <button 
        onClick={handleFetch}
        disabled={loading}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-md"
      >
        {loading ? "Searching Blockchain..." : "Get My Degrees"}
      </button>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {certificates.length > 0 && (
        <div className="mt-8 animate-fade-in-up">
          <h3 className="font-bold text-gray-700 mb-3">Your Certificates:</h3>
          <ul className="space-y-4">
            {certificates.map((cert, index) => (
              <li key={index} className="p-4 bg-purple-50 border border-purple-100 rounded-lg text-sm break-all shadow-sm">
                
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-purple-800">Credential #{index + 1}</span>
                  <span className="text-xs text-gray-500">{formatDate(cert.timestamp)}</span>
                </div>

                <div className="space-y-1">
                   <p className="text-gray-600">
                     <span className="font-semibold">Hash:</span> {cert.documentHash}
                   </p>
                   
                   {/* The Magic Link */}
                   <div className="mt-3 bg-white p-2 rounded border border-purple-200 inline-block">
                     <a 
                       href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsCID}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline font-bold flex items-center gap-1"
                     >
                       📄 View Original PDF
                     </a>
                   </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
      )}
      
      {certificates.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400 mt-6 text-sm">No certificates found for this address.</p>
      )}
    </div>
  );
};

export default Student;