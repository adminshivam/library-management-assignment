import { Router, Request, Response } from 'express';
import { BookService } from '../service/book.service';
import { libraryInstance } from '../repository/library.entity';
import { Book } from '../interface/Book';
import { CreateBookDTO, DeleteBookDTO, SearchBookDTO, UpdateBookDTO } from '../dto/book.dto';
import { validateDTO } from '../utils/validator.util';

const router = Router();

router.post('/', async (req: Request, res: Response) => {

    const { isbn, title, author, publicationYear, totalCopies } = req.body;
    
    const availableCopies = totalCopies;

    const bookService: BookService = new BookService(libraryInstance);
    
    const bookDetails: Book = {
        isbn,
        title,
        author,
        publicationYear,
        totalCopies,
        availableCopies,
    };
    
    try {
        await validateDTO(CreateBookDTO, bookDetails);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        await bookService.addBook(bookDetails);
        
        // Return the created user
        res.status(201).json({ status: true, message: 'Book inserted sucessfully.', data: bookDetails });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Unable to insert member | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

router.patch('/', async (req: Request, res: Response) => {

    const { isbn, title, author, publicationYear, totalCopies, availableCopies } = req.body;

    const bookService: BookService = new BookService(libraryInstance);
    
    const bookDetails: Partial<Book> = {
        title,
        author,
        publicationYear,
        totalCopies,
        availableCopies,
    };

    try {
        await validateDTO(UpdateBookDTO, bookDetails);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }
    
    try {
        // Add member to the in-memory database
        const updatedBook = await bookService.updateBook(isbn, bookDetails);
        
        // Return the created user
        res.status(201).json({ status: true, message: 'Book Updated sucessfully.', data: updatedBook });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E002 | Unable to insert member | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

router.delete('/:isbn', async (req: Request, res: Response) => {

    const { isbn } = req.params;

    const bookService: BookService = new BookService(libraryInstance);

    try {
        await validateDTO(DeleteBookDTO, req.params);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        const deleted = await bookService.removeBook(isbn);
        
        // Return the created user
        res.status(201).json({ status: true, message: `Book with isbn ${isbn} Deleted sucessfully.`, data: deleted });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E003 | Unable to delete book | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get('/search', async (req: Request, res: Response) => {

    const bookService: BookService = new BookService(libraryInstance);
    const bookSearchQuery = req.query;
    
    try {
        await validateDTO(SearchBookDTO, bookSearchQuery);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {


        // Add member to the in-memory database
        const resultBooks = bookService.searchBooks(bookSearchQuery);
        
        // Return the created user
        res.status(201).json({ status: true, message: 'Books fetched sucessfully.', data: resultBooks });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E004 | Unable to insert member | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;
