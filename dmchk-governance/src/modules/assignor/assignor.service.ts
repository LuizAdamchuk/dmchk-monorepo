import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { ValidateAssignorDto } from './dto/validate-assignor.dto';

import { AuthUtilsService } from '../auth/utils/auth-utils.service';
import { AuthRole } from '../auth/enum';

@Injectable()
export class AssignorService {
  constructor(
    private ORM: PrismaService,
    private authUtils: AuthUtilsService
  ) {}

  async create(createAssignorDto: CreateAssignorDto) {
    const { password, ...rest } = createAssignorDto;

    const hashedPassword = await this.authUtils._hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('Error hasing the password.');

    const assignor = await this.ORM.assignor.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    if (!assignor) throw new BadRequestException(`Assignor can't be created`);
    return this.authUtils._signToken(
      assignor.id,
      assignor.email,
      AuthRole.ASSIGNOR
    );
  }

  async signin(validateAssignorDto: ValidateAssignorDto) {
    const { email, password } = validateAssignorDto;
    const assignorExists = await this.ORM.assignor.findUnique({
      where: {
        email,
      },
    });

    if (!assignorExists)
      throw new BadRequestException(`Invalid email and/or password`);

    const validPassword = await this.authUtils._validatePassword(
      password,
      assignorExists.password
    );

    if (!validPassword)
      throw new BadRequestException(`Invalid email and/or password`);

    delete assignorExists.password;

    return this.authUtils._signToken(
      assignorExists.id,
      assignorExists.email,
      AuthRole.ASSIGNOR
    );
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

    delete assignorExists.password;

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
}
