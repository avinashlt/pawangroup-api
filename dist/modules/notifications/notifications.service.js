"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("../../schemas/notification.schema");
let NotificationsService = class NotificationsService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async create(data) {
        const notification = new this.notificationModel({
            ...data,
            userId: data.userId ? new mongoose_2.Types.ObjectId(data.userId) : undefined,
            timestamp: new Date(),
            read: false,
        });
        return notification.save();
    }
    async findAll(userId, read, type) {
        const query = {};
        if (userId)
            query.userId = new mongoose_2.Types.ObjectId(userId);
        if (read !== undefined)
            query.read = read;
        if (type)
            query.type = type;
        return this.notificationModel.find(query).sort({ timestamp: -1 });
    }
    async findById(id) {
        const notification = await this.notificationModel.findById(id);
        if (!notification)
            throw new common_1.NotFoundException(`Notification ${id} not found`);
        return notification;
    }
    async markAsRead(id) {
        const notification = await this.notificationModel.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification)
            throw new common_1.NotFoundException(`Notification ${id} not found`);
        return notification;
    }
    async markAllAsRead(userId) {
        const result = await this.notificationModel.updateMany({ userId: new mongoose_2.Types.ObjectId(userId), read: false }, { read: true });
        return { modified: result.modifiedCount };
    }
    async delete(id) {
        const result = await this.notificationModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Notification ${id} not found`);
    }
    async deleteAllForUser(userId) {
        const result = await this.notificationModel.deleteMany({ userId: new mongoose_2.Types.ObjectId(userId) });
        return { deleted: result.deletedCount };
    }
    async getUnreadCount(userId) {
        const count = await this.notificationModel.countDocuments({ userId: new mongoose_2.Types.ObjectId(userId), read: false });
        return { count };
    }
    async broadcast(data) {
        const notification = new this.notificationModel({ ...data, timestamp: new Date(), read: false, broadcast: true });
        return notification.save();
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map