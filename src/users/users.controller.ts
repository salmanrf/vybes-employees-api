import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthorizationGuard } from 'src/common/guards/jwt.guard';
import { LoggedInRequest } from './dto/user-payload.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('self')
  @UseGuards(JwtAuthorizationGuard)
  async getSelf(@Req() request: LoggedInRequest) {
    try {
      const { user } = request;

      return {
        status: true,
        data: { ...user },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const res = await this.usersService.register(createUserDto);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    try {
      const res = await this.usersService.login(userLoginDto);

      return {
        status: true,
        data: res,
      };
    } catch (error) {
      throw error;
    }
  }
}
