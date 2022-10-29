import hre from 'hardhat';
const ethers = hre.ethers;
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')

async function interact() {
    const provider = new hre.ethers.providers.InfuraProvider("goerli", "6b36b2e9d5e14cc4af78d5e905cc38f7")
    const latestBlock = await provider.getBlock("latest")
    console.log("hash of latest block is: "+ latestBlock.hash)

    const wallet = new hre.ethers.Wallet("42575f4941c226ecd6180a70e8aaa7063ca935253a4966640b4adf308e4ba8bd", provider);
    const balance = await wallet.getBalance();
    console.log("balance is: " + hre.ethers.utils.formatEther(balance))

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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
