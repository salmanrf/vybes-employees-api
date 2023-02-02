import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtSign } from 'src/common/utils/jwt-utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...createDto } = createUserDto;

      const hash = await bcrypt.hash(password, 10);

      const newUser = await this.userRepo.save({
        ...createDto,
        password: hash,
      });

      newUser.password = null;

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: UserLoginDto): Promise<{ access_token: string }> {
    try {
      const { username, password } = loginDto;

      const user = await this.userRepo.findOne({ where: { username } });

      if (!user) {
        throw new BadRequestException('Invalid username/password.');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalid username/password.');
      }

      const access_token = await JwtSign(
        {
          username: user.username,
          full_name: user.full_name,
        },
        process.env.USER_JWT_SECRET,
      );

      return {
        access_token,
      };
    } catch (error) {
      throw error;
    }
  }
}
