import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthControllerAbstract } from '../abstracts/auth.abstracts';
import { lastValueFrom, map } from 'rxjs';
import { CreateAssignorAuthDto } from 'src/modules/assignor/dto/create-assignor.dto';

@Controller('assignor')
export class AuthController implements AuthControllerAbstract {
  private authUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.authUrl = process.env.AUTH_URL;
  }
  @Post('signin')
  signIn() {
    return { msg: 'signIn' };
  }

  @Post('create')
  async signUp(@Body() createDto: CreateAssignorAuthDto) {
    const url = `${this.authUrl}/assignor/create`;
    const response = await lastValueFrom(
      this.httpService.post(url, createDto).pipe(map((resp) => resp.data))
    );
    return response;
  }
}
