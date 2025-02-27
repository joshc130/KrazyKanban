import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Extend the Request interface to include a "user" property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the token from the Authorization header ("Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is present
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token verification fails
    }

    // Attach the user data (decoded token payload) to the request object
    req.user = decoded as JwtPayload;
    next();
  });
};
