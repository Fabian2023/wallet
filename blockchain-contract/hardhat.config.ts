import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {}, // Red local sin necesidad de ETH
  },
};

export default config;
