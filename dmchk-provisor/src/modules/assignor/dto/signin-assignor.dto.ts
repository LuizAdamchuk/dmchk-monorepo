import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInAssignorDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password: string;
}
