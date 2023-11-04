import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from '../../databases/prisma/prisma.service';
import { AssignorService } from '../assignor/assignor.service';

@Injectable()
export class PayableService {
  constructor(
    private ORM: PrismaService,
    private readonly _assignorSerive: AssignorService
  ) {}

  async create(createPayableDto: CreatePayableDto) {
    const { emissionDate, assignorId, ...rest } = createPayableDto;

    const formattedEmissionDate = new Date(emissionDate);

    await this._assignorSerive.findOne(assignorId);

    const payable = await this.ORM.payable.create({
      data: {
        ...rest,
        assignorId: assignorId,
        emissionDate: formattedEmissionDate,
      },
    });

    if (!payable) throw new BadRequestException(`Payable can't be created`);

    return payable;
  }

  async findAll() {
    const payables = await this.ORM.payable.findMany();

    if (!payables) throw new NotFoundException(`Payables not found`);

    return payables;
  }

  async findOne(id: string) {
    const payableExists = await this.ORM.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payableExists)
      throw new NotFoundException(`Payable with ID ${id} not found`);

    return payableExists;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    // Only allow change value for now
    const { value } = updatePayableDto;
    await this.findOne(id);

    const updatePayable = await this.ORM.payable.update({
      data: {
        value: value,
      },
      where: { id },
    });

    if (!updatePayable)
      throw new NotFoundException(`Payable with ID ${id} not found`);

    return updatePayable;
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.ORM.payable.delete({ where: { id } });
  }
}
