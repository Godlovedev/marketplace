import { PrismaService } from "../prisma.service";
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/updateStatus.dto';
import { MailService } from "../mail.service";
export declare class OrderService {
    private readonly prisma;
    private readonly mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<({
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                imageUrl: string;
                isActive: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            unitPrice: number;
            orderId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        totalPrice: number;
        status: import("../../generated/prisma/enums").OrderStatus;
    })[]>;
    findOne(id: string): Promise<({
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                imageUrl: string;
                isActive: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            unitPrice: number;
            orderId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        totalPrice: number;
        status: import("../../generated/prisma/enums").OrderStatus;
    }) | null>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        totalPrice: number;
        status: import("../../generated/prisma/enums").OrderStatus;
    }>;
}
