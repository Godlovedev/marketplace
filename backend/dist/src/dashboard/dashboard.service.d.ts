import { PrismaService } from "../prisma.service";
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardData(): Promise<{
        kpi: {
            totalRevenue: number;
            totalOrders: number;
            pendingOrders: number;
            cancelledOrders: number;
            deliveredOrders: number;
            totalProducts: number;
        };
        charts: {
            salesEvolution: {
                date: string;
                totalSales: number;
            }[];
            orderStatuses: {
                status: import("../../generated/prisma/enums").OrderStatus;
                count: number;
            }[];
            topProducts: {
                productId: string;
                quantite: number;
            }[];
        };
    }>;
}
