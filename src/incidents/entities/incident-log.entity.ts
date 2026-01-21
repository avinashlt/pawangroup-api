import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Guard } from '../../guards/entities/guard.entity';
import { IncidentMedia } from './incident-media.entity';

@Entity('incident_logs')
export class IncidentLog {
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
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ 
    type: 'enum',
    enum: ['low', 'medium', 'high', 'critical']
  })
  severity: 'low' | 'medium' | 'high' | 'critical';

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => IncidentMedia, (media) => media.incidentLog)
  media: IncidentMedia[];

  @Column({ 
    type: 'enum',
    enum: ['new', 'reviewing', 'resolved', 'escalated'],
    default: 'new'
  })
  status: 'new' | 'reviewing' | 'resolved' | 'escalated';

  @Column()
  site: string;

  @Column({ nullable: true })
  resolvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
