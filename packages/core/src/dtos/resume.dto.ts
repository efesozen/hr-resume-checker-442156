import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateResumeDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  file_path!: string;

  @IsOptional()
  parsed_data?: Record<string, unknown>;

  @IsOptional()
  analysis_feedback?: Record<string, unknown>;
}

export class UpdateResumeDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  file_path?: string | undefined;

  @IsOptional()
  @IsOptional()
  parsed_data?: Record<string, unknown> | undefined;

  @IsOptional()
  @IsOptional()
  analysis_feedback?: Record<string, unknown> | undefined;
}

export class ResumeResponseDto {
  id!: string;
  userId!: string;
  file_path!: string;
  parsed_data?: Record<string, unknown>;
  analysis_feedback?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
