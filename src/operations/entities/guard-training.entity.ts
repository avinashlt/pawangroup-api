import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Guard } from '../../guards/entities/guard.entity';
import { Training } from './training.entity';

@Entity('guard_trainings')
export class GuardTraining {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guardId: string;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guardId' })
  guard: Guard;

  @Column()
  guardName: string;

  @Column()
  trainingId: string;

  @ManyToOne(() => Training)
  @JoinColumn({ name: 'trainingId' })
  training: Training;

  @Column()
  trainingName: string;

  @Column({ 
    type: 'enum',
    enum: ['not-started', 'in-progress', 'completed', 'expired'],
    default: 'not-started'
  })
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';

  @Column({ type: 'timestamp' })
  assignedAt: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'date', nullable: true })
  expiresAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ nullable: true })
  certificate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
