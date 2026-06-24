import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/updateStatus.dto';
import { MailService } from 'src/mail.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService, private readonly mailService: MailService){}

    async create(createOrderDto: CreateOrderDto) {
        const { items, customerName, customerPhone, pickupLocation } =
            createOrderDto;

        const products = await this.prisma.product.findMany({
            where: {
            id: {
                in: items?.map((item) => item.productId),
            },
            },
        });

        let totalPrice = 0;

        const orderItemsData = items.map((item) => {
            const product = products.find(
            (product) => product.id === item.productId,
            );

            if (!product) {
            throw new NotFoundException('Product not found');
            }

            const unitPrice = product.price;

            totalPrice += unitPrice * item.quantity;

            return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice,
            };
        });

        const newOrder = await this.prisma.order.create({
            data: {
            customerName,
            customerPhone,
            pickupLocation,
            totalPrice,

            items: {
                create: orderItemsData,
            },
            },
            include: {
            items: {include: {product: true}},
            },
        });

        await this.mailService.sendOrderNotificationEmailToAdmins(newOrder)
        return {message: "Commande envoyée."}
    };

    async findAll() {
        return await this.prisma.order.findMany({
            include: {
            items: {
                include: {
                product: true,
                },
            },
            },
            orderBy: {
            createdAt: 'desc',
            },
        });
    };

    async findOne(id: string) {
        return await this.prisma.order.findUnique({
            where: { id },
            include: {
            items: {
                include: {
                product: true,
                },
            },
            },
        });
    };

    async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.prisma.order.update({
            where: { id },
            data: {
            status: updateOrderStatusDto.status,
            },
        });
    };

}
