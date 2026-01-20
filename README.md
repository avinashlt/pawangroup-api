# NestJS API with Supabase PostgreSQL

A RESTful API built with NestJS framework and PostgreSQL database using Supabase as the database provider.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **PostgreSQL**: Powerful relational database via Supabase
- **TypeORM**: Database ORM with entity management
- **Validation**: Request validation using class-validator
- **CORS**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure configuration management

## Tech Stack

- NestJS 11.x
- TypeScript 5.x
- PostgreSQL (Supabase)
- TypeORM
- class-validator & class-transformer

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## Project Setup

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase PostgreSQL Configuration
DATABASE_HOST=db.your-supabase-project.supabase.co
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your-supabase-password
DATABASE_NAME=postgres

# Application
PORT=3000
NODE_ENV=development
```

**To get your Supabase credentials:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > Database
4. Find your connection details under "Connection string" or "Connection pooling"

### 3. Build the Project

```bash
npm run build
```

## Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Standard mode
npm run start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Users Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Example Request

**Create a new user:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

## Project Structure

```
src/
├── config/
│   └── typeorm.config.ts    # Database configuration
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Database Schema

The project includes a sample `User` entity with the following fields:

- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `name` (String)
- `isActive` (Boolean, default: true)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_HOST | Supabase database host | db.xxxxx.supabase.co |
| DATABASE_PORT | Database port | 5432 |
| DATABASE_USER | Database username | postgres |
| DATABASE_PASSWORD | Database password | your-password |
| DATABASE_NAME | Database name | postgres |
| PORT | Application port | 3000 |
| NODE_ENV | Environment mode | development/production |

## Development Tips

- TypeORM's `synchronize` option is enabled in development to auto-create tables
- In production, use migrations instead of synchronize
- Update the entities path in `typeorm.config.ts` as you add more entities
- Use the Users module as a template for creating new modules

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Supabase Documentation](https://supabase.com/docs)
- [NestJS Discord](https://discord.gg/G7Qnnhy)

## License

This project is [MIT licensed](LICENSE).
