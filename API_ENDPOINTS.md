# API Endpoints Documentation

## Base URL
`http://localhost:3000`

## Available Endpoints

### Root Endpoint
**GET /** 
- Description: Health check endpoint
- Response: `"Hello World!"`
- Status: 200 OK

### Users Endpoints

#### 1. Create User
**POST /users**
- Description: Create a new user
- Request Body:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securePassword123"
}
```
- Response: Created user object
- Status: 201 Created

#### 2. Get All Users
**GET /users**
- Description: Retrieve all users
- Response: Array of user objects
- Status: 200 OK

#### 3. Get User by ID
**GET /users/:id**
- Description: Retrieve a specific user by ID
- Parameters: `id` (UUID)
- Response: User object
- Status: 200 OK

#### 4. Update User
**PATCH /users/:id**
- Description: Update a user's information
- Parameters: `id` (UUID)
- Request Body (partial):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```
- Response: Updated user object
- Status: 200 OK

#### 5. Delete User
**DELETE /users/:id**
- Description: Delete a user
- Parameters: `id` (UUID)
- Response: Success message or deleted user object
- Status: 200 OK

## Testing with cURL

### Test Root Endpoint
```bash
curl http://localhost:3000
```

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/users
```

### Get User by ID
```bash
curl http://localhost:3000/users/{user-id}
```

### Update User
```bash
curl -X PATCH http://localhost:3000/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/users/{user-id}
```

## Notes
- Replace `{user-id}` with actual UUID
- CORS is enabled
- Validation is enabled globally
- Database connection required for users endpoints
