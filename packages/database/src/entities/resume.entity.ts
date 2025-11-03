import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'resumes' })
export class Resume extends BaseEntity {
  @Column()
  file_path!: string;

  @Column({ type: 'jsonb', nullable: true })
  parsed_data?: Record<string, unknown>;

  @Column({ type: 'jsonb', nullable: true })
  analysis_feedback?: Record<string, unknown>;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_resumes_user_id')
  @ManyToOne('User', 'resumes')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
