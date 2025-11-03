import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysisreport } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { AnalysisreportsController } from './analysisreports.controller';
import { AnalysisreportsService } from './analysisreports.service';
import { AnalysisreportsRepository } from './analysisreports.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysisreport]),
    DatabaseModule,
  ],
  controllers: [AnalysisreportsController],
  providers: [AnalysisreportsService, AnalysisreportsRepository],
  exports: [AnalysisreportsService],
})
export class AnalysisreportsModule {}
