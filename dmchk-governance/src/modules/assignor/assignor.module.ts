import { Logger, Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

@Module({
  controllers: [AssignorController],
  providers: [
    AssignorService,
    {
      provide: Logger,
      useValue: new Logger('AssignorModule'),
    },
  ],
  exports: [AssignorService],
})
export class AssignorModule {}
