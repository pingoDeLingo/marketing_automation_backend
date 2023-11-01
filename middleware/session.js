import expressSession from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Session configuration
const sessionConfig = {
  genid: (req) => {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 3600000, // Read maxAge from .env or use default
  },
};

// Set up express-session middleware
const sessionMiddleware = expressSession(sessionConfig);

// Middleware to handle user sessions
const sessionHandler = (req, res, next) => {
    sessionMiddleware(req, res, () => {
        req.session.active = true;
        next();
    });
};

export { sessionMiddleware, sessionHandler };
