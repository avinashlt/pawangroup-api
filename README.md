# Client Portal Backend API

A comprehensive NestJS backend API for the security guard management client portal.

## Tech Stack

- **Framework**: NestJS v10
- **Database**: MongoDB with Mongoose v8
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator & class-transformer

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

```bash
cd api
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: Token expiration (default: 7d)
- `PORT`: Server port (default: 3000)

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Testing

### Prerequisites for Testing

#### MongoDB Atlas (Cloud)
1. Ensure your IP is whitelisted in MongoDB Atlas Network Access:
   - Go to **Network Access** in MongoDB Atlas
   - Add your public IP or allow `0.0.0.0/0` (allow all)
   - Status should show "Active"

Find your public IP:
```bash
curl ifconfig.me
```

#### Local MongoDB (Alternative)
```bash
# macOS with brew
brew install mongodb-community
brew services start mongodb-community

# Verify MongoDB is running
mongosh --eval "db.version()"
```

### Testing MongoDB Connection

Test MongoDB connectivity before running the server:

```bash
# Run the MongoDB connection test
node test-mongo.js
```

Expected output on success:
```
Testing MongoDB Atlas connection...
Waiting for connection (timeout: 30s)...
SUCCESS: Connected to MongoDB Atlas!
```

If you get `FAILED: read ETIMEDOUT`, your IP is not whitelisted in Atlas.

### Running the Server

#### Development Mode (with auto-reload)
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

### API Documentation

Once the server is running, access Swagger documentation at:
```
http://localhost:3000/api/docs 
```

From here you can:
- View all available endpoints
- See request/response schemas
- Test endpoints directly with the **Try it out** button

### Testing API Endpoints

#### Quick Health Check
```bash
curl http://localhost:3000/api
```

#### Authentication (Get JWT Token)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

#### Using the JWT Token
```bash
TOKEN="<your_token_from_login>"

curl http://localhost:3000/guards \
  -H "Authorization: Bearer $TOKEN"
```

#### Example: Get Dashboard Stats
```bash
TOKEN="<your_token>"

curl http://localhost:3000/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

## API Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | `/auth/*` | Login, register, password management |
| **Guards** | `/guards/*` | Guard CRUD, status management |
| **Dashboard** | `/dashboard/*` | Stats, trends, recent alerts |
| **Attendance** | `/attendance/*` | Check-in/out, monthly reports |
| **Incidents** | `/incidents/*` | Incident reporting & management |
| **Locations** | `/locations/*` | Real-time tracking, history |
| **Sites** | `/sites/*` | Site management |
| **Checkpoints** | `/checkpoints/*` | Patrol checkpoints & scanning |
| **Geofences** | `/geofences/*` | Geofence zones & alerts |
| **SOS Alerts** | `/sos-alerts/*` | Emergency alert handling |
| **Notifications** | `/notifications/*` | System notifications |
| **Shifts** | `/shifts/*` | Shift scheduling, swaps, time-off |
| **Reports** | `/reports/*` | Reports & analytics |
| **Compliance** | `/compliance/*` | Checklists & submissions |
| **Training** | `/training/*` | Training courses & assignments |
| **Monitoring** | `/monitoring/*` | AI/sleep detection alerts |
| **Cameras** | `/cameras/*` | Camera management |

## Authentication

All endpoints except `/auth/login` and `/auth/register` require JWT authentication.

Include the token in requests:
```
Authorization: Bearer <token>
```

## Project Structure

```
api/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root module
│   ├── modules/             # Feature modules
│   │   ├── auth/
│   │   ├── guards/
│   │   ├── dashboard/
│   │   ├── attendance/
│   │   ├── incidents/
│   │   ├── locations/
│   │   ├── sites/
│   │   ├── checkpoints/
│   │   ├── geofences/
│   │   ├── sos-alerts/
│   │   ├── notifications/
│   │   ├── shifts/
│   │   ├── reports/
│   │   ├── compliance/
│   │   ├── training/
│   │   ├── monitoring/
│   │   └── cameras/
│   └── schemas/             # MongoDB schemas
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

## License

Proprietary - Pawan Group
