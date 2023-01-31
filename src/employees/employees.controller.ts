import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const res = await this.employeesService.create(createEmployeeDto);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findMany(@Query() findDto: FindEmployeeDto) {
    try {
      const res = await this.employeesService.findMany(findDto);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':employee_id')
  async findOne(@Param('employee_id') employee_id: string) {
    try {
      const res = await this.employeesService.findOne(employee_id);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }

  @Put(':employee_id')
  async update(
    @Param('employee_id') employee_id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const res = await this.employeesService.update(
        employee_id,
        updateEmployeeDto,
      );

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':employee_id')
  async remove(@Param('employee_id') employee_id: string) {
    try {
      const res = await this.employeesService.findOne(employee_id);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }
}
