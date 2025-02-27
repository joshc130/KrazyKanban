import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Apply authentication middleware to secure all API routes
router.use('/api', authenticateToken, apiRoutes);
// Use authRoutes 
router.use('/auth', authRoutes);
export default router;
