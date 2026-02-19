import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Checklist Item Sub-schema
@Schema()
export class ChecklistItem {
  @ApiProperty({ description: 'Item description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Is item required' })
  @Prop({ default: false })
  isRequired: boolean;

  @ApiProperty({ description: 'Display order' })
  @Prop({ required: true })
  order: number;
}

// Checklist Schema
export type ChecklistDocument = Checklist & Document;

@Schema({ timestamps: true })
export class Checklist {
  @ApiProperty({ description: 'Checklist name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Checklist type', enum: ['patrol', 'opening', 'closing', 'safety', 'custom'] })
  @Prop({ required: true, enum: ['patrol', 'opening', 'closing', 'safety', 'custom'] })
  type: string;

  @ApiProperty({ description: 'Checklist items', type: [ChecklistItem] })
  @Prop({ type: [ChecklistItem], required: true })
  items: ChecklistItem[];

  @ApiProperty({ description: 'Is checklist active' })
  @Prop({ default: true })
  isActive: boolean;
}

export const ChecklistSchema = SchemaFactory.createForClass(Checklist);

// Checklist Submission Schema
export type ChecklistSubmissionDocument = ChecklistSubmission & Document;

@Schema()
export class CompletedItem {
  @ApiProperty({ description: 'Item ID' })
  @Prop({ required: true })
  itemId: string;

  @ApiProperty({ description: 'Is item completed' })
  @Prop({ required: true })
  isCompleted: boolean;

  @ApiProperty({ description: 'Notes', required: false })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Photo URL', required: false })
  @Prop()
  photo?: string;
}

@Schema({ timestamps: true })
export class ChecklistSubmission {
  @ApiProperty({ description: 'Checklist ID' })
  @Prop({ type: Types.ObjectId, ref: 'Checklist', required: true })
  checklistId: Types.ObjectId;

  @ApiProperty({ description: 'Checklist name' })
  @Prop({ required: true })
  checklistName: string;

  @ApiProperty({ description: 'Guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Submission timestamp' })
  @Prop({ required: true })
  submittedAt: Date;

  @ApiProperty({ description: 'Completed items', type: [CompletedItem] })
  @Prop({ type: [CompletedItem], required: true })
  completedItems: CompletedItem[];

  @ApiProperty({ description: 'Overall notes', required: false })
  @Prop()
  overallNotes?: string;

  @ApiProperty({ description: 'Submission status', enum: ['complete', 'incomplete'] })
  @Prop({ required: true, enum: ['complete', 'incomplete'] })
  status: string;
}

export const ChecklistSubmissionSchema = SchemaFactory.createForClass(ChecklistSubmission);

// Create indexes
ChecklistSubmissionSchema.index({ checklistId: 1, submittedAt: -1 });
ChecklistSubmissionSchema.index({ guardId: 1, submittedAt: -1 });
ChecklistSubmissionSchema.index({ siteId: 1, submittedAt: -1 });
