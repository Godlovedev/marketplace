import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
