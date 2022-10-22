// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Library is Ownable {

    uint private _id;

    struct Book {
        string name; //hash this string if possible
        string author;
        uint id;
        uint8 copies;
        address[] user;
    }

    mapping(string => Book) bookMap;

    event bookAdded(
        Book
    );

    event bookBorrowed(
        string _name,
        uint8 copies,
        address
    );

    event bookReturned(
        string _name,
        uint8 copies
    );

    function bookExists (string memory _name) public view returns (bool) {
        if (bytes(bookMap[_name].name).length != 0) {
            return true;
        } else return false;
    }

    function addNewBook (string memory _name, string memory _author, uint8 _copies) external onlyOwner {
        require(bytes(_name).length >0, "name of book cannot be empty");
        require(!bookExists(_name), "this book already exists");
        require(bytes(_author).length >0, "author cannot be empty");
        require(_copies >= 1, "must at least add one copy of a book");
        Book storage newBook = bookMap[_name];
        newBook.name = _name;
        newBook.author = _author;
        newBook.id = _id;
        newBook.copies = _copies;
        emit bookAdded(
            newBook
        );
        _id++;
    }

    function alreadyBorrowed(string memory _name) public view returns (bool) {
        for (uint i=0; i < bookMap[_name].user.length; i++) {
            if (bookMap[_name].user[i]==msg.sender) {
                return true;
            }
        }
    }

    function borrowBook (string memory _name) public {
        require(bookMap[_name].copies >0, "no available copy for this book");
        require(!alreadyBorrowed(_name), "you have already borrowed this book");
        bookMap[_name].user.push(msg.sender);
        bookMap[_name].copies--;
        emit bookBorrowed (
            _name,
            bookMap[_name].copies,
            msg.sender
        );
    }

    function findAndDelete (string memory _name) internal {
        for (uint i=0; i<bookMap[_name].user.length; i++) {
            if (bookMap[_name].user[i] == msg.sender) {
                delete bookMap[_name].user[i];
            }
        }
    }

    function returnBook (string memory _name) public {
        require(alreadyBorrowed(_name), "you don't have this book.");
        findAndDelete(_name);
        bookMap[_name].copies++;
        emit bookReturned (
            _name,
            bookMap[_name].copies
        );
    }

    function isAvailable(string memory _name) public view returns (bool) {
        require(bookExists(_name), "this book doesn not exist");
            if (bookMap[_name].copies > 0) {
                return true;
            } else return false;
    }

    function seeRecord (string memory _name) public view returns(address  [] memory) {
        return bookMap[_name].user;
    }
}
