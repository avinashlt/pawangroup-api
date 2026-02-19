import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Training, TrainingDocument, GuardTraining, GuardTrainingDocument } from '../../schemas/training.schema';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
    @InjectModel(GuardTraining.name) private guardTrainingModel: Model<GuardTrainingDocument>,
  ) {}

  // Training courses
  async createTraining(data: Partial<Training>): Promise<Training> {
    const training = new this.trainingModel(data);
    return training.save();
  }

  async findTrainings(type?: string, isActive?: boolean): Promise<Training[]> {
    const query: any = {};
    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive;
    return this.trainingModel.find(query).sort({ name: 1 });
  }

  async findTrainingById(id: string): Promise<Training> {
    const training = await this.trainingModel.findById(id);
    if (!training) throw new NotFoundException(`Training ${id} not found`);
    return training;
  }

  async updateTraining(id: string, data: Partial<Training>): Promise<Training> {
    const training = await this.trainingModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!training) throw new NotFoundException(`Training ${id} not found`);
    return training;
  }

  async deleteTraining(id: string): Promise<void> {
    const result = await this.trainingModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Training ${id} not found`);
  }

  // Guard training assignments
  async assignTraining(data: any): Promise<GuardTraining> {
    const assignment = new this.guardTrainingModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      trainingId: new Types.ObjectId(data.trainingId as any),
      status: 'assigned',
      assignedAt: new Date(),
    });
    return assignment.save();
  }

  async findGuardTrainings(guardId?: string, trainingId?: string, status?: string): Promise<GuardTraining[]> {
    const query: any = {};
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (trainingId) query.trainingId = new Types.ObjectId(trainingId);
    if (status) query.status = status;
    return this.guardTrainingModel.find(query).sort({ assignedAt: -1 });
  }

  async findGuardTrainingById(id: string): Promise<GuardTraining> {
    const assignment = await this.guardTrainingModel.findById(id);
    if (!assignment) throw new NotFoundException(`Guard training ${id} not found`);
    return assignment;
  }

  async startTraining(id: string): Promise<GuardTraining> {
    const assignment = await this.guardTrainingModel.findByIdAndUpdate(
      id,
      { status: 'in-progress', startedAt: new Date() },
      { new: true },
    );
    if (!assignment) throw new NotFoundException(`Guard training ${id} not found`);
    return assignment;
  }

  async completeTraining(id: string, score?: number): Promise<GuardTraining> {
    const assignment = await this.guardTrainingModel.findByIdAndUpdate(
      id,
      { status: 'completed', completedAt: new Date(), score },
      { new: true },
    );
    if (!assignment) throw new NotFoundException(`Guard training ${id} not found`);
    return assignment;
  }

  async updateProgress(id: string, progress: number): Promise<GuardTraining> {
    const assignment = await this.guardTrainingModel.findByIdAndUpdate(
      id,
      { progress },
      { new: true },
    );
    if (!assignment) throw new NotFoundException(`Guard training ${id} not found`);
    return assignment;
  }

  // Metrics
  async getTrainingMetrics(guardId?: string): Promise<any> {
    const matchStage: any = {};
    if (guardId) matchStage.guardId = new Types.ObjectId(guardId);

    const stats = await this.guardTrainingModel.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusCounts = stats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {});
    const total = Object.values(statusCounts).reduce((a: any, b: any) => a + b, 0);
    const completed = statusCounts['completed'] || 0;

    return {
      total,
      statusBreakdown: statusCounts,
      completionRate: total ? (completed / (total as number) * 100).toFixed(1) : 0,
    };
  }

  async getOverdueTrainings(): Promise<GuardTraining[]> {
    return this.guardTrainingModel.find({
      status: { $in: ['assigned', 'in-progress'] },
      dueDate: { $lt: new Date() },
    }).sort({ dueDate: 1 });
  }

  async getUpcomingTrainings(days: number = 7): Promise<GuardTraining[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return this.guardTrainingModel.find({
      status: 'assigned',
      dueDate: { $gte: new Date(), $lte: futureDate },
    }).sort({ dueDate: 1 });
  }
}
