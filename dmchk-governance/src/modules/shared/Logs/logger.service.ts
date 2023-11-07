import { Global, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
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
      new DailyRotateFile({
        level: 'verbose',
        filename: 'governance_%DATE%.log',
        dirname: './logs', ///var/log
        options: { flags: 'a' },
        datePattern: 'YYYY_MM_DD',
        zippedArchive: true,
        maxSize: '30m',
        maxFiles: '1d',
      }),
    ],
  });

  error(message: string) {
    this.logger.error({ message, level: 'error' });
  }

  warn(message: string) {
    this.logger.warn({ message, level: 'warn' });
  }

  info(message: string) {
    this.logger.info({ message, level: 'info' });
  }

  log(message: string) {
    this.logger.log({ message, level: 'debug' });
  }

  http(message: string) {
    this.logger.http({ message, level: 'http' });
  }
}
