// controllers/userController.js
import { User } from '../models/index.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password')
      .populate('joinedClubs.club', 'shortName logo')
      .sort({ createdAt: -1 });
      
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: users.length, data: users }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Get user by ID
export const getUserById = async (req, res, id) => {
  try {
    const user = await User.findById(id)
      .select('-password')
      .populate('joinedClubs.club')
      .populate('registeredEvents');
      
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'User not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: user }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Create new user (register)
export const createUser = async (req, res, body) => {
  try {
    const user = await User.create(body);
    
    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;
    
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: userObject }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Update user
export const updateUser = async (req, res, id, body) => {
  try {
    // Don't allow password update through this method
    delete body.password;
    
    const user = await User.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'User not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: user }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Join club
export const joinClub = async (req, res, userId, clubId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'User not found' }));
      return;
    }
    
    await user.joinClub(clubId);
    
    // Also update club members count
    const Club = (await import('../models/index.js')).Club;
    await Club.findByIdAndUpdate(clubId, { $inc: { members: 1 } });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: user }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Leave club
export const leaveClub = async (req, res, userId, clubId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'User not found' }));
      return;
    }
    
    await user.leaveClub(clubId);
    
    // Also update club members count
    const Club = (await import('../models/index.js')).Club;
    await Club.findByIdAndUpdate(clubId, { $inc: { members: -1 } });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: user }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};
