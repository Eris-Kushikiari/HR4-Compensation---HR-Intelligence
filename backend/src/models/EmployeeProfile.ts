import mongoose, { Document, Schema } from "mongoose";
import { EmployeeProfile } from "../types/employee";

interface EmployeeProfileDocument extends EmployeeProfile, Document {}

const EmployeeProfileSchema = new Schema<EmployeeProfileDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        employeeId: {
            type: String,
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true
        },

        dateOfBirth: {
            type: String
        },
        gender: {
            type: String
        },
        nationalId: {
            type: String
        },
        taxId: {
            type: String
        },
        contact: {
            phone: String,
            email: String,
            address: String,
        },
        emergencyContacts: [
            {
                name: String,
                relationship: String,
                phone: String,
            },
        ],

        jobTitle: String,
        department: String,
        reportingManager: String,
        employmentType: String,
        startDate: String,
        status: String,
        workLocation: String,

        salaryGrade: String,
        baseSalary: Number,
        allowances: Number,
        deductions: Number,
        payFrequency: String,

        workSchedule: String,
        leaveBalance: Number,
        overTimeRecords: Number,

        benefitsPlan: String,
        dependents: [
            {
                name: String,
                relationship: String,
                birhtDate: String,
            },
        ],
        contributionAmount: Number,

        documents: [
            {
                type: { type: String},
                url: String,
            },
        ],

        skills: [String],
        certifications: [String],
        performanceRatings: [String],
        trainingRecords: [String],
        assetsIssued: [String],
    },
    {timestamps: true}
);

export default mongoose.model<EmployeeProfileDocument>(
    'EmployeeProfile',
    EmployeeProfileSchema
)