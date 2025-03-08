require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY.trim(); // Trim extra spaces or newlines

module.exports = {
  solidity: "0.8.20",
  networks: {
    eduChain: {
      url: "https://rpc.open-campus-codex.gelato.digital", // Replace with actual RPC URL
      accounts: [privateKey] // Use trimmed key
    }
  }
};
