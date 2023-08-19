import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateAssignorDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  password: string;
}
