import { IsString, IsInt, Min, IsOptional } from 'class-validator';

class CreateBookDTO {


  isbn!: string;

  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsInt()
  @Min(1900)
  publicationYear!: number;

  @IsInt()
  @Min(1)
  totalCopies!: number;
}

class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @Min(1900)
  @IsOptional()
  publicationYear?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  availableCopies?: number;
}

class DeleteBookDTO {

  @IsString()
  isbn!: string;
}

class SearchBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  isbn?: string;
}

export { CreateBookDTO, UpdateBookDTO, DeleteBookDTO, SearchBookDTO };