import { z } from 'zod';

export const setTermsAndConditionsSchema = z.object({
  content: z.string().min(1, { message: 'Content cannot be empty' }),
});

export type SetTermsAndConditionsInput = z.infer<typeof setTermsAndConditionsSchema>;

export const toggleGymStatusSchema = z.object({
  gymId: z.string().uuid({
    message: 'Invalid gym ID format',
  }),
  isActive: z.boolean({
    required_error: 'Activation status is required',
  }),
});

export type ToggleGymStatusInput = z.infer<typeof toggleGymStatusSchema>;
