import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateAnalysisreportDto, AnalysisreportResponseDto, UpdateAnalysisreportDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalysisreportsService } from './analysisreports.service';

@Controller('analysisreports')
@UseGuards(JwtAuthGuard)
export class AnalysisreportsController {
  constructor(private readonly analysisreportsService: AnalysisreportsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<AnalysisreportResponseDto[]> {
    return this.analysisreportsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<AnalysisreportResponseDto> {
    return this.analysisreportsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAnalysisreportDto,
    @CurrentUser() user: User
  ): Promise<AnalysisreportResponseDto> {
    return this.analysisreportsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAnalysisreportDto,
    @CurrentUser() user: User
  ): Promise<AnalysisreportResponseDto> {
    return this.analysisreportsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.analysisreportsService.remove(id, user.id);
  }
}
