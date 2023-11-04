import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { AuthService } from '../shared/auth/auth.service';
import { AssignorMapper } from './mapper/assignor.mapper';

@Injectable()
export class AssignorService {
  constructor(
    private ORM: PrismaService,
    private authServise: AuthService,
    private readonly assignorMapper: AssignorMapper
  ) {}

  async create(createAssignorDto: CreateAssignorDto) {
    const assignor = await this.ORM.assignor.create({
      data: createAssignorDto,
    });

    if (!assignor) throw new BadRequestException(`Assignor can't be created`);

    const mappedAssignor = this.assignorMapper.mapperToCreateAssignorAuthDto(
      assignor,
      createAssignorDto
    );

    const authResponse = await this.authServise.signUp(mappedAssignor);

    if (!authResponse)
      throw new UnprocessableEntityException(`Assignor can't be created`);

    return assignor;
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
}
