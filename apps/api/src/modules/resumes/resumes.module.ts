import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { ResumesRepository } from './resumes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resume]),
    DatabaseModule,
  ],
  controllers: [ResumesController],
  providers: [ResumesService, ResumesRepository],
  exports: [ResumesService],
})
export class ResumesModule {}
