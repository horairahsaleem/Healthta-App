<<<<<<< Updated upstream
import express from "express";
=======
import express from 'express';
import { signup, login, socialLogin, verifyEmail ,getMyProfile} from '../controllers/authController.js';
import { validateSignup } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {protect} from '../middleware/authMiddleware.js'
>>>>>>> Stashed changes

const router = express.Router();
router.route('/register').post(register)




<<<<<<< Updated upstream
=======
router.post('/register', validateSignup, signup);
router.post('/login', login);
router.post('/social-login', socialLogin);
router.get('/verify-email/:token', verifyEmail);
router.get("/me", protect, getMyProfile);

>>>>>>> Stashed changes

export default router;