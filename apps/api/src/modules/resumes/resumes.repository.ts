import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Resume } from '@saas-template/database';
import type { CreateResumeDto, UpdateResumeDto } from '@saas-template/core';

@Injectable()
export class ResumesRepository extends Repository<Resume> {
  constructor(private dataSource: DataSource) {
    super(Resume, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Resume[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Resume | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateResumeDto): Promise<Resume> {
    const resume = this.create({
      ...dto,
      userId,
    });
    return this.save(resume);
  }

  async update(id: string, userId: string, dto: UpdateResumeDto): Promise<Resume | null> {
    const resume = await this.findById(id, userId);
    if (!resume) {
      return null;
    }

    Object.assign(resume, dto);
    return this.save(resume);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const resume = await this.findById(id, userId);
    if (!resume) {
      return false;
    }

    await this.softRemove(resume);
    return true;
  }
}
