export interface Contact {
    phone?: string
    email?: string
    address?: string
}

export interface EmergencyContact {
    name?: string
    relationship: string
    phone?: string
}

export interface Dependent {
    name: string
    relationship: string
    birtDate: string
}

export interface Documents {
    type: string
    url: string
}

export interface EmployeeProfile {
    userId: string
    employeeId: string
    fullName: string
    dateOfBirth: string
    gender: string
    nationalId: string
    taxId: string
    contact?: Contact
    emergencyContacts?: EmergencyContact[]
    jobTitle: string
    department: string
    reportingManager: string
    employmentType: string
    startDate: string
    status: string
    workLocation: string
    salaryGrade: string
    baseSalary: number
    allowances: number
    deductions: number
    payFrequency: string
    workSchedule: string
    leaveBalance: number
    overTimeRecords: number
    benefitsPlan: string
    dependents: Dependent[]
    contributionAmount: number
    documents: Documents[]
    skills: string[]
    certifications: string[]
    performanceRatings: string[]
    trainingRecords: string[]
    assetsIssued: string[]
}