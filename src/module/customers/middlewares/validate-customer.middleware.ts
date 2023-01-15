import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Hello world, I'm inside customer validate middleware!");
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: 'access denied',
      });
    } else if (authorization !== '123') {
      return res.status(401).send({
        error: 'Invalid token',
      });
    }
    next();
  }
}
