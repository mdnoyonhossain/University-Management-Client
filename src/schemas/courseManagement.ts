import { z } from "zod";

export const createCourseSchema = z.object({
    title: z.string({ required_error: "Course Title is required" }).min(1, "Course Title cannot be empty"),
    prefix: z.string({ required_error: "Course Prefix is required" }).min(1, "Course Prefix cannot be empty"),
    code: z.string({ required_error: "Course Code is required" }).min(1, "Course Code must be greater than 0"),
    credits: z.string({ required_error: "Course Credits are required" }).min(1, "Credits must be at least 1"),
    preRequisiteCourses: z.array(z.string(), { required_error: "Select at least one prerequisite course" }).optional(),
});
