import express from 'express';
import { contact } from '../controllers/otherController.js';
import { validateSignup } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/contact', authLimiter, contact);


export default router;