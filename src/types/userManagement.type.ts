import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagement.type";

// Student Types
export type TStudent = {
    _id: string
    id: string
    user: TStudentUser
    name: TStudentName
    gender: string
    email: string
    contactNo: string
    emergencyContactNo: string
    BloodGroup: string
    presentAddress: string
    permanentAddress: string
    guardian: TStudentGuardian
    localGuardian: TStudentLocalGuardian
    profileImg: string
    admissionSemester: TAcademicSemester
    academicDepartment: TAcademicDepartment
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    fullName: string
}

export type TStudentUser = {
    _id: string
    id: string
    email: string
    needsPasswordChange: boolean
    role: string
    status: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export type TStudentName = {
    firstName: string
    middleName: string
    lastName: string
    _id: string
}

export type TStudentGuardian = {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
}

export type TStudentLocalGuardian = {
    name: string
    occupation: string
    contactNo: string
    address: string
    _id: string
}

// Fculty Types
export type TFaculty = {
    _id: string
    id: string
    user: string
    designation: string
    name: TFacultyName
    gender: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloogGroup: string
    presentAddress: string
    permanentAddress: string
    profileImg: string
    academicDepartment: TAcademicDepartment
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    fullName: string
}

export type TFacultyName = {
    firstName: string
    middleName: string
    lastName: string
    _id: string
}

// Admin Types
export type TAdmin = {
    _id: string
    id: string
    user: string
    designation: string
    name: TAdminName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: string
    presentAddress: string
    permanentAddress: string
    profileImg: string
    isDeleted: boolean
    fullName: string
}

export type TAdminName = {
    firstName: string
    middleName: string
    lastName: string
    _id: string
}

