import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Training Schema
export type TrainingDocument = Training & Document;

@Schema({ timestamps: true })
export class Training {
  @ApiProperty({ description: 'Training name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Training description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Training type', enum: ['mandatory', 'optional', 'certification'] })
  @Prop({ required: true, enum: ['mandatory', 'optional', 'certification'] })
  type: string;

  @ApiProperty({ description: 'Duration in hours' })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({ description: 'Validity period in months', required: false })
  @Prop()
  validityPeriod?: number;

  @ApiProperty({ description: 'Is training active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Training content/materials URL', required: false })
  @Prop()
  contentUrl?: string;

  @ApiProperty({ description: 'Passing score percentage', required: false })
  @Prop()
  passingScore?: number;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);

// Guard Training Schema
export type GuardTrainingDocument = GuardTraining & Document;

@Schema({ timestamps: true })
export class GuardTraining {
  @ApiProperty({ description: 'Guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Training ID' })
  @Prop({ type: Types.ObjectId, ref: 'Training', required: true })
  trainingId: Types.ObjectId;

  @ApiProperty({ description: 'Training name' })
  @Prop({ required: true })
  trainingName: string;

  @ApiProperty({
    description: 'Training status',
    enum: ['not-started', 'in-progress', 'completed', 'expired'],
  })
  @Prop({
    required: true,
    enum: ['not-started', 'in-progress', 'completed', 'expired'],
    default: 'not-started',
  })
  status: string;

  @ApiProperty({ description: 'Assignment timestamp' })
  @Prop({ required: true })
  assignedAt: Date;

  @ApiProperty({ description: 'Due date' })
  @Prop({ required: true })
  dueDate: Date;

  @ApiProperty({ description: 'Completion timestamp', required: false })
  @Prop()
  completedAt?: Date;

  @ApiProperty({ description: 'Expiry date', required: false })
  @Prop()
  expiresAt?: Date;

  @ApiProperty({ description: 'Score achieved', required: false })
  @Prop()
  score?: number;

  @ApiProperty({ description: 'Certificate URL', required: false })
  @Prop()
  certificate?: string;

  @ApiProperty({ description: 'Progress percentage', required: false })
  @Prop({ default: 0 })
  progress?: number;
}

export const GuardTrainingSchema = SchemaFactory.createForClass(GuardTraining);

// Create indexes
GuardTrainingSchema.index({ guardId: 1, status: 1 });
GuardTrainingSchema.index({ trainingId: 1 });
GuardTrainingSchema.index({ dueDate: 1, status: 1 });
