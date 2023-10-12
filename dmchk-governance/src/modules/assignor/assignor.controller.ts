import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { ValidateAssignorDto } from './dto/validate-assignor.dto';
import { JwtGuard } from '../auth/guard';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post('create')
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() validateAssignor: ValidateAssignorDto) {
    return this.assignorService.signin(validateAssignor);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
