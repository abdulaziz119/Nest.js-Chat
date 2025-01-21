# NestJS Chat Application

A real-time chat application built with NestJS framework.

## Project Structure

```
src/
├── constants/        # Constant values
├── database/        # Database configuration
├── entity/         # Database entities
├── modules/        # Core modules (users, chats)
├── utils/          # Helper functions
├── app.module.ts   # Main module
└── main.ts         # Application entry point
```

## Key Features

- User registration and authentication
- Real-time messaging
- Group chats
- Message editing and deletion
- User profiles

## Installation

```bash
# Install dependencies
$ yarn install

# Set up environment variables
$ cp .env.example .env
```

## Running the app

```bash
# Development mode
$ yarn run start:dev

# Production mode
$ yarn run start:prod
```

## Testing

```bash
# Unit tests
$ yarn run test

# E2E tests
$ yarn run test:e2e
```

## API Documentation

### Users Module (/api/users)

#### User Management
- `POST /users/add` - Create new user
  - Body: UsersCreateDto
  - Response: UserEntity
  - Status: 201

- `GET /users/findAll` - Get all users with pagination
  - Query: PaginateParamsDto
  - Response: UserEntity[]
  - Status: 200

- `GET /users/findOne/:id` - Get user by ID
  - Param: id (number)
  - Response: UserEntity
  - Status: 200

- `PUT /users/update` - Update user
  - Body: UsersUpdateDto
  - Response: UserEntity
  - Status: 202

- `DELETE /users/delete/:id` - Delete user
  - Param: id (number)
  - Response: DeleteResult
  - Status: 200

### Chats Module (/api/chats)

#### Chat Management
- `POST /chats/add` - Create new chat
  - Body: ChatsCreateDto
  - Response: ChatEntity
  - Status: 201

- `GET /chats/findAll` - Get all chats with pagination
  - Query: PaginateParamsDto
  - Response: ChatEntity[]
  - Status: 200

- `GET /chats/findOne/:id` - Get chat by ID
  - Param: id (number)
  - Response: ChatEntity
  - Status: 200

- `PUT /chats/update` - Update chat
  - Body: ChatsUpdateDto
  - Response: ChatEntity
  - Status: 202

- `DELETE /chats/delete/:id` - Delete chat
  - Param: id (number)
  - Response: DeleteResult
  - Status: 200

### Messages Module (/api/message)

#### Message Management
- `POST /message/add` - Create new message
  - Body: MessageCreateDto
  - Response: MessageEntity
  - Status: 201

- `GET /message/findAll` - Get all messages with pagination
  - Query: PaginateParamsDto
  - Response: MessageEntity[]
  - Status: 200

- `GET /message/findOne/:id` - Get message by ID
  - Param: id (number)
  - Response: MessageEntity
  - Status: 200

- `PUT /message/update` - Update message
  - Body: MessageUpdateDto
  - Response: MessageEntity
  - Status: 202

- `DELETE /message/delete/:id` - Delete message
  - Param: id (number)
  - Response: DeleteResult
  - Status: 200

### Chat Users Module (/api/chat-users)

#### Chat Users Management
- `GET /chat-users/findAll` - Get all chat users with pagination
  - Query: PaginateParamsDto
  - Response: ChatUsersEntity[]
  - Status: 200

- `GET /chat-users/findOne/:id` - Get chat user by ID
  - Param: id (number)
  - Response: ChatUsersEntity
  - Status: 200

- `PUT /chat-users/update` - Update chat user
  - Body: ChatUsersUpdateDto
  - Response: ChatUsersEntity
  - Status: 202

## Technologies

- NestJS - Backend framework
- TypeORM - Database ORM
- PostgreSQL - Database
- WebSocket - Real-time communication
- JWT - Authentication

## License

MIT
