import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Geofence } from './geofence.entity';
import { Guard } from '../../guards/entities/guard.entity';

@Entity('geofence_alerts')
export class GeofenceAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  geofenceId: string;

  @ManyToOne(() => Geofence)
  @JoinColumn({ name: 'geofenceId' })
  geofence: Geofence;

  @Column()
  geofenceName: string;

  @Column()
  guardId: string;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guardId' })
  guard: Guard;

  @Column()
  guardName: string;

  @Column({ 
    type: 'enum',
    enum: ['entry', 'exit']
  })
  alertType: 'entry' | 'exit';

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ default: false })
  acknowledged: boolean;

  @Column({ nullable: true })
  acknowledgedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  acknowledgedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
