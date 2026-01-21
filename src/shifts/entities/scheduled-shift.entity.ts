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
import { ShiftTemplate } from './shift-template.entity';

@Entity('scheduled_shifts')
export class ScheduledShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  templateId: string;

  @ManyToOne(() => ShiftTemplate)
  @JoinColumn({ name: 'templateId' })
  template: ShiftTemplate;

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

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ 
    type: 'enum',
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  })
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

  @Column({ type: 'time', nullable: true })
  checkInTime: string;

  @Column({ type: 'time', nullable: true })
  checkOutTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkInLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkInLongitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkOutLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkOutLongitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
