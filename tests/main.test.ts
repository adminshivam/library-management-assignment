// Code to test
import { MemberService } from '../src/service/member.service';
import { BookService } from '../src/service/book.service';
import { LoanService } from '../src/service/loan.service';

import * as C from '../src/config/common';

// Get in-memory library
import { libraryInstance } from '../src/repository/library.entity';

import { Member } from '../src/interface/Member';
import { Book } from '../src/interface/Book';

describe('Member Module Test Cases', () => {
    test('create a new memmber for library', async () => {
        const memberService: MemberService = new MemberService(libraryInstance);
        const payload: Member = { id: 1, name: "shivam" };
        const result = await memberService.addMember(payload);
        expect(result).toStrictEqual({
            "id": 1, 
            "name": "shivam"
        });
    });
});

describe('Book Module Test Cases', () => {
    test('Add a new book in library', async () => {
        const bookService: BookService = new BookService(libraryInstance);
        const payload: Book = {
            "isbn": "twrzb689bt",
            "title": "Elon Musk Biography",
            "author": "Elon Musk",
            "publicationYear" : 2020,
            "totalCopies" : 10,
            "availableCopies" : 10,
        };
        const result = await bookService.addBook(payload);

        expect(result).toStrictEqual({
            "isbn": "twrzb689bt",
            "title": "Elon Musk Biography",
            "author": "Elon Musk",
            "publicationYear": 2020,
            "totalCopies": 10,
            "availableCopies": 10
        });
    });

    test('Add a new book in library', async () => {
        const bookService: BookService = new BookService(libraryInstance);
        const payload: Book = {
            "isbn": "twrzb689bz",
            "title": "Bill Gates Biography",
            "author": "Bill Gates",
            "publicationYear" : 2012,
            "totalCopies" : 10,
            "availableCopies" : 10,
        };
        const result = await bookService.addBook(payload);

        expect(result).toStrictEqual({
            "isbn": "twrzb689bz",
            "title": "Bill Gates Biography",
            "author": "Bill Gates",
            "publicationYear" : 2012,
            "totalCopies" : 10,
            "availableCopies" : 10,
        });
    });

    test('Update a new book in library', async () => {
        const bookService: BookService = new BookService(libraryInstance);
        const payload: Partial<Book> = {
            "title": "Elon Musk's Biography",
            "author": "Elon Musk",
            "publicationYear" : 2022,
            "totalCopies" : 10,
            "availableCopies" : 10,
        };
        const result = await bookService.updateBook("twrzb689bt", payload);

        expect(result).toStrictEqual({
            "isbn": "twrzb689bt",
            "title": "Elon Musk's Biography",
            "author": "Elon Musk",
            "publicationYear": 2022,
            "totalCopies": 10,
            "availableCopies": 10
        });
    });

    test('Delete a book in library', async () => {
        const bookService: BookService = new BookService(libraryInstance);
        const result = await bookService.removeBook("twrzb689bz");

        expect(result).toStrictEqual(true);
    });

    test('Search a book in library', async () => {
        const bookService: BookService = new BookService(libraryInstance);
        const payload: Partial<Book> = {
            "isbn": "twrzb689bt",
            "title": "Elon",
            "author": "Musk",
        };
        const result = bookService.searchBooks(payload);

        expect(result).toStrictEqual([{
            "isbn": "twrzb689bt",
            "title": "Elon Musk's Biography",
            "author": "Elon Musk",
            "publicationYear": 2022,
            "totalCopies": 10,
            "availableCopies": 10
        }]);
    });
});

describe('Loan Module Test Cases', () => {
    test('Borrow a book from library', async () => {
        const loanService: LoanService = new LoanService(libraryInstance);
        const result = await loanService.borrowBook(1, "twrzb689bt");
        expect(result).toStrictEqual(true);
    });

    test('View Loans from library', async () => {
        const loanService: LoanService = new LoanService(libraryInstance);

        const result = await loanService.viewLoans();

        const borrowedDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(borrowedDate.getDate() + C.LEASE_DAYS);
        
        console.log("result");
        console.log(result);

        const obj = Object.fromEntries(result);

        expect(obj).toStrictEqual({
            '1': {
                twrzb689bt: {
                    borrowedDate: obj['1']["twrzb689bt"].borrowedDate, 
                    dueDate: obj['1']["twrzb689bt"].dueDate
                }
            }
        });
    });

    test('Return a book from library', async () => {
        const loanService: LoanService = new LoanService(libraryInstance);

        const result = await loanService.returnBook(1, "twrzb689bt");

        expect(result).toStrictEqual(0);
    });

});