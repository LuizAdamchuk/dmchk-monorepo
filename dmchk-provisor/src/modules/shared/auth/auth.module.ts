import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AuthController],
  exports: [AuthService, AuthController],
})
export class AuthModule {}
