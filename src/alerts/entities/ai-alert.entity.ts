import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ai_alerts')
export class AIAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'enum',
    enum: ['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection']
  })
  type: 'intrusion' | 'suspicious-activity' | 'unauthorized-access' | 'object-detection' | 'crowd-detection';

  @Column()
  siteId: string;

  @Column()
  siteName: string;

  @Column()
  cameraId: string;

  @Column()
  cameraName: string;

  @Column({ type: 'timestamp' })
  detectedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  confidence: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  videoClip: string;

  @Column({ 
    type: 'enum',
    enum: ['new', 'reviewing', 'confirmed', 'false-positive'],
    default: 'new'
  })
  status: 'new' | 'reviewing' | 'confirmed' | 'false-positive';

  @Column({ nullable: true })
  reviewedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
