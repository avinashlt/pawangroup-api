import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from '../../schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  async create(data: any): Promise<Notification> {
    const notification = new this.notificationModel({
      ...data,
      userId: data.userId ? new Types.ObjectId(data.userId as any) : undefined,
      timestamp: new Date(),
      read: false,
    });
    return notification.save();
  }

  async findAll(userId?: string, read?: boolean, type?: string): Promise<Notification[]> {
    const query: any = {};
    if (userId) query.userId = new Types.ObjectId(userId);
    if (read !== undefined) query.read = read;
    if (type) query.type = type;
    return this.notificationModel.find(query).sort({ timestamp: -1 });
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) throw new NotFoundException(`Notification ${id} not found`);
    return notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) throw new NotFoundException(`Notification ${id} not found`);
    return notification;
  }

  async markAllAsRead(userId: string): Promise<{ modified: number }> {
    const result = await this.notificationModel.updateMany(
      { userId: new Types.ObjectId(userId), read: false },
      { read: true },
    );
    return { modified: result.modifiedCount };
  }

  async delete(id: string): Promise<void> {
    const result = await this.notificationModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Notification ${id} not found`);
  }

  async deleteAllForUser(userId: string): Promise<{ deleted: number }> {
    const result = await this.notificationModel.deleteMany({ userId: new Types.ObjectId(userId) });
    return { deleted: result.deletedCount };
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = await this.notificationModel.countDocuments({ userId: new Types.ObjectId(userId), read: false });
    return { count };
  }

  async broadcast(data: { title: string; message: string; type: string; priority?: string }): Promise<Notification> {
    const notification = new this.notificationModel({ ...data, timestamp: new Date(), read: false, broadcast: true });
    return notification.save();
  }
}
