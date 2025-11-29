# 🚀 Backend Setup Guide

Complete backend for your Long-Distance Relationship website with Node.js, Express, and MongoDB.

## 📋 Backend Features

- **POST /api/memory** - Upload memories with photos, title, description, date
- **GET /api/memories** - List all memories
- **GET /api/memories/:id** - View single memory
- **DELETE /api/memories/:id** - Delete a memory
- **POST /api/letters** - Upload "open when" letters
- **GET /api/letters** - List all letters
- **GET /api/countdown** - Get remaining days until next meetup
- **POST /api/countdown** - Update next meeting date
- **GET /api/timezones** - Get current time in two cities
- **POST /api/voice-notes** - Upload voice notes
- **GET /api/voice-notes** - List all voice notes

## 🛠️ Installation Steps

### 1. Install Node.js
Download from: https://nodejs.org/ (LTS version recommended)

### 2. Install MongoDB
- **Option A**: Local MongoDB
  - Download from: https://www.mongodb.com/try/download/community
  
- **Option B**: MongoDB Atlas (Cloud - Recommended)
  - Sign up at: https://www.mongodb.com/cloud/atlas
  - Create free cluster
  - Get connection string

### 3. Create Backend Folder
```powershell
cd "c:\Users\amwz1\Documents\system web dev\birthday-journey"
mkdir backend
cd backend
```

### 4. Initialize Node Project
```powershell
npm init -y
```

### 5. Install Dependencies
```powershell
npm install express mongoose multer cors dotenv
```

## 📁 Backend File Structure

```
backend/
├── server.js           # Main server file
├── .env               # Environment variables
├── package.json       # Dependencies
├── models/
│   ├── Memory.js      # Memory schema
│   ├── Letter.js      # Letter schema
│   └── VoiceNote.js   # Voice note schema
├── routes/
│   ├── memories.js    # Memory routes
│   ├── letters.js     # Letter routes
│   ├── countdown.js   # Countdown routes
│   └── voiceNotes.js  # Voice note routes
└── uploads/           # Uploaded files
    ├── photos/
    └── audio/
```

## 🔧 Backend Code

