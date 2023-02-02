import { IsString, Max, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(150)
  full_name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}
