# 🚀 Quick Start Guide - NumClub MongoDB Setup

## What's Been Set Up

Your NumClub project now has complete MongoDB/Mongoose integration with:
- MongoDB connection configuration
- 3 Mongoose models (Club, User, Event)
- CRUD controllers for all models
- Database seeding script
- Environment variables setup
- Updated server with MongoDB integration

## 📋 Step-by-Step Instructions

### 1️⃣ Install & Start MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (if not installed)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env` file with your connection string

### 2️⃣ Configure Environment
Your `.env` file is already created with:
```env
MONGODB_URI=mongodb://localhost:27017/numclub
PORT=3000
NODE_ENV=development
```

### 3️⃣ Seed the Database
Run the seed script to populate initial data:
```bash
npm run seed
```

This will create:
- 8 sample clubs
- 3 sample users
- 2 sample events

### 4️⃣ Start the Server
```bash
npm start
```

You should see:
```
MongoDB connected successfully
Database: numclub
Server listening on http://127.0.0.1:3000
```

### 5️⃣ Test the API
Open your browser or use curl:

```bash
# Get all clubs
curl http://127.0.0.1:3000/api/clubs

# Get filters
curl http://127.0.0.1:3000/api/filters
```

## 📂 Files Created/Modified

### New Files:
- `config/database.js` - MongoDB connection
- `models/Club.js` - Club schema
- `models/User.js` - User schema  
- `models/Event.js` - Event schema
- `models/index.js` - Model exports
- `controllers/clubController.js` - Club operations
- `controllers/userController.js` - User operations
- `controllers/eventController.js` - Event operations
- `scripts/seed.js` - Database seeding
- `.env` - Environment variables
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules
- `MONGODB_GUIDE.md` - Complete documentation

### Modified Files:
- `server.js` - Added MongoDB integration
- `package.json` - Added scripts and dependencies

## 🎯 Available NPM Scripts

```bash
npm start        # Start the server
npm run dev      # Start with auto-reload (Node 18+)
npm run seed     # Seed the database
```

## 📊 Database Collections

### Clubs Collection
- Club information and metadata
- Fields: name, description, directions, school, logo, members
- Methods: `findByDirection()`, `findBySchool()`, `addMember()`

### Users Collection
- User accounts and profiles
- Fields: username, email, password, school, clubs, events
- Methods: `joinClub()`, `leaveClub()`

### Events Collection
- Club events and activities
- Fields: title, description, club, dates, location, capacity
- Methods: `registerUser()`, `unregisterUser()`, `getUpcoming()`

## 🔌 API Endpoints Summary

### Current Working Endpoints:
- `GET /api/clubs` - Get all clubs from MongoDB
- `GET /api/filters` - Get filter options
- `GET /api/clubs/seed` - Seed clubs data (for testing)

### Ready to Implement (controllers created):
- Club: GET, POST, PUT, DELETE, filter by direction/school
- User: GET, POST, PUT, join/leave club
- Event: GET, POST, PUT, register/unregister

## 🛠️ Recommended Next Steps

### Immediate:
1. **Test MongoDB connection** - Run `npm start` and check for connection
2. **Seed the database** - Run `npm run seed`
3. **Test API** - Try fetching clubs from browser

### Short Term:
1. **Add Express.js** for better routing
2. **Implement authentication** with JWT
3. **Add request validation**
4. **Implement remaining API endpoints**

### Long Term:
1. **Add frontend integration**
2. **Implement search functionality**
3. **Add pagination**
4. **Set up testing**
5. **Deploy to production**

## 📖 Documentation

For complete documentation, see:
- **MONGODB_GUIDE.md** - Full MongoDB/Mongoose implementation guide
- **README.md** - Project overview
- Inline code comments in all files

## ❓ Troubleshooting

### MongoDB not starting?
```bash
# Check MongoDB status
brew services list

# Restart MongoDB
brew services restart mongodb-community

# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Connection errors?
- Make sure MongoDB is running
- Check your `.env` MONGODB_URI is correct
- For Atlas, ensure IP whitelist is configured

### npm permission errors?
```bash
sudo chown -R $USER ~/.npm
```

## 💡 Tips

1. **Use MongoDB Compass** - Download MongoDB Compass for a GUI to view your data
2. **Check the docs** - Read MONGODB_GUIDE.md for detailed info
3. **Test with seed data** - Use `npm run seed` to reset your database
4. **Use Postman** - Test API endpoints with Postman or similar tool

## 🎉 You're Ready!

Your MongoDB setup is complete! Run `npm run seed` then `npm start` to begin using your database-backed NumClub application.

Need help? Check MONGODB_GUIDE.md for comprehensive documentation.
