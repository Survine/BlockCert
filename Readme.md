<p align="center">
  <img src="https://img.shields.io/badge/Blockchain-Ethereum-3C3C3D?style=for-the-badge&logo=ethereum" alt="Ethereum"/>
  <img src="https://img.shields.io/badge/Network-Sepolia-purple?style=for-the-badge" alt="Sepolia"/>
  <img src="https://img.shields.io/badge/Storage-IPFS-65C2CB?style=for-the-badge&logo=ipfs" alt="IPFS"/>
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Solidity-0.8.28-363636?style=for-the-badge&logo=solidity" alt="Solidity"/>
</p>

<h1 align="center">BlockCert - Blockchain Credential Verification System</h1>

<p align="center">
  <strong>A tamper-proof, decentralized document verification platform combining blockchain technology, cryptographic security, and modern web technologies to combat credential fraud.</strong>
</p>

<p align="center">
  <a href="#-table-of-contents">Contents</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Smart Contract](#-smart-contract)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Acknowledgments](#-acknowledgments)

---

## Overview

**BlockCert** is a full-stack decentralized application (dApp) designed to address the critical global problem of document fraud. With over **500 million fake documents** circulating annually, this platform provides organizations with a secure way to issue tamper-proof digital credentials and enables instant verification by anyone, anywhere.

The system leverages:
- **Ethereum Blockchain** for immutable credential records
- **IPFS (via Pinata)** for decentralized document storage
- **SHA-256 Hashing** for document integrity verification
- **Cryptographic Security** for tamper-proof verification

---

## Problem Statement

This project addresses a **critical global problem** where over **500 million fake documents** circulate annually, causing significant losses to educational institutions, corporations, and government sectors.

### The Scale of the Problem

| Metric | Impact |
|--------|--------|
| **Annual Fraud Volume** | 500+ million counterfeit documents globally |
| **Verification Time** | 7-10 days for manual verification |
| **Falsification Rate** | ~60% of job applicants have false credentials |
| **Economic Impact** | Billions lost annually due to credential fraud |

### Key Problems Identified

| Problem | Description |
|---------|-------------|
| **Volume of Fraud** | Over 500 million counterfeit documents in circulation globally each year |
| **Slow Verification** | Manual verification takes 7-10 days, forcing HR departments to spend weeks on basic credential checks |
| **High Falsification Rate** | Around 60% of job applicants have at least one false credential on their resume |
| **Lack of Standardization** | Manual verification is costly, unreliable, with no uniform process across institutions |
| **Central Point of Failure** | Traditional systems depend on central servers, leading to downtime and performance issues |
| **Limited Security** | Current systems use basic encryption that cannot detect tampering effectively |
| **Poor Institutional Integration** | Low adoption across universities, private organizations, and government agencies |

---

## Solution

BlockCert provides a comprehensive solution to credential fraud:

| Feature | Benefit |
|---------|---------|
| **Immutable Proof** | Credentials stored on blockchain cannot be altered or deleted |
| **Instant Verification** | Anyone can verify a document in seconds, not days |
| **Decentralized Storage** | Documents persist on IPFS, immune to single points of failure |
| **Tamper Detection** | Any modification to the document invalidates its cryptographic hash |
| **Global Accessibility** | Verify credentials from anywhere in the world, 24/7 |
| **Cost Effective** | Eliminates expensive manual verification processes |
| **Standardized Process** | Uniform verification across all institutions |

---

## Features

### Organization Portal (Issuer)
- Upload PDF certificates/credentials
- Automatic SHA-256 hash generation
- Pin documents to IPFS via Pinata
- Record credential hash on Ethereum blockchain
- Receive IPFS CID for document retrieval
- Transaction confirmation and hash display

### Verifier Portal
- Upload any document to verify authenticity
- Compare document hash against blockchain records
- Instant valid/invalid feedback
- View document digital fingerprint

### Smart Contract
- Gas-efficient credential storage
- Public verification function
- Event emission for off-chain indexing
- Deployed on Sepolia Testnet

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   React.js      │────▶│   Express.js    │────▶│   Ethereum      │
│   Frontend      │     │   Backend       │     │   (Sepolia)     │
│                 │◀────│                 │◀────│                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │   Pinata IPFS   │
                        │   Storage       │
                        │                 │
                        └─────────────────┘
```

### Data Flow

1. **Issuing a Credential:**
   ```
   User uploads PDF → Backend generates SHA-256 hash → 
   File pinned to IPFS → Hash recorded on blockchain → 
   User receives CID + Transaction Hash
   ```

2. **Verifying a Credential:**
   ```
   User uploads PDF → Backend generates SHA-256 hash → 
   Hash checked against blockchain → Valid/Invalid result returned
   ```

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Styling |
| Axios | 1.x | HTTP Client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x+ | Runtime |
| Express | 5.x | Web Framework |
| Ethers.js | 6.x | Blockchain Interaction |
| Multer | 2.x | File Upload Handling |
| Pinata SDK | 2.x | IPFS Integration |

### Blockchain
| Technology | Version | Purpose |
|------------|---------|---------|
| Solidity | 0.8.28 | Smart Contract |
| Hardhat | 2.x | Development Framework |
| Sepolia | - | Test Network |

---

## Installation

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- MetaMask wallet with Sepolia ETH
- Pinata account (free tier available)
- Alchemy/Infura account for RPC access

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blockcert.git
cd blockcert
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Blockchain Configuration
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_wallet_private_key_without_0x
CONTRACT_ADDRESS=0x052D9711c86B2E84d1C42c74fBf3F614D80C3796

# Pinata IPFS Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Compile Smart Contract (Optional)

If you want to deploy your own contract:

```bash
cd backend
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/CredentialVerifier.js --network sepolia
```

---

## Usage

### Start the Backend Server

```bash
cd backend
npm run dev
```

Server will start at `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

Application will be available at `http://localhost:5173`

### Running Local Blockchain (Development)

```bash
cd backend
npm run blockchain  # Starts Hardhat local node
```

---

## API Reference

### Base URL
```
http://localhost:5000/api/docs
```

### Endpoints

#### Issue Credential

```http
POST /upload
Content-Type: multipart/form-data
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `certificate` | `file` | PDF file to issue |

**Response:**
```json
{
  "message": "Certificate Issued, Pinned to IPFS & Secured on Blockchain!",
  "filename": "certificate.pdf",
  "digitalFingerprint": "a3f2b8c9d1e4...",
  "ipfsCID": "QmXoYp...",
  "transactionHash": "0x7f9e..."
}
```

#### Verify Credential

```http
POST /verify
Content-Type: multipart/form-data
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `certificate` | `file` | PDF file to verify |

**Response (Valid):**
```json
{
  "status": "Valid",
  "message": "This document is AUTHENTIC.",
  "digitalFingerprint": "a3f2b8c9d1e4..."
}
```

**Response (Invalid):**
```json
{
  "status": "Invalid",
  "message": "This document is FAKE or has been tampered with.",
  "digitalFingerprint": "b4e3c9a2f1d5..."
}
```

---

## Smart Contract

### Contract Address (Sepolia)
```
0x052D9711c86B2E84d1C42c74fBf3F614D80C3796
```

### Key Functions

```solidity
// Issue a new credential (write hash to blockchain)
function issueCredential(string memory _hash) public

// Verify a credential (check if hash exists)
function verifyCredential(string memory _hash) public view returns (bool)
```

### Events

```solidity
event DocumentVerified(string documentHash, uint256 timestamp)
```

---

## Project Structure

```
blockchain/
├── backend/
│   ├── contracts/
│   │   └── CredentialVerifier.sol    # Smart contract
│   ├── controllers/
│   │   └── docController.js          # Business logic
│   ├── routes/
│   │   └── docRoutes.js              # API routes
│   ├── ignition/
│   │   └── modules/                  # Deployment scripts
│   ├── artifacts/                    # Compiled contracts
│   ├── server.js                     # Express server
│   ├── hardhat.config.js             # Hardhat configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Issuer.jsx            # Issuer portal
│   │   │   └── Verifier.jsx          # Verifier portal
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Readme.md
```

---

## Roadmap

### Version 1.0 (Current)
- [x] Basic credential issuance
- [x] Document verification
- [x] IPFS storage integration
- [x] Sepolia testnet deployment
- [x] React frontend with Tailwind CSS

### Version 1.1 (In Progress)
- [ ] User authentication (JWT/OAuth)
- [ ] Credential expiration dates
- [ ] Batch credential issuance
- [ ] QR code generation for credentials
- [ ] Email notifications

### Version 2.0 (Planned)
- [ ] Multi-chain support (Polygon, BSC)
- [ ] Credential templates
- [ ] Organization dashboard with analytics
- [ ] Revocation functionality
- [ ] Mobile responsive improvements
- [ ] Dark mode support

### Version 3.0 (Future)
- [ ] Mobile applications (iOS/Android)
- [ ] API rate limiting and authentication
- [ ] Credential sharing via shareable links
- [ ] Integration with LinkedIn/Social profiles
- [ ] Mainnet deployment
- [ ] DAO governance for organizations

---


## Acknowledgments

- [Ethereum Foundation](https://ethereum.org/) - Blockchain platform
- [Hardhat](https://hardhat.org/) - Development environment
- [Pinata](https://pinata.cloud/) - IPFS pinning service
- [Alchemy](https://www.alchemy.com/) - Blockchain infrastructure
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract resources

---

<p align="center">
  Made with care for the decentralized future
</p>


