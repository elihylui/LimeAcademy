import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{  version: "0.8.17",}],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/6b36b2e9d5e14cc4af78d5e905cc38f7",
      accounts: ['42575f4941c226ecd6180a70e8aaa7063ca935253a4966640b4adf308e4ba8bd']
    }
  },
  etherscan: {
    apiKey: {
      goerli:"WZE8DMYZK5EZXV78123DVVZGGEQG3Q68UY",
    }
  }
};

task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async () => {
        const main = require("./scripts/deploy");
        await main();
    });

// task("deploy-mainnet", "Deploys contract on a provided network")
// .addParam("privateKey", "Please provide the private key")
// .setAction(async ({privateKey}) => {
//     const deployElectionContract = require("./scripts/deploy-with-param");
//     await deployElectionContract(privateKey);
// });

export default config;
