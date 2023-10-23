import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { CreateAuthDto, SignInDto, UpdateAuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import { AuthUtilsService } from './utils/auth-utils.service';
import { AuthRole } from './enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authUtils: AuthUtilsService,
    private logger: Logger
  ) {}

  async create(dto: CreateAuthDto) {
    const hash = await this.authUtils._hashPassword(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          externalId: hash,
          document: dto.document,
        },
      });

      return this.authUtils._signToken(user.id, user.email, AuthRole.USER);
    } catch (error) {
      //TODO: CREATE A GLOBAL FILTER FOR PRISMA ERRORS
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto) {
    this.logger.debug(JSON.stringify(dto));
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await this.authUtils._validatePassword(
      dto.password,
      user.password
    );

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.authUtils._signToken(user.id, user.email, AuthRole.USER);
  }

  async update(id: string, dto: UpdateAuthDto) {
    const updtedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    delete updtedUser.password;
    delete updtedUser.externalId;

    return updtedUser;
  }

  async remove(id: string) {
    const removedUser = await this.prisma.user.delete({ where: { id } });

    return removedUser.email;
  }
}
