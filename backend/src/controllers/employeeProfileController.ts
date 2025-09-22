import { Request, Response } from "express";
import EmployeeProfile from "../models/EmployeeProfile";

//create new profile for the loggend in user
export const createEmployeeProfile = async (req: Request, res: Response) => {
    try {
        const existing = await EmployeeProfile.findOne({userId: req.user?.id,})
        if(existing){
            return res.status(400).json({message: 'Profile already exist'})
        }
        const profile = new EmployeeProfile({
            ...req.body,
            userId: req.user?.id,
        })
        await profile.save()
        res.status(201).json(profile)
    } catch (error) {
        res.status(500).json({error: 'Server Error', details: error})
    }
}

//get current logged in users profile
export const getMyEmployeeProfile = async (req: Request, res: Response) =>{
    try {
        const profile = await EmployeeProfile.findOne({userId: req.user?.id})
        if(!profile) {
            return res.status(404).json({message: "Profile not found"})
        }
        res.json(profile)
    } catch (error) {
        res.status(500).json({error: 'Server Error', details: error})
    }
}

//get any employee profile by id (admin usage)
export const getEmployeeProfileById = async (req: Request, res: Response) =>{
    try {
        const profile = await EmployeeProfile.findOne({userId: req.user?.id})
        if(!profile){
            return res.status(404).json({message: "Profile not found"})
        }
        res.json(profile)
    } catch (error) {
        res.status(500).json({error: "Server error", details: error})
    }
}

//Update the current logged in users profile
export const updateMyEmployeeProfile = async (req: Request, res: Response) =>{
    try {
        const updated = await EmployeeProfile.findOneAndUpdate({userId: req.user?.id}, req.body, {new: true, runValidators: true})
        if(!updated){
            return res.status(404).json({message: "Profile not found"})
        }
        res.json(updated)
    } catch (error) {
        res.status(500).json({error: "Server error", details: error})
    }
}

//delete the current logged in users profile
export const deleteMyEmployeeProfile = async (req: Request, res: Response) =>{
    try {
        const deleted = await EmployeeProfile.findOneAndDelete({userId: req.user?.id})
        if(!deleted){
            return res.status(404).json({message: "Profile not found"})
        }
        res.json({message: "Profile deleted"})
    } catch (error) {
        res.status(500).json({error: "Server error", details: error})
    }
}

//get all profiles for admin
export const getAllEmployeeProfiles = async (req: Request, res: Response) =>{
    try {
        const profiles = await EmployeeProfile.find()
        res.json(profiles)
    } catch (error) {
        res.status(500).json({error: 'Server error', details: error})
    }
}
