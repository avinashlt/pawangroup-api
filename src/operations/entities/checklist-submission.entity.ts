import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Checklist } from './checklist.entity';
import { Guard } from '../../guards/entities/guard.entity';

@Entity('checklist_submissions')
export class ChecklistSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checklistId: string;

  @ManyToOne(() => Checklist)
  @JoinColumn({ name: 'checklistId' })
  checklist: Checklist;

  @Column()
  checklistName: string;

  @Column()
  guardId: string;

  @ManyToOne(() => Guard)
  @JoinColumn({ name: 'guardId' })
  guard: Guard;

  @Column()
  guardName: string;

  @Column()
  siteId: string;

  @Column()
  siteName: string;

  @Column({ type: 'timestamp' })
  submittedAt: Date;

  @Column({ type: 'json' })
  completedItems: {
    itemId: string;
    isCompleted: boolean;
    notes?: string;
    photo?: string;
  }[];

  @Column({ type: 'text', nullable: true })
  overallNotes: string;

  @Column({ 
    type: 'enum',
    enum: ['complete', 'incomplete']
  })
  status: 'complete' | 'incomplete';

  @CreateDateColumn()
  createdAt: Date;
}
