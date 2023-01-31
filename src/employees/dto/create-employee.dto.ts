import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  @Min(0)
  base_salary: number;
}
