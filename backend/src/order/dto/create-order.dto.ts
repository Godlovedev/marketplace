import { CreateOrderItemDto } from "./create-orderItem.dto";

export class CreateOrderDto {
  customerName!: string;
  customerPhone!: string;
  pickupLocation!: string;

  items!: CreateOrderItemDto[];
}