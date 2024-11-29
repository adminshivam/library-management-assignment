import { IsString, IsInt, Min, IsOptional, IsNumber, Length } from 'class-validator';

class CreateMemberDTO {
    @IsNumber()
    @Min(1)
    id!: number;

    @IsString()
    @Length(5, 10)
    name!: string;
}

export { CreateMemberDTO };