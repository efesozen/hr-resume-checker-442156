import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @Column({ type: 'enum', enum: ['FREE', 'PRO', 'ENTERPRISE'] })
  @Index('idx_subscriptions_plan_type')
  plan_type!: 'FREE' | 'PRO' | 'ENTERPRISE';

  @Column({ type: 'timestamp with time zone' })
  start_date!: Date;

  @Column({ type: 'timestamp with time zone' })
  end_date!: Date;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_subscriptions_user_id')
  @ManyToOne('User', 'subscriptions')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
