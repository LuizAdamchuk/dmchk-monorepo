import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../../databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ValidateAssignorDto } from './dto/validate-assignor.dto';

import { env } from '../../env';

@Injectable()
export class AssignorService {
  constructor(private ORM: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    const { password, ...rest } = createAssignorDto;

    const hashedPassword = await this._hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('Error hasing the password.');

    const assignor = await this.ORM.assignor.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    if (!assignor) throw new BadRequestException(`Assignor can't be created`);
    return assignor;
  }

  async login(validateAssignorDto: ValidateAssignorDto) {
    const { email, password } = validateAssignorDto;
    const assignorExists = await this.ORM.assignor.findUnique({
      where: {
        email,
      },
    });

    if (!assignorExists)
      throw new BadRequestException(`Invalid email and/or password`);

    const validPassword = await this._validatePassword(
      password,
      assignorExists.password
    );

    if (!validPassword)
      throw new BadRequestException(`Invalid email and/or password`);

    // Efetuar a requisicao para o keycloak, pegar um token, setar no headers

    return assignorExists;
  }

  async findAll() {
    const assignors = await this.ORM.assignor.findMany();

    if (!assignors) throw new NotFoundException(`Assignors not found`);

    return assignors;
  }

  async findOne(id: string) {
    const assignorExists = await this.ORM.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignorExists)
      throw new NotFoundException(`Assignor with ID ${id} not found`);

    return assignorExists;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    await this.findOne(id);

    const updateAssignor = await this.ORM.assignor.update({
      data: updateAssignorDto,
      where: { id },
    });

    if (!updateAssignor)
      throw new NotFoundException(`Assignor with ID ${id} not found`);

    return updateAssignor;
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.ORM.assignor.delete({ where: { id } });
  }

  // ---------- PRIVATE ------------

  private async _hashPassword(plainPassword: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(
        plainPassword,
        +env.BCRYPT_SALT || 10
      );
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing the password:', error);
      throw error;
    }
  }

  private async _validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }
}
