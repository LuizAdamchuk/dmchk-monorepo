import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  document: string;
}
