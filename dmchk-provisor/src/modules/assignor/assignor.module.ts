import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { AssignorMapper } from './mapper/assignor.mapper';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorMapper],
  exports: [AssignorService],
})
export class AssignorModule {}
