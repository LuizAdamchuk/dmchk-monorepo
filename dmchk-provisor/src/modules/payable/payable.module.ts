import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { AssignorService } from '../assignor/assignor.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, AssignorService],
  exports: [PayableService],
})
export class PayableModule {}
