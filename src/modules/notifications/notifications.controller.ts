import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNotificationDto, BroadcastDto } from './dto/notifications.dto';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification' })
  async create(@Body() dto: CreateNotificationDto) { return this.service.create(dto); }

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast notification to all users' })
  async broadcast(@Body() dto: BroadcastDto) { return this.service.broadcast(dto); }

  @Get()
  @ApiOperation({ summary: 'Get notifications' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'read', required: false, type: Boolean })
  @ApiQuery({ name: 'type', required: false })
  async findAll(@Query('userId') userId?: string, @Query('read') read?: boolean, @Query('type') type?: string) {
    return this.service.findAll(userId, read, type);
  }

  @Get('unread-count/:userId')
  @ApiOperation({ summary: 'Get unread notification count' })
  async getUnreadCount(@Param('userId') userId: string) { return this.service.getUnreadCount(userId); }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  async findById(@Param('id') id: string) { return this.service.findById(id); }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string) { return this.service.markAsRead(id); }

  @Patch('mark-all-read/:userId')
  @ApiOperation({ summary: 'Mark all notifications as read for user' })
  async markAllAsRead(@Param('userId') userId: string) { return this.service.markAllAsRead(userId); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async delete(@Param('id') id: string) { await this.service.delete(id); return { message: 'Notification deleted' }; }

  @Delete('user/:userId')
  @ApiOperation({ summary: 'Delete all notifications for user' })
  async deleteAllForUser(@Param('userId') userId: string) { return this.service.deleteAllForUser(userId); }
}
