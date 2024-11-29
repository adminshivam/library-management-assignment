import { Book } from '../interface/Book';
import { Library } from '../repository/library.entity';
import { lock } from '../utils/mutex.util';

export class BookService {
    constructor(private library: Library) {}

    async addBook(book: Book): Promise<Book> {
        const release = await lock.acquire();
        try {
            if (this.library.books.has(book.isbn)) {
                throw new Error(`Book with ISBN ${book.isbn} already exists.`);
            }
            this.library.books.set(book.isbn, { ...book });
            return this.library.books.get(book.isbn) as Book;
        } finally {
            release();
        }
    }

    async updateBook(isbn: string, updatedBook: Partial<Book>): Promise<Book | undefined> {
        const release = await lock.acquire();
        try {
            if (!this.library.books.has(isbn)) {
                throw new Error(`Book with ISBN ${isbn} does not exist.`);
            }
            this.library.books.set(isbn, {...this.library.books.get(isbn),...updatedBook as Book });
            return this.library.books.get(isbn);
        } finally {
            release();
        }
    }

    async removeBook(isbn: string): Promise<boolean> {
        const release = await lock.acquire();
        try {
            if (!this.library.books.has(isbn)) {
                throw new Error(`Book with ISBN ${isbn} does not exist.`);
            }
            return this.library.books.delete(isbn);
        } finally {
            release();
        }
    }

    searchBooks(query: { isbn?: string; title?: string; author?: string }): Book[] {
        return Array.from(this.library.books.values()).filter((book) => {
            return (
                (!query.isbn || book.isbn === query.isbn) &&
                (!query.title || book.title.toLowerCase().includes(query.title.toLowerCase())) &&
                (!query.author || book.author.toLowerCase().includes(query.author.toLowerCase()))
            );
        });
    }
}
