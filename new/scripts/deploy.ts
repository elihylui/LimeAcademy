import hre from 'hardhat';
const ethers = hre.ethers;

async function main() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const USElection = await hre.ethers.getContractFactory("USElection");
  const usElection = await USElection.deploy();
  await usElection.deployed();
  console.log("USElection deployed to:", usElection.address);

  await hre.run("verify:verify", {
    address: usElection.address,
    constructorArguments: [
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = main;
