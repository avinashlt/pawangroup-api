import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IncidentLog } from './incident-log.entity';

@Entity('incident_media')
export class IncidentMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  incidentLogId: string;

  @ManyToOne(() => IncidentLog, (log) => log.media)
  @JoinColumn({ name: 'incidentLogId' })
  incidentLog: IncidentLog;

  @Column({ 
    type: 'enum',
    enum: ['image', 'video']
  })
  type: 'image' | 'video';

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ type: 'timestamp' })
  uploadedAt: Date;

  @Column({ type: 'bigint', nullable: true })
  size: number;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;
}
