const crypto = require('crypto');
const fs = require('fs');
const { ethers } = require('ethers');
const pinataSDK = require('@pinata/sdk');
require('dotenv').config();

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
const contractJSON = require('../artifacts/contracts/CredentialVerifier.sol/CredentialVerifier.json');

const getFileHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
};

// --- 1. UPLOAD (Issue) ---
const uploadDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    try {
        const hexHash = getFileHash(req.file.path);
        
        console.log("Uploading to Pinata IPFS...");
        const readableStreamForFile = fs.createReadStream(req.file.path);
        const options = { pinataMetadata: { name: req.file.originalname } };
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        const ipfsHash = result.IpfsHash;

        const studentAddr = req.body.studentAddress;
        if (!studentAddr) return res.status(400).json({ message: "Student Address required!" });

        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, wallet);

        console.log(`Issuing cert to ${studentAddr} with CID: ${ipfsHash}...`);
        
        // CHANGED: We now pass the 'ipfsHash' to the contract!
        const tx = await contract.issueCredential(hexHash, ipfsHash, studentAddr);
        await tx.wait();
        
        console.log("Transaction Confirmed!");

        res.status(200).json({
            message: "Certificate Issued!",
            filename: req.file.filename,
            digitalFingerprint: hexHash,
            ipfsCID: ipfsHash,
            transactionHash: tx.hash
        });

    } catch (error) {
        console.error("Error in uploadDocument:", error);
        res.status(500).json({ error: "Error processing transaction" });
    }
};

// --- 2. VERIFY ---
const verifyDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    try {
        const hexHash = getFileHash(req.file.path);
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, provider);

        const isValid = await contract.verifyCredential(hexHash);

        if (isValid) {
            res.status(200).json({ status: "Valid", message: "Document is AUTHENTIC.", digitalFingerprint: hexHash });
        } else {
            res.status(200).json({ status: "Invalid", message: "Document is FAKE.", digitalFingerprint: hexHash });
        }

    } catch (error) {
        console.error("Error in verifyDocument:", error);
        res.status(500).json({ error: "Error verifying document" });
    }
};

// --- 3. FETCH STUDENT CERTIFICATES ---
const fetchStudent = async (req, res) => {
    const { address } = req.params;

    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, provider);

        console.log(`Fetching certs for: ${address}...`);
        const rawCerts = await contract.getCertificates(address);

        // --- THE FIX IS HERE ---
        // We map over the results and convert the BigInt timestamp to a String
        const certificates = rawCerts.map(cert => ({
            documentHash: cert.documentHash,
            ipfsCID: cert.ipfsCID,
            timestamp: cert.timestamp.toString() // <--- Convert BigInt to String
        }));

        res.status(200).json({ certificates: certificates });

    } catch (error) {
        console.error("Error in fetchStudent:", error);
        res.status(500).json({ error: "Error fetching certificates" });
    }
};

module.exports = { uploadDocument, verifyDocument, fetchStudent };