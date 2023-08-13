import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const updatePasswordSchema = z.object({
    
    oldPassword:z.string({required_error:'please enter your old password'}),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((e) => passwordRegex.test(e), "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
type PasswordValidationSchema = z.infer<typeof updatePasswordSchema>;
export default PasswordValidationSchema;
