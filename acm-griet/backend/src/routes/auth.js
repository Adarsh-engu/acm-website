import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login } from '../controllers/auth.js';

const router = Router();

// Strict rate limiting for login (5 requests per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, please try again after 15 minutes.' }
});

router.post('/login', loginLimiter, login);

export default router;
