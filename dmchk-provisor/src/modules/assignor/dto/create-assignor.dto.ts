import { IsNotEmpty, IsString } from 'class-validator';

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
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
