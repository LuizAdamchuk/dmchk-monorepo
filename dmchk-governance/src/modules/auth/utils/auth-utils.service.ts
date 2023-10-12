import { Global, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { env } from '../../../env';
import { JwtService } from '@nestjs/jwt';

@Global()
@Injectable()
export class AuthUtilsService {
  constructor(private jwt: JwtService) {}

  async _hashPassword(plainPassword: string): Promise<string> {
    try {
      const hashedPassword = await argon.hash(plainPassword);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing the password:', error);
      throw error;
    }
  }

  async _validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await argon.verify(hashedPassword, plainPassword);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }

  async _signToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = env.JWT_SECRET;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
