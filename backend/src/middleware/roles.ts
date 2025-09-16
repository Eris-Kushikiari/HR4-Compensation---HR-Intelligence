import { Request, Response, NextFunction } from "express";

export const authorizedRoles = (...roles: string[]) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        if(!req.user){
            return res.status(401).json({message: "Not Authenticated"})
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: 'Forbidden'})
        }
        next();
    }
}