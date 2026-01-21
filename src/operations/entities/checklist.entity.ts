import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChecklistItem } from './checklist-item.entity';

@Entity('checklists')
export class Checklist {
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
    enum: ['patrol', 'opening', 'closing', 'safety', 'custom']
  })
  type: 'patrol' | 'opening' | 'closing' | 'safety' | 'custom';

  @OneToMany(() => ChecklistItem, (item) => item.checklist)
  items: ChecklistItem[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
