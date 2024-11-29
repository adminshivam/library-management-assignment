import * as C from '../config/common';
import { Library } from '../repository/library.entity';
import { lock } from '../utils/mutex.util';

export class LoanService {
    constructor(private library: Library) {}

    async borrowBook(memberId: number, isbn: string): Promise<boolean> {
        const release = await lock.acquire();
        try {
            const book = this.library.books.get(isbn);
            if (!book) throw new Error(`Book with ISBN ${isbn} does not exist.`);
            
            const member = this.library.members.get(memberId);
            if (!member) throw new Error(`Member with ID ${memberId} does not exist.`);
            
            const loan = this.library.loans.get(memberId);


            if (loan && Object.keys(loan as object).length >= C.BORROW_CAP) throw new Error(`Member cannot borrow more than ${C.BORROW_CAP} books.`);
            if (book.availableCopies <= 0) throw new Error(`No copies of the book are available.`);

            const borrowedDate = new Date();
            const dueDate = new Date();
            dueDate.setDate(borrowedDate.getDate() + C.LEASE_DAYS);

            this.library.loans.set(memberId, { [isbn] : { borrowedDate, dueDate } });
            book.availableCopies -= 1;
            return true;
        } catch(error) {
            return false;
        } finally {
            release();
        }
    }

    async returnBook(memberId: number, isbn: string): Promise<number> {
        const release = await lock.acquire();
        try {
            const member = this.library.members.get(memberId);
            if (!member) throw new Error(`Member with ID ${memberId} does not exist.`);

            const loans = this.library.loans.get(memberId);
            if(!loans?.[isbn]) throw new Error(`Book with ISBN ${isbn} was not borrowed.`);

            const borrowedBook = loans[isbn];
            const returnDate = new Date();
            const overdueDays = Math.max(
                0,
                Math.ceil((returnDate.getTime() - borrowedBook.dueDate.getTime()) / (1000 * 60 * 60 * 24))
            );
            const lateFee = overdueDays * 1;

            const book = this.library.books.get(isbn)!;
            book.availableCopies += 1;

            const memberLoans = this.library.loans.get(memberId);

            if (memberLoans && isbn in memberLoans) {
                delete memberLoans[isbn]; // Remove the book from the loans object
            }

            return lateFee;
        } finally {
            release();
        }
    }

    async viewLoans(): Promise<typeof this.library.loans> {
        return await this.library.loans;
    }
}
