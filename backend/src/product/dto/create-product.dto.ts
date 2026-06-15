import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  price!: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  stock!: number;

  @IsString()
  categoryId!: string;
}