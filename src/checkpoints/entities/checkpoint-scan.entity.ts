import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Checkpoint } from './checkpoint.entity';
import { Guard } from '../../guards/entities/guard.entity';

@Entity('checkpoint_scans')
export class CheckpointScan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkpointId: string;

  @ManyToOne(() => Checkpoint)
  @JoinColumn({ name: 'checkpointId' })
  checkpoint: Checkpoint;

  @Column()
  checkpointName: string;

  @Column()
  guardId: string;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guardId' })
  guard: Guard;

  @Column()
  guardName: string;

  @Column({ type: 'timestamp' })
  scannedAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ 
    type: 'enum',
    enum: ['on-time', 'late', 'missed']
  })
  status: 'on-time' | 'late' | 'missed';

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
