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

@Entity('sleep_alerts')
export class SleepAlert {
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
  siteId: string;

  @Column()
  siteName: string;

  @Column({ type: 'timestamp' })
  detectedAt: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ 
    type: 'enum',
    enum: ['active', 'acknowledged', 'false-positive'],
    default: 'active'
  })
  status: 'active' | 'acknowledged' | 'false-positive';

  @Column({ nullable: true })
  acknowledgedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  acknowledgedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
