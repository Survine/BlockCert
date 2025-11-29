// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CredentialVerifier {
    
    // 1. DEFINE THE STRUCTURE (New!)
    // We group the Hash and the CID together into one object
    struct Credential {
        string documentHash;
        string ipfsCID;
        uint256 timestamp;
    }

    // 2. Verification Ledger
    mapping(string => bool) private documents;

    // 3. Student Ledger
    // CHANGED: We now store a list of 'Credential' objects, not just strings
    mapping(address => Credential[]) private studentCredentials;

    event DocumentVerified(string documentHash, string ipfsCID, uint256 timestamp);

    // 4. ISSUE CREDENTIAL
    // CHANGED: We now need the '_ipfsCID' as an input too!
    function issueCredential(string memory _hash, string memory _ipfsCID, address _student) public {
        documents[_hash] = true;
        
        // Create the new object
        Credential memory newCert = Credential({
            documentHash: _hash,
            ipfsCID: _ipfsCID,
            timestamp: block.timestamp
        });

        // Add it to the student's list
        studentCredentials[_student].push(newCert);
        
        emit DocumentVerified(_hash, _ipfsCID, block.timestamp);
    }

    // 5. VERIFY CREDENTIAL (Stays the same)
    function verifyCredential(string memory _hash) public view returns (bool) {
        return documents[_hash];
    }

    // 6. GET CERTIFICATES
    // CHANGED: Returns the list of 'Credential' structs
    function getCertificates(address _student) public view returns (Credential[] memory) {
        return studentCredentials[_student];
    }
}