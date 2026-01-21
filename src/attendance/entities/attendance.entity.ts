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

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guardId: string;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guardId' })
  guard: Guard;

  @Column()
  guardName: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  checkIn: string;

  @Column({ type: 'time', nullable: true })
  checkOut: string;

  @Column({ 
    type: 'enum',
    enum: ['present', 'absent', 'late', 'on-leave']
  })
  status: 'present' | 'absent' | 'late' | 'on-leave';

  @Column()
  site: string;

  @Column()
  shift: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  workHours: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkInLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkInLongitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkOutLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  checkOutLongitude: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
