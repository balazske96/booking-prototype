import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestBodyCopy = { ...req.body };

    Object.keys(requestBodyCopy).forEach(function (key) {
      if (
        key.toLowerCase().includes('password') ||
        key.toLowerCase().includes('secret')
      ) {
        requestBodyCopy[key] = '***';
      }
    });

    this.logger.log({ payload: requestBodyCopy, path: req.originalUrl });
    next();
  }
}
