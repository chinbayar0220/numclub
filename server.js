// server.js
import { createServer } from 'node:http';
import { url } from 'node:inspector';
import connectDB from './config/database.js';
import { Club, User, Event } from './models/index.js';
import 'dotenv/config';

// Connect to MongoDB
await connectDB();

// Helper function to parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  
  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  try {
    const url = req.url;
    const method = req.method;
    
    // Log request for debugging
    console.log(`${method} ${url}`);

    // GET /api/filters - Get filter options
    if (url === '/api/filters' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        filters: {
          directions: [
            { id: "volunteer", label: "Сайн дурын" },
            { id: "sport", label: "Спорт" },
            { id: "art", label: "Урлаг" },
            { id: "humanitarian", label: "Чөлөөт" },
            { id: "photo", label: "Фото зураг" },
            { id: "science", label: "Шинжлэх ухаан" },
            { id: "it", label: "Мэдээллийн технологи" },
            { id: "language", label: "Хэл судлал" }
          ],
          schools: [
            { "id": "bs", "label": "БС" },
            { "id": "its", "label": "ИТС" },
            { "id": "mtes", "label": "МТЭС" },
            { "id": "uts", "label": "УТСОХУС" },
            { "id": "khs", "label": "ХЗС" },
            { "id": "shus", "label": "ШУС" }
          ]
        }
      }));
    } 
    // POST /api/clubs - Create new club
    else if (url === '/api/clubs' && method === 'POST') {
      const body = await parseBody(req);
      const club = await Club.create(body);
      res.writeHead(201);
      res.end(JSON.stringify({ success: true, data: club }));
    }
    // GET /api/clubs/:id - Get club by ID
    else if (url.startsWith('/api/clubs/') && url !== '/api/clubs' && method === 'GET') {
      const id = url.split('/')[3];
      if (!id) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: 'Invalid club ID' }));
        return;
      }
      
      const club = await Club.findById(id).populate('createdBy', 'username email');
      
      if (!club) {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, error: 'Club not found' }));
        return;
      }
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: club }));
    }
    // GET /api/clubs - Get all clubs
    else if (url === '/api/clubs' && method === 'GET') {
      const clubsFromDB = await Club.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: clubsFromDB.length, clubs: clubsFromDB }));
    }
    // 404 - Route not found
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: `Route not found: ${method} ${url}` }));
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

// starts a simple http server locally on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});

// run with `node server.js`
