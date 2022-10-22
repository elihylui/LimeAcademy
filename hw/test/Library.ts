import { ethers } from "hardhat";
import { expect } from "chai";

describe("Library", function() {

    // before(async function () {
    //     this.Library = await ethers.getContractFactory("Library");
    //   });

    // beforeEach(async function () {
    //     this.library = await this.Library.deploy();
    //     await this.library.deployed();
    // });
    
    describe("addNewBook", function() {

        it("should be able to add books", async function () {
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();

            expect(await library.addNewBook("book1", "author1", 1))
            .to.emit(library, "bookAdded")
            .withArgs("book1", "author1", 0, 1)
        })

        it("should revert with error if name is empty", async function () {
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            
            expect(library.addNewBook("", "author1", 1))
            .to.be.revertedWith("name of book cannot be empty");
        })

        it("should revert with error if author is empty", async function () {
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            
            expect(library.addNewBook("book1", "", 1))
            .to.be.revertedWith("name of author cannot be empty");
        })

        it("should revert with error if copy is zero", async function () {
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            
            expect(library.addNewBook("book1", "", 0))
            .to.be.revertedWith("must at least add one copy of a book");
        })

        it("should revert with error if the book with the same name already exists", async function () {
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);

            expect(library.addNewBook("book1", "author1", 1))
            .to.be.revertedWith("this book already exists");
        })
    })

    // describe("alreadyBorrowed", function(){
    //     it("should return true if the book is borrowed by the caller", async function(){
    //         const Library = await ethers.getContractFactory("Library");
    //         const library = await Library.deploy();
    //         library.addNewBook("book1", "author1", 1);
    //         library.borrowBook("book1");

    //         const result = await library.alreadyBorrowed("book1");
    //         expect(result).to.equal(true);
    //     })

    //     it("should return true if the book is borrowed by the caller", async function(){
    //         const Library = await ethers.getContractFactory("Library");
    //         const library = await Library.deploy();
    //         library.addNewBook("book1", "author1", 1);

    //         const result = await library.alreadyBorrowed("book1");
    //         expect(result).to.equal(false);
    //     })

    //     it("should revert with error if the book does not exist", async function(){
    //         const Library = await ethers.getContractFactory("Library");
    //         const library = await Library.deploy();

    //         expect(library.alreadyBorrowed("book1"))
    //         .to.be.revertedWith("this book does not exist");
    //     })
    // })

    describe("borrowBook", function(){
        it("should allow users to borrow book and emit bookBorrowed event", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            const [owner] = await ethers.getSigners();
            library.addNewBook("book1", "author1", 1);

            expect(library.borrowBook("book1"))
            .to.emit(library, "bookBorrowed")
            .withArgs("book1", 0, owner)
        })

        it("should revert with error if there is no available copy", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);
            library.borrowBook("book1");

            expect(library.borrowBook("book1"))
            .to.be.revertedWith("no available copy for this book");
        })

        it("should revert with error if user already borrowed this book", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 2);
            library.borrowBook("book1");

            expect(library.borrowBook("book1"))
            .to.be.revertedWith("no available copy for this book");
        })
    })

    describe("returnBook", function(){
        it("should allow users to return book and emit bookReturned event", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);
            library.borrowBook("book1");

            expect(library.returnBook("book1"))
            .to.emit(library, "bookReturned")
            .withArgs("book1", 1);
        })

        it("should revert with error with the book does not exist ", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();

            expect(library.returnBook("book1"))
            .to.be.revertedWith("this book does not exist");
        })

        it("should revert with error with the user does not have this book ", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);

            expect(library.returnBook("book1"))
            .to.be.revertedWith("you don't have this book");
        })
    })

    describe("isAvailable", function(){
        it("should return true if the book is available", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);

            const result = await library.isAvailable("book1");

            expect(result).to.equal(true);
        })

        it("should return false if the book is not available", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            library.addNewBook("book1", "author1", 1);
            library.borrowBook("book1");

            const result = await library.isAvailable("book1");

            expect(result).to.equal(false);
        })

        it("should revert with error if the book does not exist", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            const [owner] = await ethers.getSigners();
            
            expect(library.isAvailable("book1"))
            .to.be.revertedWith("this book does not exist");
        })
    })

    describe("seeRecord", function(){
        it("should return list of addresses of users who have borrowed that book", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            const [user] =  await ethers.getSigners();
            library.addNewBook("book1", "author1", 1);
            library.borrowBook("book1");

            const result = await library.seeRecord("book1");

            expect(result[0]).to.equal(user.address);
        })

        it("should return list of addresses of users who have borrowed that book", async function(){
            const Library = await ethers.getContractFactory("Library");
            const library = await Library.deploy();
            const [user1, user2] =  await ethers.getSigners();
            library.addNewBook("book1", "author1", 2);
            await library.connect(user1).borrowBook("book1");
            await library.connect(user2).borrowBook("book1");

            const result = await library.seeRecord("book1");    
            
            expect(result[0]).to.equal(user1.address);
            expect(result[1]).to.equal(user2.address);
        })
    })
})