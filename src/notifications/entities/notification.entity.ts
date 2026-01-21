import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'enum',
    enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system']
  })
  type: 'shift-confirmation' | 'clock-in' | 'clock-out' | 'incident' | 'sos' | 'geofence' | 'checkpoint' | 'system';

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ default: false })
  isRead: boolean;

  @Column({ 
    type: 'enum',
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  })
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Column({ nullable: true })
  relatedId: string;

  @Column({ nullable: true })
  relatedType: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
