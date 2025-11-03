import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateAnalysisreportDto {
  @IsUUID()
  resumeId!: string;

  report_data!: Record<string, unknown>;
}

export class UpdateAnalysisreportDto {
  @IsOptional()
  @IsUUID()
  resumeId?: string | undefined;

  @IsOptional()
  report_data?: Record<string, unknown> | undefined;
}

export class AnalysisreportResponseDto {
  id!: string;
  resumeId!: string;
  report_data!: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
