// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true, // Allow null values
    trim: true
  },
  school: {
    type: String,
    enum: ['bs', 'its', 'mtes', 'uts', 'khs', 'shus'],
    required: [true, 'School is required']
  },
  avatar: {
    type: String,
    default: 'images/avatars/default.png'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  interests: {
    type: [String],
    enum: ['volunteer', 'sport', 'art', 'humanitarian', 'photo', 'science', 'it', 'language']
  },
  joinedClubs: [{
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    },
    role: {
      type: String,
      enum: ['member', 'admin', 'president'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  role: {
    type: String,
    enum: ['student', 'club_admin', 'super_admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Index for faster queries (email and username already indexed via unique:true)
userSchema.index({ school: 1 });

// Instance method to join a club
userSchema.methods.joinClub = function(clubId, role = 'member') {
  const alreadyJoined = this.joinedClubs.find(
    item => item.club.toString() === clubId.toString()
  );
  
  if (!alreadyJoined) {
    this.joinedClubs.push({ club: clubId, role });
    return this.save();
  }
  return this;
};

// Instance method to leave a club
userSchema.methods.leaveClub = function(clubId) {
  this.joinedClubs = this.joinedClubs.filter(
    item => item.club.toString() !== clubId.toString()
  );
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;
