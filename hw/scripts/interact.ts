import hre from 'hardhat';
const ethers = hre.ethers;
const Library = require('../artifacts/contracts/Library.sol/Library.json')

async function interact() {
    const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
    const latestBlock = await provider.getBlock("latest")
    console.log("hash of latest block is: "+ latestBlock.hash)

    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();
    console.log("balance is: " + hre.ethers.utils.formatEther(balance))

    const contractAddress = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82"
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
