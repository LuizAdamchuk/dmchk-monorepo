import { Injectable } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAssignorAuthDto } from 'src/modules/assignor/dto/create-assignor.dto';

@Injectable()
export class AuthService {
  constructor(private authController: AuthController) {}

  async signUp(createAssignorDto: CreateAssignorAuthDto) {
    const authAssignor = await this.authController.signUp(createAssignorDto);
    return authAssignor;
  }
}