// ignition/modules/CredentialVerifier.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CredentialVerifierModule", (m) => {
  // This tells Hardhat: "Please deploy the contract named CredentialVerifier"
  const verifier = m.contract("CredentialVerifier");

  return { verifier };
});
