import { ethers } from "hardhat";
import {expect} from "chai";

describe("USElection", function () {   

    // this.beforeEach(async () => {

    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    //     //return await usElection.deployed();
    //     return {usElection};
    // });

    // this.beforeEach(async() => {
    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    // })

    it("Should return the current leader before submit any election results", async function () {
        const usElectionFactory = await ethers.getContractFactory("USElection");
        const usElection = await usElectionFactory.deploy();

        expect(await usElection.currentLeader()).to.equal(0);
    });

    it("Should return the election status", async function () {
        const usElectionFactory = await ethers.getContractFactory("USElection");
        const usElection = await usElectionFactory.deploy();

        expect(await usElection.electionEnded()).to.equal(false); 
    });

    // it("Should submit state results and get current leader", async function () {
    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    //     const stateResults = ["California",1000,900,32];
    //     const submitStateResultsTx = await usElection.submitStateResult(stateResults);

    //     await submitStateResultsTx.wait();

    //     expect(await usElection.currentLeader()).to.equal(1); // BIDEN

    // });

    // it("Should throw when try to submit already submitted state results", async function () {
    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    //     const stateResults = ["California",1000,900,32];

    //     expect(usElection.submitStateResult(stateResults)).to.be.revertedWith('This state result was already submitted!');
    // });

    // it("Should submit state results and get current leader", async function () {
    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    //     const stateResults = ["Ohaio",800,1200,33];
    //     const submitStateResultsTx = await usElection.submitStateResult(stateResults);

    //     await submitStateResultsTx.wait();

    //     expect(await usElection.currentLeader()).to.equal(2); // TRUMP
    // });

    // it("Should end the elections, get the leader and election status", async function () {
    //     const usElectionFactory = await ethers.getContractFactory("USElection");
    //     const usElection = await usElectionFactory.deploy();
    //     const endElectionTx = await usElection.endElection();

    //     await endElectionTx.wait();

    //     expect(await usElection.currentLeader()).to.equal(2); // TRUMP
    //     expect(await usElection.electionEnded()).to.equal(true); // Ended

    // });

});