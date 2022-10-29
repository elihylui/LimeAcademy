import hre from 'hardhat';
const ethers = hre.ethers;

async function main() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const Library = await hre.ethers.getContractFactory("Library");
  const library = await Library.deploy();
  await library.deployed();
  console.log("library deployed to:", library.address);

  // await hre.run("verify:verify", {
  //   address: library.address,
  //   constructorArguments: [
  //   ],
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = main;
