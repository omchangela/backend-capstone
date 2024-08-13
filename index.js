const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection
async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (err) {
    console.error(err);
  }
}

// Middleware to connect to DB
app.use(async (req, res, next) => {
  const client = await connectDB();
  req.dbClient = client;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World form om patel!');
});
app.get('/health', (req, res) => {
  res.send('This is health api forserver checking');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});