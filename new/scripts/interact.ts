import hre from 'hardhat';
const ethers = hre.ethers;
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')

async function interact() {
    const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
    const latestBlock = await provider.getBlock("latest")
    console.log("hash of latest block is: "+ latestBlock.hash)

    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();
    console.log("balance is: " + hre.ethers.utils.formatEther(balance))

    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet)
    console.log("contract is: " + electionContract)

    const hasEnded = await electionContract.electionEnded()
    console.log("The election has ended:", hasEnded)

    const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
    console.log("Have results for Ohio:", haveResultsForOhio)

    const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
    const transactionReceipt = await transactionOhio.wait();
    if (transactionReceipt.status != 1) { // 1 means success
        console.log("Transaction was not successful");
        return 
    } else {
        console.log("Transaction was successful");
    }

    const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
    console.log("Results submitted for Ohio", resultsSubmittedOhioNew)

    const currentLeader = await electionContract.currentLeader()
    console.log("Current leader is: " + currentLeader);
}

interact().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = interact;
