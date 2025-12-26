// server.js
import { createServer } from 'node:http';
import { url } from 'node:inspector';
import connectDB from './config/database.js';
import { Club, User, Event } from './models/index.js';
import 'dotenv/config';

// Connect to MongoDB
await connectDB();

// Simple session storage (in-memory)
const sessions = new Map();

// Helper function to get user from request headers
function getUserFromRequest(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  
  // Format: "Bearer userId" or just "userId"
  const userId = authHeader.replace('Bearer ', '').trim();
  return userId || null;
}

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  res.setHeader("Access-Control-Allow-Credentials", "true");
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
    // POST /api/auth/login - User login
    else if (url === '/api/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;
      
      if (!email || !password) {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: 'Email and password are required' }));
        return;
      }
      
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || user.password !== password) {
        res.writeHead(401);
        res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
        return;
      }
      
      // Return user without password
      const userObj = user.toObject();
      delete userObj.password;
      
      // Store in session
      sessions.set(user._id.toString(), userObj);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, user: userObj, userId: user._id.toString() }));
    }
    // GET /api/auth/check-admin - Check if user is admin
    else if (url.startsWith('/api/auth/check-admin') && method === 'GET') {
      const urlObj = new URL(url, `http://${req.headers.host}`);
      const userId = urlObj.searchParams.get('userId');
      
      if (!userId) {
        res.writeHead(401);
        res.end(JSON.stringify({ success: false, isAdmin: false }));
        return;
      }
      
      const user = await User.findById(userId);
      const isAdmin = user && (user.role === 'super_admin' || user.role === 'club_admin');
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, isAdmin }));
    }
    // POST /api/clubs - Create new club (Admin only)
    else if (url === '/api/clubs' && method === 'POST') {
      const userId = getUserFromRequest(req);
      
      if (!userId) {
        res.writeHead(401);
        res.end(JSON.stringify({ success: false, error: 'Authentication required' }));
        return;
      }
      
      const user = await User.findById(userId);
      if (!user || (user.role !== 'super_admin' && user.role !== 'club_admin')) {
        res.writeHead(403);
        res.end(JSON.stringify({ success: false, error: 'Only admins can create clubs' }));
        return;
      }
      
      const body = await parseBody(req);
      body.createdBy = userId;
      
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
    // GET /api/clubs - Get all clubs with pagination and filters
    else if (url.startsWith('/api/clubs') && url.indexOf('/api/clubs/') === -1 && method === 'GET') {
      const urlObj = new URL(url, `http://${req.headers.host}`);
      const params = urlObj.searchParams;
      
      // Pagination parameters
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 10;
      const skip = (page - 1) * limit;
      
      // Search and filter parameters
      const search = params.get('search') || '';
      const direction = params.get('direction') || '';
      const school = params.get('school') || '';
      
      // Build query
      const query = { status: 'active' };
      
      if (search) {
        query.$or = [
          { cname: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (direction) {
        // directions is an array field, so we check if it contains the value
        query.directions = direction;
      }
      
      if (school) {
        query.school = school;
      }
      
      // Get total count for pagination
      const totalClubs = await Club.countDocuments(query);
      const totalPages = Math.ceil(totalClubs / limit);
      
      // Get paginated clubs
      const clubsFromDB = await Club.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'username email')
        .lean();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true, 
        count: clubsFromDB.length,
        total: totalClubs,
        page,
        totalPages,
        clubs: clubsFromDB 
      }));
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
