const run = async function() {
    console.log("Hello world");
    console.log(hre.ethers.version);

    const provider = new hre.ethers.providers.JsonRpcProvider("HTTP://172.27.224.1:7545")
    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock.hash)

    const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();
    console.log(hre.ethers.utils.formatEther(balance, 18))
    console.log(balance.toString())
    }

run()