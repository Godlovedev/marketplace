"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const mail_service_1 = require("../mail.service");
let OrderService = class OrderService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async create(createOrderDto) {
        const { items, customerName, customerPhone, pickupLocation } = createOrderDto;
        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: items?.map((item) => item.productId),
                },
            },
        });
        let totalPrice = 0;
        const orderItemsData = items.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
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
                items: true,
            },
        });
        const admins = await this.prisma.user.findMany();
        const adminEmails = admins.map((admin) => admin.email);
        await this.mailService.sendOrderNotificationEmailToAdmins(newOrder, adminEmails);
        return { message: "Commande envoyée." };
    }
    ;
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
    }
    ;
    async findOne(id) {
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
    }
    ;
    async updateStatus(id, updateOrderStatusDto) {
        return this.prisma.order.update({
            where: { id },
            data: {
                status: updateOrderStatusDto.status,
            },
        });
    }
    ;
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, mail_service_1.MailService])
], OrderService);
//# sourceMappingURL=order.service.js.map