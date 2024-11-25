import { z } from "zod";

export const createStudentSchema = z.object({
    name: z.string({ required_error: "ssss Name is required" }),
    email: z.string({ required_error: "sss is required" }),
})