import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Resume } from './resume.entity';

@Entity({ name: 'analysis_reports' })
export class Analysisreport extends BaseEntity {
  @Column({ type: 'jsonb' })
  report_data!: Record<string, unknown>;


@Column({ name: 'resume_id' })
  resumeId!: string;

  @Index('idx_analysis_reports_resume_id')
  @ManyToOne('Resume', 'analysisreports')
  @JoinColumn({ name: 'resume_id' })
  resume!: Resume;
}
