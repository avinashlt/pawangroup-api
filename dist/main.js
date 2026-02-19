"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
    ];
    if (process.env.CORS_ORIGIN && !corsOrigins.includes(process.env.CORS_ORIGIN)) {
        corsOrigins.push(process.env.CORS_ORIGIN);
    }
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || corsOrigins.includes(origin)) {
                callback(null, true);
            }
            else if (process.env.NODE_ENV === 'production') {
                callback(new Error('CORS not allowed'));
            }
            else {
                callback(null, true);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
        ],
        preflightContinue: false,
        optionsSuccessStatus: 200,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pawan Group Client Portal API')
        .setDescription(`
      ## API Documentation for Pawan Group Security Services Client Portal
      
      This API provides endpoints for managing:
      - **Authentication** - User login and JWT token management
      - **Guards** - Guard management and profiles
      - **Attendance** - Attendance tracking and reporting
      - **Incidents** - Incident logging and management
      - **Locations** - Real-time guard location tracking
      - **Checkpoints & Geofencing** - Checkpoint scanning and geofence management
      - **SOS Alerts** - Emergency alert handling
      - **Notifications** - System notifications
      - **Sites** - Site/location management
      - **Scheduling** - Shift management, swap requests, time-off
      - **Reports & Analytics** - Performance metrics and reporting
      - **Compliance & Training** - Checklists and training management
      - **Advanced Monitoring** - AI alerts, sleep detection, cameras
    `)
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('auth', 'Authentication endpoints')
        .addTag('dashboard', 'Dashboard statistics')
        .addTag('guards', 'Guard management')
        .addTag('attendance', 'Attendance tracking')
        .addTag('incidents', 'Incident management')
        .addTag('locations', 'Real-time location tracking')
        .addTag('checkpoints', 'Checkpoint management')
        .addTag('geofences', 'Geofence management')
        .addTag('sos-alerts', 'SOS alert management')
        .addTag('notifications', 'Notification management')
        .addTag('sites', 'Site management')
        .addTag('shifts', 'Shift scheduling')
        .addTag('reports', 'Reports and analytics')
        .addTag('compliance', 'Compliance and checklists')
        .addTag('training', 'Training management')
        .addTag('monitoring', 'Advanced monitoring (AI, Sleep detection)')
        .addTag('cameras', 'Camera management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        customSiteTitle: 'Pawan Group Portal API Docs',
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map