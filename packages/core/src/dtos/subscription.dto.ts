import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum SubscriptionPlan_type {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export class CreateSubscriptionDto {
  @IsUUID()
  userId!: string;

  @IsEnum(SubscriptionPlan_type)
  plan_type!: SubscriptionPlan_type;

  @IsDate()
  start_date!: Date;

  @IsDate()
  end_date!: Date;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsEnum(SubscriptionPlan_type)
  plan_type?: SubscriptionPlan_type | undefined;

  @IsOptional()
  @IsDate()
  start_date?: Date | undefined;

  @IsOptional()
  @IsDate()
  end_date?: Date | undefined;
}

export class SubscriptionResponseDto {
  id!: string;
  userId!: string;
  plan_type!: SubscriptionPlan_type;
  start_date!: Date;
  end_date!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
