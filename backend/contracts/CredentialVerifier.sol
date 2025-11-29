// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28; // We use a modern version

contract CredentialVerifier {
    
    // 1. THE STORAGE (The Stone Tablet)
    // We map a "Digital Fingerprint" (string) to a "Boolean" (true/false)
    // If a hash is in here, it means it is VALID.
    mapping(string => bool) private documents;

    // 2. THE EVENT (The Town Crier)
    // When we add a document, we shout it out so the world knows.
    event DocumentVerified(string documentHash, uint256 timestamp);

    // 3. THE FUNCTION (The Chisel)
    // Only we can call this to add a new document.
    function issueCredential(string memory _hash) public {
        // Write it to the blockchain
        documents[_hash] = true;

        // Shout it out
        emit DocumentVerified(_hash, block.timestamp);
    }

    // 4. THE VERIFIER (The Reader)
    // Anyone can call this to check if a document is real.
    function verifyCredential(string memory _hash) public view returns (bool) {
        return documents[_hash];
    }
}