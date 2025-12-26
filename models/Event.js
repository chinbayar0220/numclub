// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Club is required']
  },
  eventType: {
    type: String,
    enum: ['workshop', 'seminar', 'competition', 'social', 'volunteer', 'training', 'other'],
    required: [true, 'Event type is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(v) {
        return v >= this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  venue: {
    building: String,
    room: String,
    address: String
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  registeredUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    }
  }],
  image: {
    type: String,
    default: 'images/events/default.png'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  requirements: [String],
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.registeredUsers.length;
});

// Virtual to check if event is full
eventSchema.virtual('isFull').get(function() {
  return this.registeredUsers.length >= this.capacity;
});

// Index for faster queries
eventSchema.index({ club: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ eventType: 1 });

// Static method to get upcoming events
eventSchema.statics.getUpcoming = function() {
  return this.find({
    startDate: { $gte: new Date() },
    status: 'upcoming'
  }).sort({ startDate: 1 });
};

// Static method to get events by club
eventSchema.statics.getByClub = function(clubId) {
  return this.find({ club: clubId }).sort({ startDate: -1 });
};

// Instance method to register user
eventSchema.methods.registerUser = function(userId) {
  if (this.isFull) {
    throw new Error('Event is full');
  }
  
  const alreadyRegistered = this.registeredUsers.find(
    item => item.user.toString() === userId.toString()
  );
  
  if (alreadyRegistered) {
    throw new Error('User already registered');
  }
  
  this.registeredUsers.push({ user: userId });
  return this.save();
};

// Instance method to unregister user
eventSchema.methods.unregisterUser = function(userId) {
  this.registeredUsers = this.registeredUsers.filter(
    item => item.user.toString() !== userId.toString()
  );
  return this.save();
};

// Middleware to update status based on dates
eventSchema.pre('save', function(next) {
  const now = new Date();
  
  if (this.startDate > now) {
    this.status = 'upcoming';
  } else if (this.endDate < now) {
    this.status = 'completed';
  } else if (this.startDate <= now && this.endDate >= now) {
    this.status = 'ongoing';
  }
  
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
