import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { JwtStrategyService } from './modules/shared/jwt-strategy/jwt-strategy.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AssignorModule, PayableModule],
  controllers: [],
  providers: [JwtStrategyService],
})
export class AppModule {}
