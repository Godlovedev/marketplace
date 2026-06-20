import { IsNotEmpty } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  status!: OrderStatus;
}