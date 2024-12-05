import { z } from "zod";

export const createCourseSchema = z.object({
    title: z.string({ required_error: "Course Title is required" }).min(1, "Course Title cannot be empty"),
    prefix: z.string({ required_error: "Course Prefix is required" }).min(1, "Course Prefix cannot be empty"),
    code: z.string({ required_error: "Course Code is required" }).min(1, "Course Code must be greater than 0"),
    credits: z.string({ required_error: "Course Credits are required" }).min(1, "Credits must be at least 1"),
    preRequisiteCourses: z.array(z.string(), { required_error: "Select at least one prerequisite course" }).optional(),
});

export const addAssignFaculties = z.object({
    faculties: z.array(z.string(), { required_error: "Select Add Assign Faculties" }).min(1, "Assign Faculties cannot be empty"),
});

export const offeredCourseAcademicCourseSchema = z.object({
    semesterRegistration: z.string({ required_error: "Semester Registration is required" }),
    academicFaculty: z.string({ required_error: "Academic Faculty is required" }),
    academicDepartment: z.string({ required_error: "Academic Department is required" }),
    course: z.string({ required_error: "Course is required" }),
    faculty: z.string({ required_error: "Faculty is required" }),
});

export const offeredCourseSectionDateTimeSchema = z.object({
    maxCapacity: z.string({ required_error: "Max Capacity is required" }),
    section: z.string({ required_error: "Section is required" }),
    days: z.array(z.string(), { required_error: "Days are required" }).min(1, "At least one day must be selected"),
    startTime: z.string({ required_error: "Start Time is required" }).regex(/^\d{2}:\d{2}$/, "Start Time must be in HH:MM format"),
    endTime: z.string({ required_error: "End Time is required" }).regex(/^\d{2}:\d{2}$/, "End Time must be in HH:MM format"),
});
