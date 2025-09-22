import api from "../utils/axios";
import { EmployeeProfile } from "../types/employee";

//get
export const getEmployeeProfiles = async (): Promise<EmployeeProfile> =>{
    const res = await api.get<EmployeeProfile>('/api/employee/me')
    return res.data
}

//create
export const createEmployeeProfiles = async (data: Omit<EmployeeProfile, 'id'>): Promise<EmployeeProfile> =>{
    const res = await api.post<EmployeeProfile>('/api/employee', data)
    return res.data
}

//put
export const editEmployeeProfiles = async (data: Partial<Omit<EmployeeProfile, 'id'>>): Promise<EmployeeProfile> =>{
    const res = await api.put<EmployeeProfile>('/api/employee/me', data)
    return res.data
}

//delete
export const deleteEmployeeProfiles = async (): Promise<void> =>{
    await api.delete('/api/employee/me')
}

