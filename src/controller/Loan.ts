import { Router, Request, Response } from 'express';
import { LoanService } from '../service/loan.service';
import { libraryInstance } from '../repository/library.entity';
import { BorrowBookDTO, ReturnBookDTO, ViewLoanDTO } from '../dto/loan.dto';
import { validateDTO } from '../utils/validator.util';

const router = Router();

router.post('/borrow', async (req: Request, res: Response) => {

    const { isbn, memberId } = req.body;
    
    const loanService: LoanService = new LoanService(libraryInstance);
    
    try {
        await validateDTO(BorrowBookDTO, req.body);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        const result = await loanService.borrowBook(memberId, isbn);
        
        // Return the created user
        res.status(201).json({ status: true, message: `Book with isbn ${isbn} borrowed by member ${memberId} sucessfully.`, data: result });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-L-E001 | Unable to borrow book | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

router.post('/return', async (req: Request, res: Response) => {

    const { isbn, memberId } = req.body;
    
    const loanService: LoanService = new LoanService(libraryInstance);
    
    try {
        await validateDTO(ReturnBookDTO, req.body);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        const result = await loanService.returnBook(memberId, isbn);
        
        // Return the created user
        res.status(201).json({ status: true, message: `Book with isbn ${isbn} returned by member ${memberId} sucessfully.`, data: result });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-L-E002 | Unable to return book | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get('/', async (req: Request, res: Response) => {
    
    const loanService: LoanService = new LoanService(libraryInstance);
    
    try {
        await validateDTO(ViewLoanDTO, req.query);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        const result = await loanService.viewLoans();
        const resultObj = Object.fromEntries(result);
        // Return the created user
        res.status(201).json({ status: true, message: `Fetched all book loans sucessfully.`, data: resultObj });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-L-E001 | Unable to fetch loans | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;
