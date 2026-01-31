import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReportService } from '../../../application/services/report.service';
import { SalesReportPresenter } from '../presenters/sales-report.presenter';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../../core/enums/user-role.enum';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('sales')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Gerar relatório de vendas' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Data inicial (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Data final (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'partnerId',
    required: false,
    type: Number,
    description: 'ID do parceiro',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Itens por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Relatório gerado com sucesso',
    type: SalesReportPresenter,
  })
  async getSalesReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('partnerId') partnerId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<SalesReportPresenter> {
    const dto = await this.reportService.getSalesReport({
      startDate,
      endDate,
      partnerId: partnerId ? parseInt(partnerId, 10) : undefined,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
    return SalesReportPresenter.fromDto(dto);
  }
}
