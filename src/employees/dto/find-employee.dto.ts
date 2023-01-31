import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common/dtos/pagination.dto';

export class FindEmployeeDto extends PaginationRequest {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  base_salary_start: 0;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  base_salary_end: 0;
}
