// controllers/eventController.js
import { Event } from '../models/index.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('club', 'shortName logo')
      .populate('createdBy', 'username')
      .sort({ startDate: 1 });
      
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: events.length, data: events }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.getUpcoming()
      .populate('club', 'shortName logo')
      .populate('createdBy', 'username');
      
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: events.length, data: events }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Get event by ID
export const getEventById = async (req, res, id) => {
  try {
    const event = await Event.findById(id)
      .populate('club')
      .populate('createdBy', 'username email')
      .populate('registeredUsers.user', 'username email');
      
    if (!event) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Event not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: event }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Get events by club
export const getEventsByClub = async (req, res, clubId) => {
  try {
    const events = await Event.getByClub(clubId)
      .populate('createdBy', 'username');
      
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: events.length, data: events }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Create new event
export const createEvent = async (req, res, body) => {
  try {
    const event = await Event.create(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: event }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Update event
export const updateEvent = async (req, res, id, body) => {
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Event not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: event }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Register user for event
export const registerForEvent = async (req, res, eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Event not found' }));
      return;
    }
    
    await event.registerUser(userId);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: event }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};

// Unregister user from event
export const unregisterFromEvent = async (req, res, eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Event not found' }));
      return;
    }
    
    await event.unregisterUser(userId);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: event }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
};
