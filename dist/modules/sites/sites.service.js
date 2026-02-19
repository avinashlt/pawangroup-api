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
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const site_schema_1 = require("../../schemas/site.schema");
let SitesService = class SitesService {
    constructor(siteModel) {
        this.siteModel = siteModel;
    }
    async create(createDto) {
        const site = new this.siteModel(createDto);
        return site.save();
    }
    async findAll(activeOnly = false) {
        const query = activeOnly ? { isActive: true } : {};
        return this.siteModel.find(query).sort({ name: 1 });
    }
    async findOne(id) {
        const site = await this.siteModel.findById(id);
        if (!site) {
            throw new common_1.NotFoundException(`Site with ID ${id} not found`);
        }
        return site;
    }
    async update(id, updateDto) {
        const site = await this.siteModel.findByIdAndUpdate(id, { $set: updateDto }, { new: true });
        if (!site) {
            throw new common_1.NotFoundException(`Site with ID ${id} not found`);
        }
        return site;
    }
    async remove(id) {
        const result = await this.siteModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Site with ID ${id} not found`);
        }
    }
    async toggleActive(id) {
        const site = await this.siteModel.findById(id);
        if (!site) {
            throw new common_1.NotFoundException(`Site with ID ${id} not found`);
        }
        site.isActive = !site.isActive;
        return site.save();
    }
    async searchSites(query) {
        return this.siteModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
                { clientName: { $regex: query, $options: 'i' } },
            ],
        }).sort({ name: 1 });
    }
};
exports.SitesService = SitesService;
exports.SitesService = SitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(site_schema_1.Site.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SitesService);
//# sourceMappingURL=sites.service.js.map