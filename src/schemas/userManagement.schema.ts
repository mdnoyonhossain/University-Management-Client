import { z } from "zod";

const imageFileValidation = z.instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
        message: "Profile image must be an image file.",
    }).refine((file) => file.size <= 2 * 1024 * 1024, { // 2MB size limit
        message: "Profile image must be smaller than 2MB.",
    });

export const personalInfoStudentSchema = z.object({
    name: z.object({
        firstName: z.string({ required_error: "First name is required" }).min(1),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: "Last name is required" }).min(1),
    }),
    gender: z.string({ required_error: "Gender is required" }).min(1),
    BloodGroup: z.string({ required_error: "Blood Group is required" }),
    profileImg: imageFileValidation.optional(),
});

export const studentContactInfoSchema = z.object({
    email: z.string({ required_error: "Please enter a valid email address." }).email(),
    contactNo: z.string({ required_error: "Contact number must be at least 10 characters." }).min(10).regex(/^\d+$/),
    emergencyContactNo: z.string({ required_error: "Emergency contact number must be at least 10 characters." }).min(10).regex(/^\d+$/),
    presentAddress: z.string({ required_error: "Present address is required." }).min(1),
    permanentAddress: z.string({ required_error: "Permanent address is required." }).min(1),
});

export const studentGuardianInfoSchema = z.object({
    guardian: z.object({
        fatherName: z.string({ required_error: "Father's full name is required." }).min(1),
        fatherOccupation: z.string({ required_error: "Father's occupation is required." }).min(1),
        fatherContactNo: z.string({ required_error: "Father's contact number must be at least 10 digits." }).min(10).regex(/^\d+$/, "Father's contact number must be numeric."),
        motherName: z.string({ required_error: "Mother's full name is required." }).min(1),
        motherOccupation: z.string({ required_error: "Mother's occupation is required." }).min(1),
        motherContactNo: z.string({ required_error: "Mother's contact number must be at least 10 digits." }).min(10).regex(/^\d+$/, "Mother's contact number must be numeric."),
    })
});

export const studentLocalGuardianInfoSchema = z.object({
    localGuardian: z.object({
        name: z.string({ required_error: "Full name of local guardian is required." }).min(1),
        occupation: z.string({ required_error: "Occupation of local guardian is required." }).min(1),
        contactNo: z.string({ required_error: "Local guardian's contact number must be at least 10 digits." }).min(10).regex(/^\d+$/, "Local guardian's contact number must be numeric."),
        address: z.string({ required_error: "Local guardian's address is required." }).min(1),
    }),
});

export const studentAcademicInfoSchema = z.object({
    admissionSemester: z.string({ required_error: "Admission semester is required." }),
    academicDepartment: z.string({ required_error: "Academic department is required." }),
});


// Faculty Validation
export const personalInfoFacultySchema = z.object({
    name: z.object({
        firstName: z.string({ required_error: "First name is required" }).min(1),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: "Last name is required" }).min(1),
    }),
    gender: z.string({ required_error: "Gender is required" }).min(1),
    bloogGroup: z.string({ required_error: "Blood Group is required" }),
    profileImg: imageFileValidation.optional(),
});

export const facultyContactInfoSchema = z.object({
    email: z.string({ required_error: "Please enter a valid email address." }).email(),
    contactNo: z.string({ required_error: "Contact number must be at least 10 characters." }).min(10).regex(/^\d+$/),
    emergencyContactNo: z.string({ required_error: "Emergency contact number must be at least 10 characters." }).min(10).regex(/^\d+$/),
    presentAddress: z.string({ required_error: "Present address is required." }).min(1),
    permanentAddress: z.string({ required_error: "Permanent address is required." }).min(1),
});

export const facultyAcademicInfoSchema = z.object({
    academicDepartment: z.string({ required_error: "Academic department is required." }),
    designation: z.string({ required_error: "Faculty Designation is required." }),
});