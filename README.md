# NestJS Chat Application

Bu loyiha NestJS frameworkida yaratilgan real-time chat ilovasidir.

## Loyiha tuzilishi

```
src/
├── constants/        # Constant qiymatlar
├── database/        # Database konfiguratsiyasi
├── entity/         # Database entitylari
├── modules/        # Asosiy modullar (users, chats)
├── utils/          # Yordamchi funksiyalar
├── app.module.ts   # Asosiy modul
└── main.ts         # Dastur entry point
```

## Asosiy funksionallik

- Foydalanuvchilar ro'yxatdan o'tishi va tizimga kirishi
- Real-time xabarlar almashish
- Guruh chatlari
- Xabarlarni tahrirlash va o'chirish
- Foydalanuvchi profili

## O'rnatish

```bash
# Kerakli paketlarni o'rnatish
$ yarn install

# .env faylini sozlash
$ cp .env.example .env
```

## Ishga tushirish

```bash
# Development mode
$ yarn run start:dev

# Production mode
$ yarn run start:prod
```

## Test qilish

```bash
# unit testlar
$ yarn run test

# e2e testlar
$ yarn run test:e2e
```

## API Endpoints

### Foydalanuvchilar

- POST /api/users/register - Ro'yxatdan o'tish
- POST /api/users/login - Tizimga kirish
- GET /api/users/profile - Profil ma'lumotlarini olish
- PUT /api/users/profile - Profil ma'lumotlarini yangilash

### Chatlar

- GET /api/chats - Chatlar ro'yxatini olish
- POST /api/chats - Yangi chat yaratish
- PUT /api/chats/:id - Chat ma'lumotlarini yangilash
- DELETE /api/chats/:id - Chatni o'chirish
- POST /api/chats/:id/messages - Xabar yuborish

## Texnologiyalar

- NestJS - Backend framework
- TypeORM - Database ORM
- PostgreSQL - Ma'lumotlar bazasi
- WebSocket - Real-time aloqa
- JWT - Autentifikatsiya

## Litsenziya

MIT
