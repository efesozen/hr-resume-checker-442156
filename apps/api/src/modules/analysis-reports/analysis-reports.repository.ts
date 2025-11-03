import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Analysisreport } from '@saas-template/database';
import type { CreateAnalysisreportDto, UpdateAnalysisreportDto } from '@saas-template/core';

@Injectable()
export class AnalysisreportsRepository extends Repository<Analysisreport> {
  constructor(private dataSource: DataSource) {
    super(Analysisreport, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Analysisreport[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Analysisreport | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateAnalysisreportDto): Promise<Analysisreport> {
    const analysisreport = this.create({
      ...dto,
      userId,
    });
    return this.save(analysisreport);
  }

  async update(id: string, userId: string, dto: UpdateAnalysisreportDto): Promise<Analysisreport | null> {
    const analysisreport = await this.findById(id, userId);
    if (!analysisreport) {
      return null;
    }

    Object.assign(analysisreport, dto);
    return this.save(analysisreport);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const analysisreport = await this.findById(id, userId);
    if (!analysisreport) {
      return false;
    }

    await this.softRemove(analysisreport);
    return true;
  }
}
