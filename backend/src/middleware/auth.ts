import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;
    req.user = {id: payload.sub as string, username: payload.username as string, role: payload.role as string, email: payload.email as string };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid/access token expired' });
  }
};
