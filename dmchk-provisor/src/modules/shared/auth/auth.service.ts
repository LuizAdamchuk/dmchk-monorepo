import { Injectable } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAssignorDto, SignInAssignorDto } from 'src/modules/assignor/dto';

@Injectable()
export class AuthService {
  constructor(private authController: AuthController) {}

  async signUp(createAssignorDto: CreateAssignorDto) {
    const authAssignor = await this.authController.signUp(createAssignorDto);
    return authAssignor;
  }

  async signIn(signInAssignorDto: SignInAssignorDto) {
    const authAssignor = await this.authController.signIn(signInAssignorDto);
    return authAssignor;
  }
}
