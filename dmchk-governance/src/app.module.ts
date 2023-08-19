import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PrismaModule } from './databases/prisma/prisma.module';

@Module({
  imports: [AuthModule, AssignorModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
