import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { validaccount } = req.headers;
    console.log('Validate customer account middleware');

    if (!validaccount) {
      return res.status(403).send({ error: 'Account is invalid' });
    }
    next();
  }
}
