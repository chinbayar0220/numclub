// models/Club.js
import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true,
    maxlength: [100, 'Club name cannot exceed 100 characters']
  },
  shortName: {
    type: String,
    required: [true, 'Short name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Short name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  directions: {
    type: [String],
    enum: ['volunteer', 'sport', 'art', 'humanitarian', 'photo', 'science', 'it', 'language'],
    required: [true, 'At least one direction is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Club must have at least one direction'
    }
  },
  school: {
    type: String,
    enum: ['bs', 'its', 'mtes', 'uts', 'khs', 'shus'],
    required: [false, 'School is not required']
  },
  logo: {
    type: String,
    default: 'images/clubs/default.png'
  },
  members: {
    type: Number,
    default: 0,
    min: [0, 'Members count cannot be negative']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    website: String
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for club URL
clubSchema.virtual('url').get(function() {
  return `/club/${this._id}`;
});

// Index for faster queries (shortName already indexed via unique:true)
clubSchema.index({ school: 1 });
clubSchema.index({ directions: 1 });

// Static method to get clubs by direction
clubSchema.statics.findByDirection = function(direction) {
  return this.find({ directions: direction, status: 'active' });
};

// Static method to get clubs by school
clubSchema.statics.findBySchool = function(school) {
  return this.find({ school, status: 'active' });
};

// Instance method to increment members
clubSchema.methods.addMember = function() {
  this.members += 1;
  return this.save();
};

const Club = mongoose.model('Club', clubSchema);

export default Club;
