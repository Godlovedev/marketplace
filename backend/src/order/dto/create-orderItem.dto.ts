import { IsInt, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  quantity!: number;
}