### Create `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ldr-website
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ldr-website
```

### Create `backend/server.js`
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/memories', require('./routes/memories'));
app.use('/api/letters', require('./routes/letters'));
app.use('/api/countdown', require('./routes/countdown'));
app.use('/api/voice-notes', require('./routes/voiceNotes'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

### Create `backend/models/Memory.js`
```javascript
const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    photo: { type: String, required: true },
    category: { type: String, enum: ['video-call', 'voice-note', 'chat', 'together', 'surprise'], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Memory', MemorySchema);
```

### Create `backend/models/Letter.js`
```javascript
const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Letter', LetterSchema);
```

### Create `backend/models/VoiceNote.js`
```javascript
const mongoose = require('mongoose');

const VoiceNoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    audioFile: { type: String, required: true },
    duration: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VoiceNote', VoiceNoteSchema);
```

### Create `backend/routes/memories.js`
```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Memory = require('../models/Memory');

// Multer config for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/photos/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET all memories
router.get('/', async (req, res) => {
    try {
        const memories = await Memory.find().sort({ date: -1 });
        res.json(memories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single memory
router.get('/:id', async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) return res.status(404).json({ error: 'Memory not found' });
        res.json(memory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new memory with photo
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        const photo = req.file ? req.file.path : '';
        
        const memory = new Memory({ title, description, date, photo, category });
        await memory.save();
        res.status(201).json(memory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE memory
router.delete('/:id', async (req, res) => {
    try {
        await Memory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Memory deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

### Create `backend/routes/letters.js`
```javascript
const express = require('express');
const router = express.Router();
const Letter = require('../models/Letter');

// GET all letters
router.get('/', async (req, res) => {
    try {
        const letters = await Letter.find();
        res.json(letters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new letter
router.post('/', async (req, res) => {
    try {
        const { type, title, content } = req.body;
        const letter = new Letter({ type, title, content });
        await letter.save();
        res.status(201).json(letter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

### Create `backend/routes/countdown.js`
```javascript
const express = require('express');
const router = express.Router();

let nextMeetDate = new Date('2025-12-31T00:00:00');

// GET countdown
router.get('/', (req, res) => {
    const now = new Date();
    const difference = nextMeetDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        res.json({ days, hours, minutes, nextMeetDate });
    } else {
        res.json({ days: 0, hours: 0, minutes: 0, message: "We're together!" });
    }
});

// POST update next meet date
router.post('/', (req, res) => {
    const { date } = req.body;
    nextMeetDate = new Date(date);
    res.json({ message: 'Next meet date updated', nextMeetDate });
});

module.exports = router;
```

### Create `backend/routes/voiceNotes.js`
```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const VoiceNote = require('../models/VoiceNote');

// Multer config for audio uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/audio/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB max

// GET all voice notes
router.get('/', async (req, res) => {
    try {
        const notes = await VoiceNote.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new voice note
router.post('/', upload.single('audio'), async (req, res) => {
    try {
        const { title, duration } = req.body;
        const audioFile = req.file ? req.file.path : '';
        
        const note = new VoiceNote({ title, audioFile, duration });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

### Create Upload Directories
```powershell
mkdir uploads
mkdir uploads\photos
mkdir uploads\audio
```

## 🚀 Running the Backend

### Start MongoDB (if local)
```powershell
mongod
```

### Start Backend Server
```powershell
cd backend
node server.js
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

## 🔗 Connecting Frontend to Backend

### Update `script.js` to fetch from API

Add this at the top of `script.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Example: Load Memories from Backend
```javascript
async function loadMemories() {
    try {
        const response = await fetch(`${API_URL}/memories`);
        const memories = await response.json();
        
        // Display memories in your UI
        memories.forEach(memory => {
            // Create memory cards dynamically
            console.log(memory);
        });
    } catch (err) {
        console.error('Error loading memories:', err);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMemories();
    // ... rest of your initialization
});
```

### Example: Upload New Memory
```javascript
async function uploadMemory(formData) {
    try {
        const response = await fetch(`${API_URL}/memories`, {
            method: 'POST',
            body: formData  // FormData with photo + details
        });
        const result = await response.json();
        console.log('Memory uploaded:', result);
    } catch (err) {
        console.error('Error uploading memory:', err);
    }
}
```

### Example: Load Countdown from Backend
```javascript
async function loadCountdownFromBackend() {
    try {
        const response = await fetch(`${API_URL}/countdown`);
        const data = await response.json();
        
        document.getElementById('countdown').innerHTML = 
            `${data.days} days : ${data.hours} hrs : ${data.minutes} min`;
    } catch (err) {
        console.error('Error loading countdown:', err);
    }
}
```

## 📱 Testing API Endpoints

### Using PowerShell
```powershell
# Get all memories
Invoke-RestMethod -Uri "http://localhost:5000/api/memories" -Method Get

# Get countdown
Invoke-RestMethod -Uri "http://localhost:5000/api/countdown" -Method Get

# Post new letter
$body = @{
    type = "miss-me"
    title = "Missing You"
    content = "I miss you so much..."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/letters" -Method Post -Body $body -ContentType "application/json"
```

## 🔐 Security Enhancements (Optional)

### Add Authentication
```powershell
npm install bcryptjs jsonwebtoken
```

### Add Rate Limiting
```powershell
npm install express-rate-limit
```

### Add Input Validation
```powershell
npm install express-validator
```

## 🌐 Deployment Options

### Option 1: Heroku (Free)
1. Create Heroku account
2. Install Heroku CLI
3. Deploy:
```powershell
heroku create your-ldr-website
git push heroku main
```

### Option 2: Railway (Free)
1. Sign up at railway.app
2. Connect GitHub repo
3. Auto-deploys on push

### Option 3: Render (Free)
1. Sign up at render.com
2. Create new Web Service
3. Connect repo

## 📊 Database Management

### View MongoDB Data
```powershell
# Open MongoDB shell
mongo

# Use database
use ldr-website

# View memories
db.memories.find()

# Count documents
db.memories.countDocuments()
```

## 🐛 Troubleshooting

**MongoDB connection failed?**
- Check if MongoDB is running: `mongod`
- Verify connection string in `.env`

**Port already in use?**
- Change PORT in `.env` to 5001, 5002, etc.

**CORS errors?**
- Backend allows all origins by default
- For production, specify your domain in cors config

**File uploads failing?**
- Check if `uploads/` folders exist
- Verify file size limits in multer config

---

## 🎉 You're Done!

Your LDR website now has:
✅ Photo uploads
✅ Memory storage
✅ Voice note uploads  
✅ Dynamic countdown
✅ Letter management
✅ RESTful API

**Next Steps:**
1. Start both frontend (open index.html) and backend (node server.js)
2. Test API endpoints
3. Connect frontend to backend
4. Deploy to production!

💝 Happy coding! 🌍❤️
