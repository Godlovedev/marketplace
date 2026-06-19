import { CreateOrderItemDto } from './create-orderItem.dto';
export declare class CreateOrderDto {
    customerName: string;
    customerPhone: string;
    pickupLocation: string;
    items: CreateOrderItemDto[];
}
