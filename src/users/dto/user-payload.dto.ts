import { Request } from 'express';

export interface LoggedInRequest extends Request {
  user: {
    username: string;
    full_name: string;
  };
}
