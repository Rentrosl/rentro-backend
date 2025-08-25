# Rentro Backend

Node.js + Express + MongoDB backend for the Rentro app.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```
npm install
```

3. Run development server:

```
npm run dev
```

## API Base

- Local: `http://localhost:4000/api`

## Routes

- Auth: `/auth/signup`, `/auth/login`, `/auth/logout`
- Users: `/users/:id` (GET, PUT)
- Cars: `/cars` (GET, POST), `/cars/:id` (GET, PUT, DELETE)
- Bookings: `/bookings` (POST), `/bookings/owner/:id`, `/bookings/renter/:id`, `/bookings/:id` (PUT)
- Messages: `/messages` (POST), `/messages/:conversationId` (GET)
- Reviews: `/reviews` (POST), `/reviews/:carId` (GET)
- Earnings: `/earnings/owner/:id`

## Notes

- JWT auth with `Authorization: Bearer <token>`
- CORS configured for Vite dev server
