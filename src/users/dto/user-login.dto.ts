import { IsString, Max, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}
