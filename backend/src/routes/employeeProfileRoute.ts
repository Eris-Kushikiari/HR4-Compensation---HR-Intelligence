import { Router } from "express";
import { createEmployeeProfile, 
    getMyEmployeeProfile, 
    updateMyEmployeeProfile, 
    deleteMyEmployeeProfile, 
    getEmployeeProfileById, 
    getAllEmployeeProfiles } from "../controllers/employeeProfileController";
import { authenticate } from "../middleware/auth";

const router = Router()

//for logged in users to manages own profiles
router.post('/', authenticate, createEmployeeProfile)
router.get('/me', authenticate, getMyEmployeeProfile)
router.put('/me', authenticate, updateMyEmployeeProfile)
router.delete('/me', authenticate, deleteMyEmployeeProfile)

//admin only routes
router.get('/', authenticate, getAllEmployeeProfiles)
router.get('/:id', authenticate, getEmployeeProfileById)


export default router