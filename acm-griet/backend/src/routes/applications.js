import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../middlewares/validate.js';
import { applicationSchema } from '../schemas/application.js';
import { createApplication, getApplications, updateApplicationStatus } from '../controllers/applications.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Limit application submissions (10 per hour per IP)
const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many applications submitted from this IP, please try again later.' }
});

// Public route for students to apply
router.post('/', submissionLimiter, validate(applicationSchema), createApplication);

// Protected admin routes
router.get('/', requireAuth, getApplications);
router.patch('/:id/status', requireAuth, updateApplicationStatus);

export default router;
