# Feedback Management Dashboard

A full-stack application for collecting, managing, and analyzing customer feedback with real-time analytics.

## Features

- **Feedback Form**: Submit feedback with name, email, message, and 1-5 rating
- **Real-time Analytics**: View total feedbacks, average rating, positive/negative split
- **Feedback Table**: View all submitted feedbacks with sorting and filtering
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **RESTful API**: Clean Express.js backend with SQLite database

## Project Structure

```
.
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── public/           # Static assets
│   ├── styles/           # Global styles
│   ├── package.json      # Frontend dependencies
│   └── ...
├── backend/              # Express.js backend API
│   ├── api/              # API routes
│   │   └── feedback.js   # Main API server
│   ├── scripts/          # Database scripts
│   ├── feedback.db       # SQLite database (created automatically)
│   └── package.json        # Backend dependencies
├── render.yaml           # Render deployment config
├── vercel.json           # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the API server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env.local` file (optional for local development):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /api/feedback
Submit new feedback

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great product!",
  "rating": 5
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great product!",
  "rating": 5,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/feedback
Fetch all feedbacks (sorted by newest first)

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great product!",
    "rating": 5,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /api/stats
Get analytics data

**Response:**
```json
{
  "total": 10,
  "avgRating": 4.2,
  "positive": 7,
  "negative": 2
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok"
}
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Render (backend) and Vercel (frontend).

### Quick Deploy

**Backend (Render):**
- Root Directory: `backend`
- Build Command: `npm install --legacy-peer-deps`
- Start Command: `node api/feedback.js`

**Frontend (Vercel):**
- Root Directory: `frontend`
- Framework: Next.js (auto-detected)
- Environment Variable: `NEXT_PUBLIC_API_URL` = your Render backend URL

## Database

SQLite database with single `feedbacks` table:
- `id`: Auto-incrementing primary key
- `name`: User name (required)
- `email`: User email (required)
- `message`: Feedback message (required)
- `rating`: 1-5 rating (required)
- `createdAt`: Timestamp (auto-set)

The database is automatically created on first run in the `backend/` directory.

## Bonus Features

- Real-time analytics updates after each submission
- Color-coded ratings (green for positive, yellow for neutral, red for negative)
- Email validation
- Input validation on both frontend and backend
- Responsive grid layout

## Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

**Backend:**
- Node.js + Express
- SQLite with better-sqlite3
- CORS support

## License

MIT
