import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  // You can add other fields such as id, exp, etc.
}

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Get the token from the Authorization header in "Bearer <token>" format
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return;
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
    res.sendStatus(403); 
    return;
    }

    // Attach the decoded payload to the request object for further use
    (req as any).user = decoded as JwtPayload;
    next();
  });
};

export default authenticateToken;
