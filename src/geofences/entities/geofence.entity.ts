import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('geofences')
export class Geofence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  siteId: string;

  @Column()
  siteName: string;

  @Column({ 
    type: 'enum',
    enum: ['circle', 'polygon']
  })
  type: 'circle' | 'polygon';

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  centerLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  centerLongitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  radius: number;

  @Column({ type: 'json', nullable: true })
  polygon: { latitude: number; longitude: number }[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  alertOnExit: boolean;

  @Column({ default: false })
  alertOnEntry: boolean;

  @Column({ type: 'simple-array' })
  assignedGuards: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
