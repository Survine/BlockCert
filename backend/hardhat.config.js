require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // <--- Load your secrets

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // We define the new network here
    sepolia: {
      url: process.env.RPC_URL,      // The Alchemy Doorway
      accounts: [process.env.PRIVATE_KEY], // Your Wallet Signature
    },
  },
};