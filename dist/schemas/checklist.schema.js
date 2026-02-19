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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistSubmissionSchema = exports.ChecklistSubmission = exports.CompletedItem = exports.ChecklistSchema = exports.Checklist = exports.ChecklistItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let ChecklistItem = class ChecklistItem {
};
exports.ChecklistItem = ChecklistItem;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Item description' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ChecklistItem.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is item required' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ChecklistItem.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Display order' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ChecklistItem.prototype, "order", void 0);
exports.ChecklistItem = ChecklistItem = __decorate([
    (0, mongoose_1.Schema)()
], ChecklistItem);
let Checklist = class Checklist {
};
exports.Checklist = Checklist;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checklist name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Checklist.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Checklist.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Checklist.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checklist type', enum: ['patrol', 'opening', 'closing', 'safety', 'custom'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['patrol', 'opening', 'closing', 'safety', 'custom'] }),
    __metadata("design:type", String)
], Checklist.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checklist items', type: [ChecklistItem] }),
    (0, mongoose_1.Prop)({ type: [ChecklistItem], required: true }),
    __metadata("design:type", Array)
], Checklist.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is checklist active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Checklist.prototype, "isActive", void 0);
exports.Checklist = Checklist = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Checklist);
exports.ChecklistSchema = mongoose_1.SchemaFactory.createForClass(Checklist);
let CompletedItem = class CompletedItem {
};
exports.CompletedItem = CompletedItem;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Item ID' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CompletedItem.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is item completed' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], CompletedItem.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompletedItem.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompletedItem.prototype, "photo", void 0);
exports.CompletedItem = CompletedItem = __decorate([
    (0, mongoose_1.Schema)()
], CompletedItem);
let ChecklistSubmission = class ChecklistSubmission {
};
exports.ChecklistSubmission = ChecklistSubmission;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checklist ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Checklist', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChecklistSubmission.prototype, "checklistId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checklist name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ChecklistSubmission.prototype, "checklistName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChecklistSubmission.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ChecklistSubmission.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChecklistSubmission.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ChecklistSubmission.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submission timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], ChecklistSubmission.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Completed items', type: [CompletedItem] }),
    (0, mongoose_1.Prop)({ type: [CompletedItem], required: true }),
    __metadata("design:type", Array)
], ChecklistSubmission.prototype, "completedItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overall notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChecklistSubmission.prototype, "overallNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submission status', enum: ['complete', 'incomplete'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['complete', 'incomplete'] }),
    __metadata("design:type", String)
], ChecklistSubmission.prototype, "status", void 0);
exports.ChecklistSubmission = ChecklistSubmission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ChecklistSubmission);
exports.ChecklistSubmissionSchema = mongoose_1.SchemaFactory.createForClass(ChecklistSubmission);
exports.ChecklistSubmissionSchema.index({ checklistId: 1, submittedAt: -1 });
exports.ChecklistSubmissionSchema.index({ guardId: 1, submittedAt: -1 });
exports.ChecklistSubmissionSchema.index({ siteId: 1, submittedAt: -1 });
//# sourceMappingURL=checklist.schema.js.map