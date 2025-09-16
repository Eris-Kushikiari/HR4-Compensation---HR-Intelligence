import { Request, Response } from "express";
import User from "../models/User";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt";

const isProd = process.env.NODE_ENV === 'production';

const accessCookieOptions = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: 'lax' as const,
    secure: isProd
}

const refresCookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax' as const,
    secure: isProd
}

export const register = async (req: Request, res: Response) => {
    const {email, password, role} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "Email & password required"})
    }

    const existing = await User.findOne({email});
    if(existing) {
        return res.status(409).json({message: 'User already exist'})
    }

    const user = await User.create({email, password, role});
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, accessCookieOptions)
    res.cookie('refreshToken', refreshToken, refresCookieOptions)
    res.status(201).json({user: {id: user._id, email: user.email, role: user.role}})
}

export const login = async (req: Request, res: Response) =>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message:"Email & password is required"})
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const ok = await user.comparePassword(password)
    if(!ok){
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, accessCookieOptions)
    res.cookie('refreshToken', refreshToken, refresCookieOptions)
    res.json({user: user._id, email: user.email, role: user.role})
}

export const refresh = async (req: Request, res: Response) =>{
    const token = req.cookies?.refreshToken;
    if(!token){
        return res.status(401).json({message: 'No refresh token'})
    }

    let payload;
    try {
        payload = verifyRefreshToken(token)
    } catch (error) {
        return res.status(401).json({message: 'Invalid refresh token'})
    }

    const userId = payload.sub as string;
    const user = await User.findById(userId);
    if(!user || user.refreshToken !== token){
        return res.status(401).json({message: "Invalid session"})
    }

    //rotate tokens
    const newAccess = createAccessToken(user)
    const newRefresh = createRefreshToken(user)
    user.refreshToken = newRefresh;
    await user.save();

    res.cookie('accessToken', newAccess, accessCookieOptions)
    res.cookie('refreshToken', newRefresh, refresCookieOptions)
    res.json({user: user._id, email: user.email, role: user.role})
}

export const logout = async (req: Request, res: Response) =>{
    const token = req.cookies?.refreshToken;

    if(token){
        try {
            const payload = verifyRefreshToken(token)
            const user = await User.findById(payload.sub as string)
            if(user){
                user.refreshToken = null
                await user.save()
            }
        } catch (error) {
            
        }
    }

    res.clearCookie('accessToken', accessCookieOptions)
    res.clearCookie('refreshToken', refresCookieOptions)
    res.json({message: 'Logged out'})
}