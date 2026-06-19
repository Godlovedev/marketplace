import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData() {
    // ==========================================
    // 1. LES KPI CARDS (Données chiffrées immédiates)
    // ==========================================

    // A. Chiffre d'affaires total (uniquement sur les commandes livrées/payées)
    const totalRevenueSum = await this.prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: 'DELIVERED',
      },
    });
    const totalRevenue = totalRevenueSum._sum.totalPrice || 0;

    // B. Nombre total de commandes (tous statuts confondus)
    const totalOrders = await this.prisma.order.count();

    // C. Commandes en attente de préparation / traitement
    const pendingOrders = await this.prisma.order.count({
      where: {
        status: 'PENDING',
      },
    });

    // D. NOUVEAU : Nombre de commandes annulées
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

    // E. Nombre total de produits en catalogue
    const totalProducts = await this.prisma.product.count();


    // ==========================================
    // 2. LES STATS POUR LES FUTURS GRAPHES (Prêtes pour plus tard)
    // ==========================================

    // Graphe 1: Évolution du CA par date (uniquement commandes livrées)
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

    // Graphe 2: Répartition de TOUS les statuts (inclut PENDING, DELIVERED, CANCELLED, etc.)
    const statusRaw = await this.prisma.order.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const orderStatuses = statusRaw.map(item => ({
      status: item.status,
      count: item._count.id,
    }));

    // Graphe 3: Top 5 des produits les plus vendus
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


    // On centralise et on renvoie un seul objet JSON structuré
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
}