import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ 
    type: 'enum',
    enum: ['mandatory', 'optional', 'certification']
  })
  type: 'mandatory' | 'optional' | 'certification';

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  duration: number;

  @Column({ type: 'int', nullable: true })
  validityPeriod: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
