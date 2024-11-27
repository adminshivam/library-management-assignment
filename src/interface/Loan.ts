export interface Loan {
    [bookIsbn: string] : {
        borrowedDate: Date;
        dueDate: Date;
    };
}
