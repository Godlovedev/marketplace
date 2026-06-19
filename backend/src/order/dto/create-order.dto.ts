import {
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-orderItem.dto';

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsString()
  customerPhone!: string;

  @IsString()
  pickupLocation!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}