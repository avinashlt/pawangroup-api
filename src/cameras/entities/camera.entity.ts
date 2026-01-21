import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cameras')
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  siteId: string;

  @Column()
  siteName: string;

  @Column()
  location: string;

  @Column({ 
    type: 'enum',
    enum: ['indoor', 'outdoor', 'ptz']
  })
  type: 'indoor' | 'outdoor' | 'ptz';

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: false })
  aiEnabled: boolean;

  @Column({ type: 'timestamp' })
  lastSeen: Date;

  @Column({ nullable: true })
  streamUrl: string;

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
