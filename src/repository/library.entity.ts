import { Book } from '../interface/Book';
import { Member } from '../interface/Member';
import { Loan } from '../interface/Loan';

class Library {
    books: Map<string, Book> = new Map();
    members: Map<number, Member> = new Map();
    loans: Map<number, Loan> = new Map();
}

// Singleton instance for creating a new Library through application lifecycle.
const libraryInstance = new Library();

export { libraryInstance, Library };