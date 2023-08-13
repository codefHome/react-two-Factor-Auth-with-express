import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const userSchema = z.object({
  firstName: z
    .string({
      required_error: 'Please enter First Name',
    })
    .max(155, 'The maximum length First Name is 155')
    .min(5, 'Minimum length of First Name is 5'),
  lastName: z
    .string({
      required_error: 'Please enter Last Name',
    })
    .max(155, 'The maximum length Last Name is 155')
    .min(5, 'Minimum length of Last Name is 5'),
    email: z
    .string({required_error: 'Please enter your email id'})
    .min(5, { message: "This field has to be filled." })
    .refine((e) => emailRegex.test(e), "This is not a valid email."),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((e) => passwordRegex.test(e), "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    confirmPassword: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserValidationSchema = z.infer<typeof userSchema>;
export default UserValidationSchema;
