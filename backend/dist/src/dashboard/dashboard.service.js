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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardData() {
        const totalRevenueSum = await this.prisma.order.aggregate({
            _sum: {
                totalPrice: true,
            },
            where: {
                status: 'DELIVERED',
            },
        });
        const totalRevenue = totalRevenueSum._sum.totalPrice || 0;
        const totalOrders = await this.prisma.order.count();
        const pendingOrders = await this.prisma.order.count({
            where: {
                status: 'PENDING',
            },
        });
        const cancelledOrders = await this.prisma.order.count({
            where: {
                status: 'CANCELLED',
            },
        });
        const deliveredOrders = await this.prisma.order.count({
            where: {
                status: 'DELIVERED',
            },
        });
        const totalProducts = await this.prisma.product.count();
        const salesRaw = await this.prisma.order.groupBy({
            by: ['createdAt'],
            _sum: { totalPrice: true },
            where: { status: 'DELIVERED' },
            orderBy: { createdAt: 'asc' },
        });
        const salesEvolution = salesRaw.map(item => ({
            date: new Date(item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
            totalSales: item._sum.totalPrice || 0,
        }));
        const statusRaw = await this.prisma.order.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const orderStatuses = statusRaw.map(item => ({
            status: item.status,
            count: item._count.id,
        }));
        const topProductsRaw = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5,
        });
        const topProducts = topProductsRaw.map(item => ({
            productId: item.productId,
            quantite: item._sum.quantity || 0,
        }));
        return {
            kpi: {
                totalRevenue,
                totalOrders,
                pendingOrders,
                cancelledOrders,
                deliveredOrders,
                totalProducts,
            },
            charts: {
                salesEvolution,
                orderStatuses,
                topProducts,
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map