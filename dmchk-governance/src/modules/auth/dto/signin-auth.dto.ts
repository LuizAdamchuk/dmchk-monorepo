import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthRole } from '../enum';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsEnum(AuthRole)
  @IsOptional()
  role?: AuthRole;

  @IsString()
  @IsNotEmpty()
  password: string;
}
