import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.js';
const router = Router();
// Apply authentication middleware for all routes defined below
router.use(authenticateToken);
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
export default router;
