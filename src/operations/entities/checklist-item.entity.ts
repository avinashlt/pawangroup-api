import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Checklist } from './checklist.entity';

@Entity('checklist_items')
export class ChecklistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checklistId: string;

  @ManyToOne(() => Checklist, (checklist) => checklist.items)
  @JoinColumn({ name: 'checklistId' })
  checklist: Checklist;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  isRequired: boolean;

  @Column({ type: 'int' })
  order: number;
}
