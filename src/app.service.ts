import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    (async () => {
      try {
        const count = await dataSource.manager.count(User);

        const hash = await bcrypt.hash('12345', 10);

        if (count === 0) {
          await dataSource.manager.save(User, {
            username: 'admin',
            full_name: 'Admin',
            password: hash,
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
