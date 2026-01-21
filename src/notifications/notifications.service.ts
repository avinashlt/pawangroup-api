import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...dto,
      timestamp: new Date(),
      priority: dto.priority || 'medium',
    });
    return await this.notificationRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find({
      order: { timestamp: 'DESC' },
      take: 100,
    });
  }

  async findByUser(userId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });
  }

  async findUnread(userId?: string): Promise<Notification[]> {
    const where: any = { isRead: false };
    if (userId) {
      where.userId = userId;
    }
    return await this.notificationRepository.find({
      where,
      order: { timestamp: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<Notification> {
    await this.notificationRepository.update(id, { isRead: true });
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update({ userId, isRead: false }, { isRead: true });
  }
}
