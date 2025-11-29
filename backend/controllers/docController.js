// backend/controllers/docController.js
const crypto = require('crypto');
const fs = require('fs');
const { ethers } = require('ethers');
const pinataSDK = require('@pinata/sdk'); // <--- NEW TOOL
require('dotenv').config();

// 1. Configure Pinata
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

const contractJSON = require('../artifacts/contracts/CredentialVerifier.sol/CredentialVerifier.json');

const getFileHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
};

const uploadDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    try {
        const hexHash = getFileHash(req.file.path);

        // --- NEW: UPLOAD TO IPFS (PINATA) ---
        console.log("Uploading to Pinata IPFS...");
        
        // We create a "Stream" (like a water hose) to send the file data
        const readableStreamForFile = fs.createReadStream(req.file.path);
        const options = {
            pinataMetadata: {
                name: req.file.originalname, // Keep the original name
            }
        };

        // The Magic Line: Send it to the decentralized network
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        const ipfsHash = result.IpfsHash; // This is the CID (Content Identifier)

        console.log(`File pinned to IPFS! CID: ${ipfsHash}`);
        // ------------------------------------

        // Blockchain Connection (Write)
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, wallet);

        console.log(`Writing SHA-256 hash to blockchain: ${hexHash}...`);
        const tx = await contract.issueCredential(hexHash);
        await tx.wait();
        
        console.log("Transaction Confirmed!");

        res.status(200).json({
            message: "Certificate Issued, Pinned to IPFS & Secured on Blockchain!",
            filename: req.file.filename,
            digitalFingerprint: hexHash, // Used for integrity check
            ipfsCID: ipfsHash,           // Used for retrieving the file later
            transactionHash: tx.hash
        });

    } catch (error) {
        console.error("Error in uploadDocument:", error);
        res.status(500).json({ error: "Error processing file or blockchain transaction" });
    }
};

// Verification stays the same (we only check the Hash integrity)
const verifyDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    try {
        const hexHash = getFileHash(req.file.path);

        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractJSON.abi, provider);

        console.log(`Checking blockchain for hash: ${hexHash}...`);
        const isValid = await contract.verifyCredential(hexHash);

        if (isValid) {
            res.status(200).json({ 
                status: "Valid", 
                message: "This document is AUTHENTIC.",
                digitalFingerprint: hexHash
            });
        } else {
            res.status(200).json({ 
                status: "Invalid", 
                message: "This document is FAKE or has been tampered with.",
                digitalFingerprint: hexHash
            });
        }

    } catch (error) {
        console.error("Error in verifyDocument:", error);
        res.status(500).json({ error: "Error verifying document" });
    }
};

module.exports = { uploadDocument, verifyDocument };