import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { JwtStrategy } from './modules/shared/auth/strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './databases/prisma/prisma.module';
import { AuthModule } from './modules/shared/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AssignorModule,
    PayableModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
