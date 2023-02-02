import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtVerify } from '../utils/jwt-utils';
import { promiseTuplify } from '../utils/promise-utils';

export class JwtAuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ').pop();

    const [decoded, error] = await promiseTuplify(
      JwtVerify(token, process.env.USER_JWT_SECRET),
    );

    if (error) {
      throw new UnauthorizedException('Invalid token.');
    }

    request['user'] = decoded;

    return true;
  }
}
