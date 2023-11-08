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
import { CreateAssignorDto, UpdateAssignorDto } from './dto';
import { ValidateAssignorDto } from './dto/validate-assignor.dto';
import { JwtGuard, Roles, RolesGuard } from '../auth/guard';
import { AuthRole } from '../auth/enum';

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

  @Roles(AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @Roles(AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }
  @Roles(AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Roles(AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
