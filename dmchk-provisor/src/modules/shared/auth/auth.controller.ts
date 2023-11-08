import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthControllerAbstract } from '../abstracts/auth.abstracts';
import { lastValueFrom, map } from 'rxjs';
import { CreateAssignorDto, SignInAssignorDto } from 'src/modules/assignor/dto';

@Controller('assignor')
export class AuthController implements AuthControllerAbstract {
  private authUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.authUrl = process.env.AUTH_URL;
  }

  @Post('create')
  async signUp(@Body() createDto: CreateAssignorDto) {
    const url = `${this.authUrl}/assignor/create`;
    const response = await lastValueFrom(
      this.httpService.post(url, createDto).pipe(map((resp) => resp.data))
    );
    return response;
  }

  @Get('signin')
  async signIn(@Body() signInDto: SignInAssignorDto) {
    const url = `${this.authUrl}/assignor/signin`;
    const response = await lastValueFrom(
      this.httpService.post(url, signInDto).pipe(map((resp) => resp.data))
    );
    return response;
  }
}
