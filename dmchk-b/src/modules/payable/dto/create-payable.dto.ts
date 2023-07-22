import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePayableDto {
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  emissionDate: Date | string;

  @IsNotEmpty()
  @IsString()
  assignorId: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
