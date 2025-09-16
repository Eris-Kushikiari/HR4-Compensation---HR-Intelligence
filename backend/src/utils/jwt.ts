import jwt, {JwtPayload} from 'jsonwebtoken'
import { IUser } from '../models/User'

export const createAccessToken = (user: IUser) =>
  jwt.sign(
    { sub: user.id.toString(), role: user.role, email: user.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );

export const createRefreshToken = (user: IUser) =>
    jwt.sign(
        {sub: user.id.toString()},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: '7d'}
    );


export const verifyAccessToken = (token: string) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

export const verifyRefreshToken = (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;