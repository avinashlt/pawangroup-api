import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('guards')
export class Guard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  employeeId: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  assignedSite: string;

  @Column({ 
    type: 'enum',
    enum: ['morning', 'evening', 'night']
  })
  shift: 'morning' | 'evening' | 'night';

  @Column({ 
    type: 'enum',
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active'
  })
  status: 'active' | 'inactive' | 'on-leave';

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  dateOfJoining: Date;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  emergencyContactName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
