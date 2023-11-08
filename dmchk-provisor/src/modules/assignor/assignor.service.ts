import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignorDto, SignInAssignorDto } from './dto';
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
    const assignor = await this.authServise.signUp(createAssignorDto);

    if (!assignor) throw new BadRequestException(`Assignor can't be created`);

    return assignor;
  }

  async findAll() {
    // TODO: Add req for governance

    return {};
  }

  async signIn(signInAssignorDto: SignInAssignorDto) {
    const assignor = await this.authServise.signIn(signInAssignorDto);

    if (!assignor) throw new NotFoundException(`Assignor not found`);

    return assignor;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    // TODO: Add req for governance

    // await this.findOne(id);

    // const updateAssignor = await this.ORM.assignor.update({
    //   data: updateAssignorDto,
    //   where: { id },
    // });

    // if (!updateAssignor)
    //   throw new NotFoundException(`Assignor with ID ${id} not found`);

    return {};
  }

  async remove(id: string) {
    // TODO: Add req for governance

    // await this.findOne(id);

    // return await this.ORM.assignor.delete({ where: { id } });
    return {};
  }
}
