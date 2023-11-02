import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PrismaModule } from './databases/prisma/prisma.module';
import { AuthUtilsModule } from './modules/auth/utils/auth-utils.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { LoggerModule } from './modules/shared/Logs/logger.module';

@Module({
  imports: [
    PrometheusModule.register(),
    AuthModule,
    AssignorModule,
    PrismaModule,
    AuthUtilsModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
