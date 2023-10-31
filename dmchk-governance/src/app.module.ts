import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PrismaModule } from './databases/prisma/prisma.module';
import { AuthUtilsModule } from './modules/auth/utils/auth-utils.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './modules/shared/Logs/logging.interceptor';
import { LoggerService } from './modules/shared/Logs/logger.service';

@Module({
  imports: [
    PrometheusModule.register(),
    AuthModule,
    AssignorModule,
    PrismaModule,
    AuthUtilsModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
