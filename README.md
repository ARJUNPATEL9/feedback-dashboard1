# Feedback Management Dashboard

A full-stack application for collecting, managing, and analyzing customer feedback with real-time analytics.

## Features

- **Feedback Form**: Submit feedback with name, email, message, and 1-5 rating
- **Real-time Analytics**: View total feedbacks, average rating, positive/negative split
- **Feedback Table**: View all submitted feedbacks with sorting and filtering
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **RESTful API**: Clean Express.js backend with SQLite database

## Project Structure

\`\`\`
.
├── api/
│   └── feedback.js          # Express API server
├── app/
│   ├── page.tsx             # Main dashboard page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── feedback-form.tsx    # Feedback submission form
│   ├── analytics-cards.tsx  # Analytics statistics cards
│   ├── feedback-table.tsx   # Feedback data table
│   └── ui/                  # Shadcn UI components
├── scripts/
│   └── init-db.sql          # Database initialization script
├── package.json             # Frontend dependencies
├── package.json.backend     # Backend dependencies
└── README.md
\`\`\`

## Getting Started

### Backend Setup

1. Copy `package.json.backend` to root as backup reference
2. Install dependencies:
   \`\`\`bash
   npm install express cors better-sqlite3
   \`\`\`

3. Start the API server:
   \`\`\`bash
   node api/feedback.js
   \`\`\`

The API will run on `http://localhost:5000`

### Frontend Setup

1. Frontend runs in the v0 Preview environment
2. Set environment variable in project settings:
   - `NEXT_PUBLIC_API_URL=http://localhost:5000` (for local development)
   - `NEXT_PUBLIC_API_URL=https://your-api-url.com` (for production)

## API Endpoints

### POST /api/feedback
Submit new feedback

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great product!",
  "rating": 5
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great product!",
  "rating": 5,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
\`\`\`

### GET /api/feedback
Fetch all feedbacks (sorted by newest first)

**Response:**
\`\`\`json
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
\`\`\`

### GET /api/stats
Get analytics data

**Response:**
\`\`\`json
{
  "total": 10,
  "avgRating": 4.2,
  "positive": 7,
  "negative": 2
}
\`\`\`

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`
4. Deploy

### Backend (Render/Railway/Cyclic)
1. Deploy `api/feedback.js` as a Node.js service
2. The SQLite database will be created automatically on first run
3. Persist the database file using volume mounting

## Database

SQLite database with single `feedbacks` table:
- `id`: Auto-incrementing primary key
- `name`: User name (required)
- `email`: User email (required)
- `message`: Feedback message (required)
- `rating`: 1-5 rating (required)
- `createdAt`: Timestamp (auto-set)

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
