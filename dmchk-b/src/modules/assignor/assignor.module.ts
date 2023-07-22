import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { PrismaService } from '../../databases/PrismaService';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
  exports: [AssignorService],
})
export class AssignorModule {}
