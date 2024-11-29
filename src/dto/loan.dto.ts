import { IsString, IsInt, Min, IsOptional, IsIn } from 'class-validator';

class BorrowBookDTO {

    @IsString()
    isbn!: string;

    @IsInt()
    @Min(1)
    memberId!: number;
}

class ReturnBookDTO {

    @IsString()
    isbn!: string;

    @IsInt()
    @Min(1)
    memberId!: number;
}

class ViewLoanDTO {}

export { BorrowBookDTO, ReturnBookDTO, ViewLoanDTO };