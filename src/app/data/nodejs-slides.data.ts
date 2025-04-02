import { CourseSlides } from '../models/slide.model';

export const nodejsSlides: CourseSlides = {
  category: 'nodejs',
  slides: [
    {
      id: 1,
      topic: 'Introduction to Node.js',
      description: 'Understanding Node.js fundamentals and its ecosystem',
      content: [
        "What is Node.js?",
        "• JavaScript runtime built on Chrome's V8 engine",
        "• Enables server-side JavaScript execution",
        "• Single-threaded, event-driven architecture",
        "",
        "Key Features:",
        "• Non-blocking I/O operations",
        "• Fast execution speed",
        "• Rich ecosystem (npm)",
        "• Cross-platform compatibility"
      ],
      code: `// Simple Node.js server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
      language: 'javascript'
    },
    {
      id: 2,
      topic: 'Event-Driven Architecture',
      description: 'Understanding Node.js event loop and event emitters',
      content: [
        "Event Loop:",
        "• Core of Node.js architecture",
        "• Handles asynchronous operations",
        "• Single-threaded but non-blocking",
        "",
        "Event Emitters:",
        "• Built-in events module",
        "• Custom event handling",
        "• Observer pattern implementation"
      ],
      code: `// Custom Event Emitter
const EventEmitter = require('events');

class OrderSystem extends EventEmitter {
  placeOrder(order) {
    console.log('Processing order...');
    this.emit('orderPlaced', order);
  }
}

const orderSystem = new OrderSystem();

orderSystem.on('orderPlaced', (order) => {
  console.log('Order received:', order);
  // Process the order
});

orderSystem.placeOrder({ id: 1, item: 'Coffee' });`,
      language: 'javascript'
    },
    {
      id: 3,
      topic: 'Modules and NPM',
      description: 'Working with modules and package management',
      content: [
        "Module Systems:",
        "• CommonJS require/exports",
        "• ES Modules import/export",
        "• Module caching",
        "",
        "NPM Features:",
        "• Package management",
        "• Dependency resolution",
        "• Script running",
        "• Version control"
      ],
      code: `// CommonJS Module
// utils.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// ES Module
// math.js
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

// Using modules
// index.js
const utils = require('./utils');
import { multiply } from './math.js';

console.log(utils.add(5, 3));     // 8
console.log(multiply(4, 2));      // 8

// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}`,
      language: 'javascript'
    },
    {
      id: 4,
      topic: 'File System Operations',
      description: 'Working with files and directories using fs module',
      content: [
        "File System Module:",
        "• Reading files",
        "• Writing files",
        "• File streams",
        "• Directory operations",
        "",
        "Async vs Sync:",
        "• Non-blocking operations",
        "• Performance considerations",
        "• Error handling"
      ],
      code: `// File System Operations
const fs = require('fs').promises;

// Async file operations
async function processFile() {
  try {
    // Reading file
    const data = await fs.readFile('input.txt', 'utf8');
    
    // Processing data
    const processed = data.toUpperCase();
    
    // Writing to new file
    await fs.writeFile('output.txt', processed);
    
    console.log('File processing complete');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Working with streams
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('Stream processing complete');
});`,
      language: 'javascript'
    },
    {
      id: 5,
      topic: 'HTTP and Web Servers',
      description: 'Creating and managing web servers with Node.js',
      content: [
        "HTTP Module:",
        "• Creating servers",
        "• Handling requests",
        "• Managing responses",
        "• URL routing",
        "",
        "Server Features:",
        "• Request methods",
        "• Status codes",
        "• Headers",
        "• Static file serving"
      ],
      code: `// Basic HTTP Server
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  try {
    // Basic routing
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const html = await fs.readFile('index.html', 'utf8');
      return res.end(html);
    }

    // API endpoint
    if (req.url === '/api/users' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ users: ['John', 'Jane'] }));
    }

    // 404 handling
    res.writeHead(404);
    res.end('Not Found');
  } catch (error) {
    res.writeHead(500);
    res.end('Server Error');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
      language: 'javascript'
    },
    {
      id: 6,
      topic: 'Express.js Framework',
      description: 'Building web applications with Express.js',
      content: [
        "Express Basics:",
        "• Routing",
        "• Middleware",
        "• Request handling",
        "• Response methods",
        "",
        "Advanced Features:",
        "• Template engines",
        "• Static files",
        "• Error handling",
        "• Security middleware"
      ],
      code: `// Express Application Setup
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Custom middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Express');
});

// REST API endpoints
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});`,
      language: 'javascript'
    },
    {
      id: 7,
      topic: 'Database Integration',
      description: 'Working with MongoDB and MySQL in Node.js',
      content: [
        "MongoDB with Mongoose:",
        "• Schema definition",
        "• Model operations",
        "• Queries and updates",
        "",
        "MySQL with Sequelize:",
        "• Model definition",
        "• Relationships",
        "• CRUD operations",
        "• Migrations"
      ],
      code: `// Mongoose Example
const mongoose = require('mongoose');

// Schema definition
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number
});

const User = mongoose.model('User', userSchema);

// CRUD operations
async function userOperations() {
  // Create
  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com'
  });

  // Read
  const users = await User.find({ age: { $gt: 18 } });

  // Update
  await User.updateOne(
    { _id: user._id },
    { $set: { age: 25 } }
  );

  // Delete
  await User.deleteOne({ _id: user._id });
}

// Sequelize Example
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
});

async function init() {
  await sequelize.sync();
  // Create user
  const user = await User.create({
    name: 'Jane Doe',
    email: 'jane@example.com'
  });
}`,
      language: 'javascript'
    },
    {
      id: 8,
      topic: 'Authentication and Security',
      description: 'Implementing secure authentication and authorization',
      content: [
        "Authentication:",
        "• JWT implementation",
        "• Password hashing",
        "• Session management",
        "",
        "Security Best Practices:",
        "• Input validation",
        "• XSS prevention",
        "• CSRF protection",
        "• Rate limiting"
      ],
      code: `// Authentication Implementation
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Password hashing
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Login route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
      language: 'javascript'
    }
  ]
}; 