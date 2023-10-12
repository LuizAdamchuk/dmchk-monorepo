import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../databases/prisma/prisma.service';
import { env } from '../../../env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (user) {
      delete user.password;
      delete user.externalId;
    }

    if (assignor) {
      delete assignor.password;
      delete assignor.externalId;
    }

    return payload;
  }
}
