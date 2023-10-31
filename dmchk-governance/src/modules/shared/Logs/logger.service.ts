import { Global, Injectable } from '@nestjs/common';
import * as winston from 'winston';
@Global()
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
    this.logger.error({ message, level: 'error' }); // Pass the message as an object
  }

  warn(message: string) {
    this.logger.warn({ message, level: 'warn' }); // Pass the message as an object
  }

  info(message: string) {
    this.logger.info({ message, level: 'info' }); // Pass the message as an object
  }

  log(message: string) {
    this.logger.log({ message, level: 'debug' }); // Pass the message as an object
  }

  http(message: string) {
    this.logger.http({ message, level: 'http' }); // Pass the message as an object
  }
}
