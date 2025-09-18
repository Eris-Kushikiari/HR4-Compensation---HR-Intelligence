import { Types } from "mongoose";

export interface EmergencyContact {
    name: string;
    relationship: string;
    phon: string;
}

export interface Dependent {
    name: string;
    relationship: string;
    birthDate: string;
}

export interface DocumentItem {
    type: string;
    url: string;
}

export interface EmployeeProfile {
    userId: Types.ObjectId; //for reference to User model

    //Basic Personal Information
    employeeId: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    taxId: string;
    contact: {
        phone: string;
        email: string;
        address: string;
    }

    emergencyContacts: EmergencyContact[];

    //Employee Information
    jobTitle: string;
    department: string;
    reportingManager: string;
    employmentType: 'regular' | 'probationary' | 'contract';
    startDate: string;
    status: 'active' | 'resigned' | 'terminated';
    workLocation: string;

    //Compensation Information
    salaryGrade: string;
    baseSalary: number;
    allowances: number;
    deductions: number;
    payFrequency: 'monthly' | 'bi-weekly';

    //Time & Attendance
    workSchedule: string;
    leaveBalance: number;
    overTimeRecords: number;

    //Benefits/HMO
    benefitsPlan: string;
    dependents: Dependent[];
    contributionAmount: number;

    //Documents & Compliance
    documents: DocumentItem[];

    //Custom Fields
    skills: string[];
    certifications: string[];
    performanceRatings: string[];
    trainingRecords: string[];
    assetsIssued: string[];
}