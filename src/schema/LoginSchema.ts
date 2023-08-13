import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const loginSchema = z.object({
    email: z
    .string({required_error: 'Please enter your email id'})
    .min(5, { message: "This field has to be filled." })
    .refine((e) => emailRegex.test(e), "This is not a valid email."),
    oneTimeCode: z
    .string().optional(),
  
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((e) => passwordRegex.test(e), "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
});

type LoginValidationSchema = z.infer<typeof loginSchema>;
export default LoginValidationSchema;
