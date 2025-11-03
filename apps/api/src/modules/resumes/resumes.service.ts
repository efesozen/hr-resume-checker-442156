import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateResumeDto, ResumeResponseDto, UpdateResumeDto } from '@saas-template/core';
import type { Resume } from '@saas-template/database';
import { ResumesRepository } from './resumes.repository';

@Injectable()
export class ResumesService {
  constructor(
    private readonly resumesRepository: ResumesRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ResumeResponseDto[]> {
    const resumes = await this.resumesRepository.findAll(userId);
    return resumes.map((resume: Resume) => this.toResponseDto(resume));
  }

  async findOne(id: string, userId: string): Promise<ResumeResponseDto> {
    const resume = await this.resumesRepository.findById(id, userId);
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }
    return this.toResponseDto(resume);
  }

  async create(userId: string, dto: CreateResumeDto): Promise<ResumeResponseDto> {
    return this.uow.execute(async () => {
      const resume = await this.resumesRepository.create(userId, dto);
      return this.toResponseDto(resume);
    });
  }

  async update(id: string, userId: string, dto: UpdateResumeDto): Promise<ResumeResponseDto> {
    return this.uow.execute(async () => {
      const resume = await this.resumesRepository.update(id, userId, dto);
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
      return this.toResponseDto(resume);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.resumesRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Resume not found');
      }
    });
  }

  private toResponseDto(resume: Resume): ResumeResponseDto {
    return {
      id: resume.id,
      userId: resume.userId,
      file_path: resume.file_path,
      parsed_data: resume.parsed_data,
      analysis_feedback: resume.analysis_feedback,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  }
}
