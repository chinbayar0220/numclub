// controllers/clubController.js
import { Club } from '../models/index.js';

// Get all clubs
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ status: 'active' }).sort({ createdAt: -1 });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: clubs.length, data: clubs }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Get club by ID
export const getClubById = async (req, res, id) => {
  try {
    const club = await Club.findById(id).populate('createdBy', 'username email');
    
    if (!club) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Club not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: club }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Create new club
export const createClub = async (req, res, body) => {
  try {
    const club = await Club.create(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: club }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Update club
export const updateClub = async (req, res, id, body) => {
  try {
    const club = await Club.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!club) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Club not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: club }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Delete club
export const deleteClub = async (req, res, id) => {
  try {
    const club = await Club.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true }
    );
    
    if (!club) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Club not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: {} }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Filter clubs by direction
export const getClubsByDirection = async (req, res, direction) => {
  try {
    const clubs = await Club.findByDirection(direction);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: clubs.length, data: clubs }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Filter clubs by school
export const getClubsBySchool = async (req, res, school) => {
  try {
    const clubs = await Club.findBySchool(school);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: clubs.length, data: clubs }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};
