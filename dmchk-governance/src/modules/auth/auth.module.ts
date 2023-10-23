import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategy';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: Logger,
      useValue: new Logger('AuthModule'),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
