import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { authorizedRoles } from "../middleware/roles";

const router = Router()

router.get('/profile', authenticate, (req, res) =>{
    res.json({message: 'protected', user: req.user})
})

router.get('/admin', authenticate, authorizedRoles('admin'), (req, res) =>{
    res.json({message: 'Hello Admin'})
})

export default router