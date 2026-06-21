export declare enum OrderStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
