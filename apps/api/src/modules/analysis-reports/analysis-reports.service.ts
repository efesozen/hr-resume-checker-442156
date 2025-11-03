import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateAnalysisreportDto, AnalysisreportResponseDto, UpdateAnalysisreportDto } from '@saas-template/core';
import type { Analysisreport } from '@saas-template/database';
import { AnalysisreportsRepository } from './analysisreports.repository';

@Injectable()
export class AnalysisreportsService {
  constructor(
    private readonly analysisreportsRepository: AnalysisreportsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<AnalysisreportResponseDto[]> {
    const analysisreports = await this.analysisreportsRepository.findAll(userId);
    return analysisreports.map((analysisreport: Analysisreport) => this.toResponseDto(analysisreport));
  }

  async findOne(id: string, userId: string): Promise<AnalysisreportResponseDto> {
    const analysisreport = await this.analysisreportsRepository.findById(id, userId);
    if (!analysisreport) {
      throw new NotFoundException('Analysisreport not found');
    }
    return this.toResponseDto(analysisreport);
  }

  async create(userId: string, dto: CreateAnalysisreportDto): Promise<AnalysisreportResponseDto> {
    return this.uow.execute(async () => {
      const analysisreport = await this.analysisreportsRepository.create(userId, dto);
      return this.toResponseDto(analysisreport);
    });
  }

  async update(id: string, userId: string, dto: UpdateAnalysisreportDto): Promise<AnalysisreportResponseDto> {
    return this.uow.execute(async () => {
      const analysisreport = await this.analysisreportsRepository.update(id, userId, dto);
      if (!analysisreport) {
        throw new NotFoundException('Analysisreport not found');
      }
      return this.toResponseDto(analysisreport);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.analysisreportsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Analysisreport not found');
      }
    });
  }

  private toResponseDto(analysisreport: Analysisreport): AnalysisreportResponseDto {
    return {
      id: analysisreport.id,
      resumeId: analysisreport.resumeId,
      report_data: analysisreport.report_data,
      createdAt: analysisreport.createdAt,
      updatedAt: analysisreport.updatedAt,
    };
  }
}
