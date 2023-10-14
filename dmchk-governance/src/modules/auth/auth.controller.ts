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
import { AuthService } from './auth.service';
import { SignInDto, CreateAuthDto, UpdateAuthDto } from './dto';
import { GetUser } from './decorator';
import { JwtGuard } from './guard';
import { User } from '@prisma/client';
import { AuthRole } from './enum';
import { Roles, RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // @Get('signout')
  // signOut() {
  //   return this.authService.findAll();
  // }

  @Roles(AuthRole.USER, AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('userinfo')
  userInfo(@GetUser() user: User) {
    return user;
  }

  @Roles(AuthRole.USER, AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Roles(AuthRole.USER, AuthRole.ASSIGNOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
