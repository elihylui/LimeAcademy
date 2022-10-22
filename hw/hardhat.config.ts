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
    goerli: {
      url: `${process.env.INFURA_API_KEY}`,
      accounts: [`0x42575f4941c226ecd6180a70e8aaa7063ca935253a4966640b4adf308e4ba8bd`, 
    ]
    }
  }
};

export default config;
