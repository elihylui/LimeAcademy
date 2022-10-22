import { ethers } from "hardhat";

async function main() {
  const USElection = await ethers.getContractFactory("USElection");
  const usElection = await USElection.deploy();
  await usElection.deployed();
  console.log("USElection deployed to:", usElection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
