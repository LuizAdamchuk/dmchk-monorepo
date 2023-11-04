import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { AssignorService } from '../assignor/assignor.service';
import { AssignorMapper } from '../assignor/mapper/assignor.mapper';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService, AssignorService, AssignorMapper],
  exports: [PayableService],
})
export class PayableModule {}
