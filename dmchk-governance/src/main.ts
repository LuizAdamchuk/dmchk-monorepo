import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception.filter';

import { env } from './env';
import * as dotenv from 'dotenv';
import { LoggerService } from './modules/shared/Logs/logger.service';
import { LoggingInterceptor } from './modules/shared/Logs/logging.interceptor';
dotenv.config();

async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  console.log('🚀 Starting aplication on port...', env.PORT);
  await app.listen(env.PORT);
}
bootstrap();
