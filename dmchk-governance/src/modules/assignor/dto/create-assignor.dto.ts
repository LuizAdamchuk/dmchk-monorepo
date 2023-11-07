import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAssignorDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
