import { TrainingService } from './training.service';
import { CreateTrainingDto, UpdateTrainingDto, AssignTrainingDto, CompleteTrainingDto, UpdateProgressDto } from './dto/training.dto';
export declare class TrainingController {
    private readonly service;
    constructor(service: TrainingService);
    createTraining(dto: CreateTrainingDto): Promise<import("../../schemas/training.schema").Training>;
    findTrainings(type?: string, isActive?: boolean): Promise<import("../../schemas/training.schema").Training[]>;
    getTrainingMetrics(guardId?: string): Promise<any>;
    getOverdueTrainings(): Promise<import("../../schemas/training.schema").GuardTraining[]>;
    getUpcomingTrainings(days?: number): Promise<import("../../schemas/training.schema").GuardTraining[]>;
    findTrainingById(id: string): Promise<import("../../schemas/training.schema").Training>;
    updateTraining(id: string, dto: UpdateTrainingDto): Promise<import("../../schemas/training.schema").Training>;
    deleteTraining(id: string): Promise<{
        message: string;
    }>;
    assignTraining(dto: AssignTrainingDto): Promise<import("../../schemas/training.schema").GuardTraining>;
    findGuardTrainings(guardId?: string, trainingId?: string, status?: string): Promise<import("../../schemas/training.schema").GuardTraining[]>;
    findGuardTrainingById(id: string): Promise<import("../../schemas/training.schema").GuardTraining>;
    startTraining(id: string): Promise<import("../../schemas/training.schema").GuardTraining>;
    completeTraining(id: string, dto: CompleteTrainingDto): Promise<import("../../schemas/training.schema").GuardTraining>;
    updateProgress(id: string, dto: UpdateProgressDto): Promise<import("../../schemas/training.schema").GuardTraining>;
}
