import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] - ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: '/var/log/containers/app.log' }),
    ],
  });

  error(message: string) {
    this.logger.error({ message }); // Pass the message as an object
  }

  warn(message: string) {
    this.logger.warn({ message }); // Pass the message as an object
  }

  info(message: string) {
    this.logger.info({ message }); // Pass the message as an object
  }

  log(message: string) {
    this.logger.log({ message, level: 'data' }); // Pass the message as an object
  }
}
