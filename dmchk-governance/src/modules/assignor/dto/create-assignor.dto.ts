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
  externalId: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  password: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
