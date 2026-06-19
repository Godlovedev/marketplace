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
                categoryId: string;
                imageUrl: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            unitPrice: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        totalPrice: number;
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
                categoryId: string;
                imageUrl: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            unitPrice: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        totalPrice: number;
    }) | null>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerPhone: string;
        pickupLocation: string;
        status: import("../../generated/prisma/enums").OrderStatus;
        totalPrice: number;
    }>;
}
