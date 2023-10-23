import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PrismaModule } from './databases/prisma/prisma.module';
import { AuthUtilsModule } from './modules/auth/utils/auth-utils.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './modules/shared/Logs/logging.interceptor';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
