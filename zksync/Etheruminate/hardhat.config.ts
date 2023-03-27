import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

require("dotenv").config()

module.exports = {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkTestnet",
  networks: {
    zkTestnet: {
      url: "https://zksync2-testnet.zksync.dev", // URL of the zkSync network RPC
      ethNetwork: "https://eth-goerli.g.alchemy.com/v2/8pjvTLWK2Cr0bCf04Ih4IlkLRq5o82UO", 
      zksync: true,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    },
  },
  etherscan: {
    apiKey: 'RJQZ7PTEDJ6QEDUBA2FII9KG8VUJA78F3P'
  },
  solidity: {
    version: "0.8.12",
  },
};
