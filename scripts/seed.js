// scripts/seed.js
// Run this script to populate the database with initial data
// Usage: node scripts/seed.js

import 'dotenv/config';
import connectDB from '../config/database.js';
import { Club, User, Event } from '../models/index.js';

// Sample clubs data
const clubs = [
  {
    cname: "Hackum students club",
    shortName: "Hackum",
    description: "Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудад мэдлэгийг хөгжүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг.",
    directions: ["it", "science"],
    school: "its",
    logo: "images/clubs/hackum.png",
    members: 65,
    status: "active"
  },
  {
    cname: "BSONK",
    shortName: "BSONK",
    description: "BSONK клуб нь бизнес ба стартап сонирхдог оюутнуудад зориулсан уулзалт, хэлэлцүүлэг, pitch event зохион байгуулдаг.",
    directions: ["volunteer", "science"],
    school: "bs",
    logo: "images/clubs/bsonk.png",
    members: 42,
    status: "active"
  },
  {
    cname: "Google developers club",
    shortName: "GDSC",
    description: "Google технологи болон ерөнхий программчлалын чиглэлээр workshop, hackathon, coding challenge зохион байгуулдаг.",
    directions: ["it"],
    school: "its",
    logo: "images/clubs/gdsc.png",
    members: 80,
    status: "active"
  },
  {
    cname: "Art Club",
    shortName: "Art club",
    description: "Урлаг, дизайн, илтгэл, контент бүтээх сонирхолтой оюутнуудад зориулсан клуб.",
    directions: ["art"],
    school: "shus",
    logo: "images/clubs/art.png",
    members: 30,
    status: "active"
  },
  {
    cname: "Sport Club",
    shortName: "Sport club",
    description: "Спортын тэмцээн, дасгал хөдөлгөөн, health lifestyle-ыг дэмждэг клуб.",
    directions: ["sport"],
    school: "mtes",
    logo: "images/clubs/sport.png",
    members: 55,
    status: "active"
  },
  {
    cname: "Photo Club",
    shortName: "Photo club",
    description: "Фото зураг, видео, медиа контентын чиглэлээр дадлага, аялал, workshop хийдэг.",
    directions: ["photo", "art"],
    school: "uts",
    logo: "images/clubs/photo.png",
    members: 25,
    status: "active"
  },
  {
    cname: "Language Club",
    shortName: "Language club",
    description: "Гадаад хэлний ярианы клуб, соёлын солилцоо болон хэлний эвентүүд зохион байгуулдаг.",
    directions: ["language"],
    school: "shus",
    logo: "images/clubs/language.png",
    members: 40,
    status: "active"
  },
  {
    cname: "Volunteer Club",
    shortName: "Volunteer club",
    description: "Нийгэмд эерэг нөлөө үзүүлэх сайн дурын үйл ажиллагаа зохион байгуулдаг.",
    directions: ["volunteer"],
    school: "bs",
    logo: "images/clubs/volunteer.png",
    members: 70,
    status: "active"
  }
];

// Sample users data
const users = [
  {
    username: "john_doe",
    email: "john.doe@student.edu.mn",
    password: "password123", // In production, this should be hashed
    firstName: "John",
    lastName: "Doe",
    studentId: "20B1NUM0001",
    school: "its",
    bio: "Computer Science student passionate about coding",
    interests: ["it", "science"],
    role: "student"
  },
  {
    username: "jane_smith",
    email: "jane.smith@student.edu.mn",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    studentId: "20B1NUM0002",
    school: "bs",
    bio: "Business student interested in startups",
    interests: ["volunteer", "science"],
    role: "student"
  },
  {
    username: "admin_user",
    email: "admin@numclub.edu.mn",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    school: "its",
    bio: "System administrator",
    interests: ["it"],
    role: "super_admin"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Club.deleteMany({});
    await User.deleteMany({});
    await Event.deleteMany({});
    
    // Insert clubs
    console.log('📝 Inserting clubs...');
    const createdClubs = await Club.insertMany(clubs);
    console.log(`${createdClubs.length} clubs inserted`);
    
    // Insert users
    console.log('📝 Inserting users...');
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users inserted`);
    
    // Create sample events
    const sampleEvents = [
      {
        title: "Web Development Workshop",
        description: "Learn modern web development with React and Node.js",
        club: createdClubs[0]._id, // Hackum
        eventType: "workshop",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 hours
        location: "ITS Building, Room 301",
        venue: {
          building: "ITS Building",
          room: "301",
          address: "NUM Campus"
        },
        capacity: 50,
        image: "images/events/workshop.png",
        status: "upcoming",
        createdBy: createdUsers[0]._id,
        tags: ["web", "react", "nodejs"]
      },
      {
        title: "Startup Pitch Competition",
        description: "Present your startup ideas and win prizes",
        club: createdClubs[1]._id, // BSONK
        eventType: "competition",
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        location: "Business School Auditorium",
        venue: {
          building: "Business School",
          room: "Auditorium",
          address: "NUM Campus"
        },
        capacity: 100,
        image: "images/events/pitch.png",
        status: "upcoming",
        createdBy: createdUsers[1]._id,
        tags: ["startup", "business", "competition"]
      }
    ];
    
    console.log('📝 Inserting events...');
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`${createdEvents.length} events inserted`);
    
    // Link users to clubs
    console.log('🔗 Creating club memberships...');
    await createdUsers[0].joinClub(createdClubs[0]._id, 'member');
    await createdUsers[1].joinClub(createdClubs[1]._id, 'admin');
    console.log('Club memberships created');
    
    console.log('\n Database seeded successfully!');
    console.log('\n Summary:');
    console.log(`   - Clubs: ${createdClubs.length}`);
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Events: ${createdEvents.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
