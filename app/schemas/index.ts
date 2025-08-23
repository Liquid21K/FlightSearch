import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

export const RegisterSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    firstname: z.string().min(3, {message: "First name must be at least 3 characters long"}),
    lastname: z.string().min(3, {message: "Last name must be at least 3 characters long"}),
    gender: z.string().min(1, {message: "Gender is required"}),
    dob: z.string().min(1, {message: "Date of birth is required"}),

    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters long"} ),
})

