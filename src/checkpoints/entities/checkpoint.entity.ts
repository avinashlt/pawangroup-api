import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('checkpoints')
export class Checkpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ 
    type: 'enum',
    enum: ['nfc', 'qr', 'beacon']
  })
  type: 'nfc' | 'qr' | 'beacon';

  @Column()
  siteId: string;

  @Column()
  siteName: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int' })
  scanFrequency: number;

  @Column({ type: 'timestamp', nullable: true })
  lastScanned: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
