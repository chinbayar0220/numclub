# 📊 NumClub Database Schema & Mongoose ORM Plan

## Database Schema Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE: numclub                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       CLUBS          │
├──────────────────────┤
│ _id: ObjectId        │◄──────┐
│ cname: String        │       │
│ shortName: String*   │       │  Many-to-One
│ description: String  │       │
│ directions: [String] │       │
│ school: String       │       │
│ logo: String         │       │
│ members: Number      │       │
│ status: String       │       │
│ createdBy: ObjectId  │───┐   │
│ socialLinks: Object  │   │   │
│ createdAt: Date      │   │   │
│ updatedAt: Date      │   │   │
└──────────────────────┘   │   │
         ▲                 │   │
         │                 │   │
         │ One-to-Many     │   │
         │                 │   │
         │                 │   │
┌────────┴─────────────┐   │   │
│       EVENTS         │   │   │
├──────────────────────┤   │   │
│ _id: ObjectId        │   │   │
│ title: String        │   │   │
│ description: String  │   │   │
│ club: ObjectId       │───┘   │
│ eventType: String    │       │
│ startDate: Date      │       │
│ endDate: Date        │       │
│ location: String     │       │
│ venue: Object        │       │
│ capacity: Number     │       │
│ registeredUsers: [{  │       │
│   user: ObjectId ────┼───┐   │
│   registeredAt: Date │   │   │
│   status: String     │   │   │
│ }]                   │   │   │
│ image: String        │   │   │
│ status: String       │   │   │
│ requirements: [Str]  │   │   │
│ tags: [String]       │   │   │
│ createdBy: ObjectId  │───┼───┘
│ createdAt: Date      │   │
│ updatedAt: Date      │   │
└──────────────────────┘   │
                           │
         ┌─────────────────┘
         │
         │ Many-to-One
         │
         ▼
┌──────────────────────┐
│       USERS          │
├──────────────────────┤
│ _id: ObjectId        │
│ username: String*    │
│ email: String*       │
│ password: String     │
│ firstName: String    │
│ lastName: String     │
│ studentId: String*   │
│ school: String       │
│ avatar: String       │
│ bio: String          │
│ interests: [String]  │
│ joinedClubs: [{      │
│   club: ObjectId ────┼───► (Many-to-Many via embedded)
│   role: String       │
│   joinedAt: Date     │
│ }]                   │
│ registeredEvents: [  │
│   ObjectId           │───► (Many-to-Many via reference)
│ ]                    │
│ role: String         │
│ isActive: Boolean    │
│ createdAt: Date      │
│ updatedAt: Date      │
└──────────────────────┘

* = Unique Index
```

## Relationships Explained

### 1️ User → Clubs (Many-to-Many)
- A user can join multiple clubs
- A club can have multiple members
- Stored as embedded documents in `User.joinedClubs`
- Each membership includes role (member/admin/president) and joinDate

### 2️ User → Events (Many-to-Many)
- A user can register for multiple events
- An event can have multiple registered users
- Stored in two places:
  - `User.registeredEvents[]` - array of event IDs
  - `Event.registeredUsers[]` - array of user objects with metadata

### 3️ Club → Events (One-to-Many)
- A club can have multiple events
- Each event belongs to one club
- Stored as reference: `Event.club` → `Club._id`

### 4️ User → Clubs/Events (Created By)
- Users can create clubs and events
- Stored as reference: `createdBy` → `User._id`

## Mongoose Schema Features

### Validation Rules

#### Club Model
```javascript
cname: required, max 100 chars
shortName: required, unique, max 50 chars
description: required, max 1000 chars
directions: required, at least 1, enum values
school: required, enum values
members: min 0
status: enum [active, inactive, pending]
```

#### User Model
```javascript
username: required, unique, 3-30 chars
email: required, unique, valid email format
password: required, min 6 chars, not returned by default
firstName/lastName: required, max 50 chars
studentId: unique, optional
school: required, enum values
bio: max 500 chars
interests: enum values
role: enum [student, club_admin, super_admin]
```

#### Event Model
```javascript
title: required, max 200 chars
description: required, max 2000 chars
club: required, reference to Club
eventType: required, enum values
startDate/endDate: required, endDate >= startDate
location: required
capacity: required, min 1
status: enum [upcoming, ongoing, completed, cancelled]
```

### Indexes for Performance

```javascript
// Club
- shortName: 1 (unique)
- school: 1
- directions: 1

// User  
- email: 1 (unique)
- username: 1 (unique)
- school: 1

// Event
- club: 1
- startDate: 1
- status: 1
- eventType: 1
```

###  Virtual Properties

```javascript
// User
fullName = firstName + lastName

// Club
url = `/club/${_id}`

// Event
availableSpots = capacity - registeredUsers.length
isFull = registeredUsers.length >= capacity
```

### Instance Methods

```javascript
// User
user.joinClub(clubId, role)
user.leaveClub(clubId)

// Club
club.addMember()

