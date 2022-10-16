// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Library is Ownable {

using Counters for Counters.Counter;

Counters.Counter private id;

struct Book {
    string name;
    Counters.Counter id;
    address user;
    uint copies;
}

Book[] public books;

event bookAdded(
    string name,
    Counters.Counter id,
    address user,
    uint copies
);

event bookBorrowed(
    string name,
    Counters.Counter id,
    address user
);

event bookReturned(
    string name,
    Counters.Counter id,
    address user
);

function addNewBook (string memory _name, uint _copies) external onlyOwner {
    require(_copies >= 1, "must at least add one copy of a book");
    books.push(Book(_name, id, address(0), _copies));
    emit bookAdded(
        _name,
        id,
        address(0),
        _copies
    );
    id.increment();
}

function borrowBook (uint _id) public {
    require(books[_id].copies >=1, "no available copy for this book");
    books[_id].user =msg.sender;
    books[_id].copies--;
    emit bookBorrowed (
        books[_id].name,
        id,
        msg.sender
    );
}

function returnBook (uint _id) public {
    require(books[_id].user == msg.sender, "you don't have this book.");
    books[_id].user =address(0);
    books[_id].copies++;
    emit bookReturned (
        books[_id].name,
        id,
        address(0)
    );
}

function seeRecord () public view returns(Book[] memory) {
    return books;
}

}