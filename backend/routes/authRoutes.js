import express from 'express';
import { signup, login, socialLogin, verifyEmail } from '../controllers/authController.js';
import { validateSignup } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup', authLimiter, validateSignup, signup);
router.post('/login', authLimiter, login);
router.post('/social-login', authLimiter, socialLogin);
router.get('/verify-email/:token', verifyEmail);

export default router;