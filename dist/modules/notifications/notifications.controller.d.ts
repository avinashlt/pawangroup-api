import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, BroadcastDto } from './dto/notifications.dto';
export declare class NotificationsController {
    private readonly service;
    constructor(service: NotificationsService);
    create(dto: CreateNotificationDto): Promise<import("../../schemas/notification.schema").Notification>;
    broadcast(dto: BroadcastDto): Promise<import("../../schemas/notification.schema").Notification>;
    findAll(userId?: string, read?: boolean, type?: string): Promise<import("../../schemas/notification.schema").Notification[]>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    findById(id: string): Promise<import("../../schemas/notification.schema").Notification>;
    markAsRead(id: string): Promise<import("../../schemas/notification.schema").Notification>;
    markAllAsRead(userId: string): Promise<{
        modified: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    deleteAllForUser(userId: string): Promise<{
        deleted: number;
    }>;
}
