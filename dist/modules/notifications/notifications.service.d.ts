import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../../schemas/notification.schema';
export declare class NotificationsService {
    private notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    create(data: any): Promise<Notification>;
    findAll(userId?: string, read?: boolean, type?: string): Promise<Notification[]>;
    findById(id: string): Promise<Notification>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<{
        modified: number;
    }>;
    delete(id: string): Promise<void>;
    deleteAllForUser(userId: string): Promise<{
        deleted: number;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    broadcast(data: {
        title: string;
        message: string;
        type: string;
        priority?: string;
    }): Promise<Notification>;
}
