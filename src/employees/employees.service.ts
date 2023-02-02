import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetPaginatedData,
  GetPagination,
} from 'src/common/utils/pagination.util';
import { ILike, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      if (createEmployeeDto['employee_id']) {
        delete createEmployeeDto['employee_id'];
      }

      const newEmployee = await this.employeeRepo.save(createEmployeeDto);

      return newEmployee;
    } catch (error) {
      throw error;
    }
  }

  async findMany(findDto: FindEmployeeDto) {
    try {
      const {
        address,
        base_salary_start,
        base_salary_end,
        email,
        name,
        page,
        limit: pageSize,
      } = findDto;
      let { sort_field, sort_order } = findDto;

      const { limit, offset } = GetPagination(+page, +pageSize);

      const employeeQb = this.employeeRepo.createQueryBuilder('e');

      if (address) {
        employeeQb.andWhere({ address: ILike(`%${address}%`) });
      }

      if (email) {
        employeeQb.andWhere({ email: ILike(`%${email}%`) });
      }

      if (name) {
        employeeQb.andWhere({ name: ILike(`%${name}%`) });
      }

      if (base_salary_start != null) {
        employeeQb.andWhere('base_salary >= :base_salary_start', {
          base_salary_start,
        });
      }

      if (base_salary_end != null) {
        employeeQb.andWhere('base_salary <= :base_salary_end', {
          base_salary_end,
        });
      }

      const fields = ['email', 'name', 'base_salary', 'created_at'];
      const orders = ['ASC', 'DESC'];

      if (!fields.includes(sort_field)) {
        sort_field = 'created_at';
      }

      if (!orders.includes(sort_order)) {
        sort_order = 'DESC';
      }

      employeeQb.take(limit);
      employeeQb.skip(offset);

      const results = await employeeQb.getManyAndCount();

      const data = GetPaginatedData({
        limit,
        sort_field,
        sort_order,
        page: isNaN(+page) ? 1 : +page || 1,
        count: results[1],
        items: results[0],
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(employee_id: string) {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { employee_id },
      });

      if (!employee) {
        throw new NotFoundException('Employee not found.');
      }

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(employee_id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const { address, base_salary, email, name } = updateEmployeeDto;

      const employee = await this.employeeRepo.findOne({
        where: { employee_id },
      });

      if (!employee) {
        throw new NotFoundException('Employee not found.');
      }

      if (address != null) {
        employee.address = address;
      }

      if (base_salary != null) {
        employee.base_salary = base_salary;
      }

      if (email != null) {
        employee.email = email;
      }

      if (name != null) {
        employee.name = name;
      }

      return this.employeeRepo.save(employee, { reload: true });
    } catch (error) {
      throw error;
    }
  }

  async delete(employee_id: string) {
    try {
      const employee = await this.employeeRepo.findOne({
        where: { employee_id },
      });

      if (!employee) {
        throw new NotFoundException("Can't find employee.");
      }

      await this.employeeRepo.softDelete({ employee_id });

      return employee;
    } catch (error) {
      throw error;
    }
  }
}
