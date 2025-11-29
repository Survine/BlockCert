import { useState } from "react";
import axios from "axios";

const Issuer = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle"); // idle, uploading, success, error
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

        const formData = new FormData();
        formData.append("certificate", file);

        try {
            setStatus("uploading");

            // Call the Kitchen (Backend)
            const response = await axios.post("http://localhost:5000/api/docs/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
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

            {/* Action Button */}
            <button
                onClick={handleIssue}
                disabled={status === "uploading" || !file}
                className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all shadow-md
          ${status === "uploading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"}`}>
                {status === "uploading" ? "Issuing to Blockchain..." : "Issue Credential"}
            </button>

            {/* Success Message */}
            {status === "success" && result && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
                    <div className="flex items-center mb-2">
                        <h3 className="font-bold text-green-800">Credential Issued & Pinned!</h3>
                    </div>
                    <div className="text-sm text-green-700 space-y-2 overflow-hidden">
                        <p>
                            <span className="font-semibold">File:</span> {result.filename}
                        </p>
                        <p className="truncate">
                            <span className="font-semibold">Hash:</span> {result.digitalFingerprint}
                        </p>

                        {/* NEW: Display the IPFS CID */}
                        <div className="bg-white p-2 rounded border border-green-100">
                            <p className="truncate">
                                <span className="font-semibold">IPFS CID:</span> {result.ipfsCID}
                            </p>
                            <a href={`https://gateway.pinata.cloud/ipfs/${result.ipfsCID}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-bold mt-1 inline-block">
                                View on Decentralized Web
                            </a>
                        </div>

                        <p className="truncate text-xs text-gray-500">
                            <span className="font-semibold">Tx:</span> {result.transactionHash}
                        </p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {status === "error" && <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">Error issuing credential. Check console for details.</div>}
        </div>
    );
};

export default Issuer;
