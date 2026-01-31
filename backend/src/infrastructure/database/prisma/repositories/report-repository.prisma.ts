import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type {
  IReportRepository,
  SalesReportFilters,
  SalesReportResult,
} from '../../../../core/repositories/report.repository';
import { SaleMapper } from '../models/sale/sale.mapper';

@Injectable()
export class ReportRepositoryPrisma implements IReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSalesReport(
    filters: SalesReportFilters,
  ): Promise<SalesReportResult> {
    const where: any = {};

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    if (filters.partnerId) {
      where.partnerId = filters.partnerId;
    }
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;
    const [salesData, totalSales, totalValueAgg] = await Promise.all([
      this.prisma.sale.findMany({
        where,
        include: {
          product: true,
          customer: true,
          partner: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.sale.count({ where }),
      this.prisma.sale.aggregate({
        where,
        _sum: {
          value: true,
        },
      }),
    ]);

    const sales = salesData.map((saleData) =>
      SaleMapper.toDomain(saleData as any),
    );

    const totalPages = Math.ceil(totalSales / limit);

    return {
      sales,
      totalSales,
      totalValue: totalValueAgg._sum.value || 0,
      totalPages,
      currentPage: page,
    };
  }
}
