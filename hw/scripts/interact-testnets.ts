import hre from 'hardhat';
const ethers = hre.ethers;
const Library = require('../artifacts/contracts/Library.sol/Library.json')

async function interact() {
    const provider = new hre.ethers.providers.InfuraProvider("goerli", "6b36b2e9d5e14cc4af78d5e905cc38f7")
    const latestBlock = await provider.getBlock("latest")
    console.log("hash of latest block is: "+ latestBlock.hash)

    const wallet = new hre.ethers.Wallet("42575f4941c226ecd6180a70e8aaa7063ca935253a4966640b4adf308e4ba8bd", provider);
    const balance = await wallet.getBalance();
    console.log("balance is: " + hre.ethers.utils.formatEther(balance))

    const contractAddress = "<replace this with goerli contract address>"
    const library = new hre.ethers.Contract(contractAddress, Library.abi, wallet)
    console.log("contract is: " + library)

    await library.addNewBook("book1", "author1", 1)

    let record = await library.seeRecord("book1")
    let availability = await library.isAvailable("book1")
    console.log("record: " + record)
    console.log("availability: " + availability)

    await library.borrowBook("book1")

    record = await library.seeRecord("book1")
    availability = await library.isAvailable("book1")
    console.log("record: " + record)
    console.log("availability: " + availability)

    await library.returnBook("book1")

    record = await library.seeRecord("book1")
    availability = await library.isAvailable("book1")
    console.log("record: " + record)
    console.log("availability: " + availability)
}

interact().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

module.exports = interact;
