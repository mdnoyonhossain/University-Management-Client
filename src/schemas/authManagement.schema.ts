import { z } from "zod";

export const loginSchema = z.object({
    id: z.string({ required_error: "User ID is required" }),
    password: z.string({ required_error: "Password is required" })
});

export const changePasswordSchema = z.object({
    oldPassword: z.string({ required_error: "Old Password is required" }),
    newPassword: z.string({ required_error: "New Password is required" })
});