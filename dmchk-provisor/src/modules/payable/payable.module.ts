import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from '../../databases/PrismaService';
import { AssignorService } from '../assignor/assignor.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService, AssignorService],
  exports: [PayableService],
})
export class PayableModule {}
