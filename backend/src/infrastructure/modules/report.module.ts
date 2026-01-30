import { Module } from '@nestjs/common';
import { ReportService } from '../../application/services/report.service';
import { ReportRepositoryPrisma } from '../database/prisma/repositories/report-repository.prisma';
import { REPORT_REPOSITORY } from '../../core/repositories/report.repository';

@Module({
  providers: [
    ReportService,
    {
      provide: REPORT_REPOSITORY,
      useClass: ReportRepositoryPrisma,
    },
  ],
  exports: [ReportService],
})
export class ReportModule {}
