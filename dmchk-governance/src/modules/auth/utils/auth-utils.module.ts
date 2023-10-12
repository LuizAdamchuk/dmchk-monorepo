import { Global, Module } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthUtilsService],
  exports: [AuthUtilsService],
})
export class AuthUtilsModule {}
