import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find the user by username (using a where clause for Sequelize)
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT token. Use the correct property (e.g., user.id)
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;

