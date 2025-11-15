import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use persistent disk path on Render, or project root locally
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../feedback.db');
const db = new Database(dbPath);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_feedbacks_rating ON feedbacks(rating);
  CREATE INDEX IF NOT EXISTS idx_feedbacks_createdAt ON feedbacks(createdAt);
`);

// POST /api/feedback - Add new feedback
app.post('/api/feedback', (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const stmt = db.prepare(`
      INSERT INTO feedbacks (name, email, message, rating, createdAt)
      VALUES (?, ?, ?, ?, datetime('now'))
    `);

    const info = stmt.run(name.trim(), email.trim(), message.trim(), rating);

    res.status(201).json({
      id: info.lastInsertRowid,
      name,
      email,
      message,
      rating,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

// GET /api/feedback - Fetch all feedbacks
app.get('/api/feedback', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, name, email, message, rating, createdAt
      FROM feedbacks
      ORDER BY createdAt DESC
    `);

    const feedbacks = stmt.all();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// GET /api/stats - Get analytics data
app.get('/api/stats', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT
        COUNT(*) as total,
        AVG(rating) as avgRating,
        SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) as negative
      FROM feedbacks
    `);

    const stats = stmt.get();
    res.json({
      total: stats.total || 0,
      avgRating: stats.avgRating ? parseFloat(stats.avgRating.toFixed(2)) : 0,
      positive: stats.positive || 0,
      negative: stats.negative || 0,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
