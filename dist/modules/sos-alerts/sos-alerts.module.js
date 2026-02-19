"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SosAlertsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const sos_alerts_controller_1 = require("./sos-alerts.controller");
const sos_alerts_service_1 = require("./sos-alerts.service");
const sos_alert_schema_1 = require("../../schemas/sos-alert.schema");
let SosAlertsModule = class SosAlertsModule {
};
exports.SosAlertsModule = SosAlertsModule;
exports.SosAlertsModule = SosAlertsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: sos_alert_schema_1.SosAlert.name, schema: sos_alert_schema_1.SosAlertSchema }])],
        controllers: [sos_alerts_controller_1.SosAlertsController],
        providers: [sos_alerts_service_1.SosAlertsService],
        exports: [sos_alerts_service_1.SosAlertsService],
    })
], SosAlertsModule);
//# sourceMappingURL=sos-alerts.module.js.map