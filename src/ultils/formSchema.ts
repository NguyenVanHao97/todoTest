import {z} from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const formSchemaEdit = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  des: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(50, 'des max 100 character'),
  id: z.string(),
  isSelected: z.boolean().optional(),
  lastUpdate: z.number(),
  priority: z.string(),
  title: z.string(),
  executionTime: z
    .object({
      date: z.number(),
      time: z.number(),
    })
    .optional(),
  status: z.string(),
});
