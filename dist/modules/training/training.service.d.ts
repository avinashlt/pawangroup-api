import { Model } from 'mongoose';
import { Training, TrainingDocument, GuardTraining, GuardTrainingDocument } from '../../schemas/training.schema';
export declare class TrainingService {
    private trainingModel;
    private guardTrainingModel;
    constructor(trainingModel: Model<TrainingDocument>, guardTrainingModel: Model<GuardTrainingDocument>);
    createTraining(data: Partial<Training>): Promise<Training>;
    findTrainings(type?: string, isActive?: boolean): Promise<Training[]>;
    findTrainingById(id: string): Promise<Training>;
    updateTraining(id: string, data: Partial<Training>): Promise<Training>;
    deleteTraining(id: string): Promise<void>;
    assignTraining(data: any): Promise<GuardTraining>;
    findGuardTrainings(guardId?: string, trainingId?: string, status?: string): Promise<GuardTraining[]>;
    findGuardTrainingById(id: string): Promise<GuardTraining>;
    startTraining(id: string): Promise<GuardTraining>;
    completeTraining(id: string, score?: number): Promise<GuardTraining>;
    updateProgress(id: string, progress: number): Promise<GuardTraining>;
    getTrainingMetrics(guardId?: string): Promise<any>;
    getOverdueTrainings(): Promise<GuardTraining[]>;
    getUpcomingTrainings(days?: number): Promise<GuardTraining[]>;
}
