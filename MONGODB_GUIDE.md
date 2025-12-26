# NumClub - MongoDB & Mongoose Implementation

## Project Overview
NumClub is a club management platform with MongoDB database integration using Mongoose ORM.

## Database Structure

### Collections

#### 1. **Clubs Collection**
Stores club information and metadata.
- `cname`: Club full name
- `shortName`: Short display name (unique)
- `description`: Club description
- `directions`: Array of categories (it, science, sport, etc.)
- `school`: School code (its, bs, mtes, uts, khs, shus)
- `logo`: Path to club logo image
- `members`: Member count
- `status`: active/inactive/pending
- `createdBy`: Reference to User who created the club
- `socialLinks`: Social media links object

#### 2. **Users Collection**
Stores user accounts and profiles.
- `username`: Unique username
- `email`: Unique email address
- `password`: Hashed password
- `firstName`, `lastName`: User's name
- `studentId`: Student ID number
- `school`: School affiliation
- `avatar`: Profile picture path
- `bio`: User biography
- `interests`: Array of interest categories
- `joinedClubs`: Array of club memberships with roles
- `registeredEvents`: Array of event registrations
- `role`: student/club_admin/super_admin
- `isActive`: Account status

#### 3. **Events Collection**
Stores club events and activities.
- `title`: Event name
- `description`: Event details
- `club`: Reference to Club
- `eventType`: workshop/seminar/competition/social/volunteer/training
- `startDate`, `endDate`: Event schedule
- `location`: Event location string
- `venue`: Detailed venue information (building, room, address)
- `capacity`: Maximum attendees
- `registeredUsers`: Array of registered users with status
- `image`: Event image path
- `status`: upcoming/ongoing/completed/cancelled
- `requirements`: Array of requirements
- `tags`: Array of tags
- `createdBy`: Reference to User who created the event

## Setup Instructions

### 1. Install MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

### 2. Install Dependencies
```bash
npm install mongoose dotenv
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
MONGODB_URI=mongodb://localhost:27017/numclub
PORT=3000
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/numclub?retryWrites=true&w=majority
```

### 4. Seed the Database
Populate the database with initial data:
```bash
node scripts/seed.js
```

### 5. Start the Server
```bash
node server.js
```

## 📂 Project Structure
```
numclub/
├── config/
│   └── database.js         # MongoDB connection configuration
├── models/
│   ├── Club.js            # Club schema and model
│   ├── User.js            # User schema and model
│   ├── Event.js           # Event schema and model
│   └── index.js           # Export all models
├── controllers/
│   ├── clubController.js  # Club CRUD operations
│   ├── userController.js  # User CRUD operations
│   └── eventController.js # Event CRUD operations
├── scripts/
│   └── seed.js            # Database seeding script
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment variables template
├── server.js             # Main server file
└── package.json
```

## 🔌 API Endpoints

### Clubs
- `GET /api/clubs` - Get all active clubs
- `GET /api/clubs/:id` - Get club by ID
- `POST /api/clubs` - Create new club
- `PUT /api/clubs/:id` - Update club
- `DELETE /api/clubs/:id` - Soft delete club (set inactive)
- `GET /api/clubs/direction/:direction` - Filter by direction
- `GET /api/clubs/school/:school` - Filter by school

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Register new user
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:userId/join/:clubId` - Join a club
- `POST /api/users/:userId/leave/:clubId` - Leave a club

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/club/:clubId` - Get events by club
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `POST /api/events/:eventId/register/:userId` - Register for event
- `POST /api/events/:eventId/unregister/:userId` - Unregister from event

### Filters
- `GET /api/filters` - Get filter options (directions, schools)

## 📝 Mongoose Features Used

### Schemas & Validation
- Required fields with custom error messages
- Data type validation
- String length constraints (minlength, maxlength)
- Enum validation for predefined values
- Custom validators
- Unique constraints
- Default values

### Relationships
- **One-to-Many**: Club → Events, User → Events
- **Many-to-Many**: Users ↔ Clubs (through joinedClubs array)
- Population with `ref` for related documents

### Indexes
- Single field indexes for faster queries
- Compound indexes for complex queries
- Unique indexes for email and username

### Virtuals
- `fullName` for User (computed from firstName + lastName)
- `url` for Club (computed URL path)
- `availableSpots` for Event (capacity - registered users)
- `isFull` for Event (boolean check)

### Instance Methods
- `user.joinClub(clubId, role)` - Join a club
- `user.leaveClub(clubId)` - Leave a club
- `club.addMember()` - Increment member count
- `event.registerUser(userId)` - Register for event
- `event.unregisterUser(userId)` - Unregister from event

### Static Methods
- `Club.findByDirection(direction)` - Find clubs by direction
- `Club.findBySchool(school)` - Find clubs by school
- `Event.getUpcoming()` - Get upcoming events
- `Event.getByClub(clubId)` - Get events by club

### Middleware (Hooks)
- `pre('save')` - Update event status based on dates
- Timestamps: Automatic `createdAt` and `updatedAt` fields

## 🎯 Next Steps / Development Plan

### Phase 1: Core Functionality 
- [x] MongoDB connection setup
- [x] Mongoose models (Club, User, Event)
- [x] Database configuration
- [x] Seed script
- [x] Basic CRUD controllers

### Phase 2: API Development (TODO)
- [ ] Implement RESTful routing
- [ ] Add request body parsing (JSON)
- [ ] Implement authentication (JWT)
- [ ] Add password hashing (bcrypt)
- [ ] Add input validation middleware
- [ ] Error handling middleware

### Phase 3: Advanced Features (TODO)
- [ ] Search functionality
- [ ] Pagination
- [ ] Sorting and filtering
- [ ] Image upload handling
- [ ] Email notifications
- [ ] Activity logging

### Phase 4: Security (TODO)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Input sanitization
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection
- [ ] Helmet.js security headers

### Phase 5: Testing (TODO)
- [ ] Unit tests
- [ ] Integration tests
- [ ] API endpoint tests
- [ ] Load testing

## 🛠️ Recommended Improvements

### 1. Use Express.js
Replace Node's native `http` module with Express for better routing:
```bash
npm install express cors body-parser
```

### 2. Add Authentication
Implement JWT-based authentication:
```bash
npm install jsonwebtoken bcryptjs
```

### 3. Add Validation
Use validation libraries:
```bash
npm install express-validator
# or
npm install joi
```

### 4. Add Logging
Implement proper logging:
```bash
npm install winston morgan
```

### 5. Testing
Add testing framework:
```bash
npm install --save-dev jest supertest
```

## 📚 Useful Mongoose Commands

```javascript
// Find with population
const clubs = await Club.find().populate('createdBy');

// Find with multiple conditions
const events = await Event.find({
  startDate: { $gte: new Date() },
  status: 'upcoming'
});

// Update with $inc operator
await Club.findByIdAndUpdate(clubId, { $inc: { members: 1 } });

// Aggregate queries
const stats = await Club.aggregate([
  { $group: { _id: '$school', count: { $sum: 1 } } }
]);

// Transaction example
const session = await mongoose.startSession();
await session.withTransaction(async () => {
  await User.create([userData], { session });
  await Club.create([clubData], { session });
});
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart MongoDB
brew services restart mongodb-community
```

### Permission Issues
If you see `EACCES` errors:
```bash
# Fix npm permissions
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

## 📖 Resources
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
