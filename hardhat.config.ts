import { HardhatUserConfig } from "hardhat/config";
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
    rinkeby: {
      url: "https://goerli.infura.io/v3/6b36b2e9d5e14cc4af78d5e905cc38f7",
      accounts: ['42575f4941c226ecd6180a70e8aaa7063ca935253a4966640b4adf308e4ba8bd']
    }
  }
};

export default config;