// Event
event.registerUser(userId)
event.unregisterUser(userId)
```

### Static Methods

```javascript
// Club
Club.findByDirection(direction)
Club.findBySchool(school)

// Event
Event.getUpcoming()
Event.getByClub(clubId)
```

### Middleware (Hooks)

```javascript
// Event - pre save
// Automatically update status based on dates
if (startDate > now) status = 'upcoming'
if (endDate < now) status = 'completed'
if (startDate <= now <= endDate) status = 'ongoing'

// User - pre save (TODO)
// Hash password before saving

// All Models
// Automatic timestamps: createdAt, updatedAt
```

## Implementation Phases

### Phase 1: Foundation (COMPLETED)
- [x] MongoDB connection setup
- [x] All 3 models created with full validation
- [x] Indexes defined
- [x] Virtuals, methods, statics implemented
- [x] Middleware hooks
- [x] Database configuration
- [x] Environment setup

### Phase 2: Data Layer (COMPLETED)
- [x] CRUD controllers for all models
- [x] Database seeding script
- [x] Basic server integration
- [x] Sample data creation

### Phase 3: API Layer (TODO)
- [ ] RESTful routing implementation
- [ ] Request body parsing
- [ ] Response formatting
- [ ] Error handling
- [ ] Query parameter parsing
- [ ] Filtering, sorting, pagination

### Phase 4: Authentication (TODO)
- [ ] Password hashing (bcrypt)
- [ ] JWT token generation
- [ ] Login/logout endpoints
- [ ] Auth middleware
- [ ] Role-based access control
- [ ] Session management

### Phase 5: Advanced Features (TODO)
- [ ] Search functionality (text search)
- [ ] Advanced filtering
- [ ] Image upload handling
- [ ] Email notifications
- [ ] Activity logs
- [ ] Analytics/statistics

### Phase 6: Testing (TODO)
- [ ] Unit tests for models
- [ ] Integration tests for controllers
- [ ] API endpoint tests
- [ ] Load testing
- [ ] Security testing

## Best Practices Applied

### Schema Design
- Denormalization for performance (embedded joinedClubs)
- References for large collections (club → events)
- Appropriate indexes for query patterns
- Virtuals for computed fields

### Validation
- Server-side validation in schemas
- Custom validators for complex rules
- Enum constraints for predefined values
- Type coercion and sanitization

### Error Handling
- Try-catch blocks in all controllers
- Meaningful error messages
- HTTP status codes
- Validation error handling

### Security
- Password field not returned by default (select: false)
- Input validation
- Unique constraints on sensitive fields
- Role-based access control structure

### Performance
- Appropriate indexes
- Lean queries where possible
- Pagination ready
- Connection pooling via Mongoose

## Query Examples

### Basic Queries
```javascript
// Find all active clubs
const clubs = await Club.find({ status: 'active' });

// Find club by short name
const club = await Club.findOne({ shortName: 'GDSC' });

// Find clubs by school with population
const clubs = await Club.find({ school: 'its' })
  .populate('createdBy', 'username email');
```

### Advanced Queries
```javascript
// Find upcoming events with capacity
const events = await Event.find({
  startDate: { $gte: new Date() },
  status: 'upcoming',
  'registeredUsers.50': { $exists: false } // Less than 50 registered
}).populate('club', 'shortName logo');

// Find users by interests
const users = await User.find({
  interests: { $in: ['it', 'science'] },
  isActive: true
}).select('-password');

// Aggregate - Count clubs by school
const stats = await Club.aggregate([
  { $match: { status: 'active' } },
  { $group: { 
    _id: '$school', 
    count: { $sum: 1 },
    totalMembers: { $sum: '$members' }
  }}
]);
```

### Complex Operations
```javascript
// Register user for event (with transaction)
const session = await mongoose.startSession();
await session.withTransaction(async () => {
  const event = await Event.findById(eventId).session(session);
  await event.registerUser(userId);
  
  const user = await User.findById(userId).session(session);
  user.registeredEvents.push(eventId);
  await user.save();
});

// Get user's feed (clubs and events)
const user = await User.findById(userId)
  .populate({
    path: 'joinedClubs.club',
    populate: {
      path: 'createdBy',
      select: 'username'
    }
  })
  .populate({
    path: 'registeredEvents',
    populate: {
      path: 'club',
      select: 'shortName logo'
    }
  });
```

## Common Operations Cheatsheet

```javascript
// CREATE
const club = await Club.create({ cname, shortName, ... });

// READ
const club = await Club.findById(id);
const clubs = await Club.find({ status: 'active' });

// UPDATE
const club = await Club.findByIdAndUpdate(
  id, 
  { members: 100 }, 
  { new: true, runValidators: true }
);

// DELETE (soft)
await Club.findByIdAndUpdate(id, { status: 'inactive' });

// DELETE (hard)
await Club.findByIdAndDelete(id);

// COUNT
const count = await Club.countDocuments({ status: 'active' });

// EXISTS
const exists = await Club.exists({ shortName: 'GDSC' });
```

This plan provides a complete roadmap for your MongoDB/Mongoose implementation! 🚀
