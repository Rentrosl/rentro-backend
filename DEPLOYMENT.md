# Deployment Guide

## MongoDB Cloud Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `rentro`

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/rentro?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,https://yourdomain.com
```

## Deployment Platforms

### Railway
1. Push your code to GitHub
2. Connect your GitHub repo to Railway
3. Set environment variables in Railway dashboard
4. Deploy

### Render
1. Push your code to GitHub
2. Create a new Web Service in Render
3. Connect your GitHub repo
4. Set environment variables
5. Set build command: `npm install`
6. Set start command: `npm start`

### Heroku
1. Push your code to GitHub
2. Create a new app in Heroku
3. Connect your GitHub repo
4. Set environment variables in Settings
5. Deploy

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Seed the database with sample data:
```bash
npm run seed
```

## Testing the API

Once deployed, test these endpoints:

- Health check: `GET /api/health`
- Sign up: `POST /api/auth/signup`
- Login: `POST /api/auth/login`
- Get cars: `GET /api/cars`

## Frontend Integration

Update your frontend's API base URL to point to your deployed backend:

```javascript
const API_BASE = 'https://your-backend-url.com/api';
```
