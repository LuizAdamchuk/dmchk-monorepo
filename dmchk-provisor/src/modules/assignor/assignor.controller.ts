import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto, SignInAssignorDto, UpdateAssignorDto } from './dto';
import { JwtGuard } from '../shared/auth/guard';

// @UseGuards(JwtGuard)
@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  findOne(@Body() signInssignorDto: SignInAssignorDto) {
    return this.assignorService.signIn(signInssignorDto);
  }

  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
