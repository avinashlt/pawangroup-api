import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shift_swap_requests')
export class ShiftSwapRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requesterId: string;

  @Column()
  requesterName: string;

  @Column()
  targetGuardId: string;

  @Column()
  targetGuardName: string;

  @Column()
  originalShiftId: string;

  @Column()
  swapShiftId: string;

  @Column({ type: 'date' })
  originalDate: Date;

  @Column({ type: 'date' })
  swapDate: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({ 
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'timestamp' })
  requestedAt: Date;

  @Column({ nullable: true })
  processedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
