// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract EtherGame {
    uint public targetAmount = 3 ether;
    uint public balance;
    address public winner;

    function deposit() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");

        balance += msg.value;
        require(balance <= targetAmount, "Game is over");

// This vulnerability arises from the misuse of this.balance. Your contract should avoid being dependent on the exact values of the balance of the contract because it can be artificially manipulated.
// If exact values of deposited ether are required, a self-defined variable should be used that gets incremented in payable functions, to safely track the deposited ether. This can prevent your contract to be influenced by the forced ether sent via a selfdestruct() call.

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}