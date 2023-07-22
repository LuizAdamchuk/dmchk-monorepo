import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HttpService } from '@nestjs/axios';
import { URLSearchParams } from 'url';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  private _baseUrl: string;

  constructor(private readonly _http: HttpService) {
    this._baseUrl = `${process.env.KEYCLOAK_URL}`;
  }

  async create(createAuthDto: CreateAuthDto): Promise<void> {
    const { password, username } = createAuthDto;

    const url = `${this._baseUrl}/admin/realms/${process.env.KEYCLOAK_REALM}/users`;

    const data = {
      username: username,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };

    try {
      const res = await firstValueFrom(
        this._http.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjNjQzS0MwNms0T3FyOUJIX2dPOGg3VjMzazhmMzBfZ0U4cGQxS1I4VUFvIn0.eyJleHAiOjE3NzU0Mjk3NTksImlhdCI6MTY4OTAyOTc1OSwianRpIjoiNGQ3OWVjYmYtZTAwYi00MGI1LTkwMzUtMDY5ZjBiNDQ4Y2M2IiwiaXNzIjoiaHR0cDovLzAuMC4wLjA6ODA4MC9yZWFsbXMvZ292ZXJuYW5jZSIsImF1ZCI6WyJicm9rZXIiLCJhY2NvdW50Il0sInN1YiI6IjU4NmVmZWQzLWIwNmItNGVkZi05YjY1LTY5ZmI0MmU2MzZmZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImdvdmVybmFuY2Vfc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJlYWYzYTk4Ni05Y2MyLTRhMmQtOWVjMy01NTIwZjMwZjNiZGMiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiLCJkZWZhdWx0LXJvbGVzLWdvdmVybmFuY2UiXX0sInJlc291cmNlX2FjY2VzcyI6eyJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJtYW5hZ2UtY29uc2VudCIsImRlbGV0ZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZWFmM2E5ODYtOWNjMi00YTJkLTllYzMtNTUyMGYzMGYzYmRjIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJKb2huIERvZSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluQGVtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSJ9.gSlssUavoMAvYgz2uT-rep0A8x5Z_ehzpa4y4Z6h1-9DuZBSxH5NT4IXZsjGYKgXClpH4dUScwuN9C6lMFyIpQKzDLh8ylslru45hEtlaNwLfrdyql1Pi86Dz7ar8MbpKTyMM0LA8P2mjncBbWKpwaRhNObWMYiWj8T2d8YQFCCBakcs78vvha9YgPM2lFLAEmKSFfPR2ivQ0_MYQdJEhV2V2zUar4sS5f5i2J3Vl-KBJHbtMsF3teb9oo2XwhIZadYlHFhR99xizd_Hzr3_SYsDj8npxolDqo2Ad-SVgscK_OJfINzw3dXX1dUVGQ8OT8xPWPmWjc6GjhyvItHsow',
          },
        })
      );

      return res.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:46 ~ AuthService ~ signIn ~ error:',
        error
      );
      throw error;
    }

    // Handle the response as needed
  }

  findAll() {
    return `This action returns all auth`;
  }

  async signIn(signInDto: SignInDto) {
    const { password, username } = signInDto;
    const url = `${this._baseUrl}/realms//protocol/openid-connect/token`;

    const data = new URLSearchParams();
    data.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
    data.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);
    try {
      const res = await firstValueFrom(
        this._http.post(url, data.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      );

      return res.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:46 ~ AuthService ~ signIn ~ error:',
        error
      );
      throw error;
    }
  }

  signOut() {
    return `This action returns all auth`;
  }

  async userInfo() {
    const url = `${this._baseUrl}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;

    return 'hello';
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
