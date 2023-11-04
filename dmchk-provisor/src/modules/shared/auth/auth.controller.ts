import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signin')
  signIn() {
    return { msg: 'signIn' };
  }

  @Post('signUp')
  signUp() {
    return { msg: 'signUp' };
  }
}
