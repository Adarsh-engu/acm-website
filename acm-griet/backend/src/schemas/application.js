import { z } from 'zod';

export const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(150),
  rollNumber: z.string().min(1, 'Roll number is required').max(30).transform(val => val.toUpperCase()),
  yearOfStudy: z.enum(['2nd', '3rd'], {
    errorMap: () => ({ message: 'Please select a valid year of study (2nd or 3rd)' })
  }),
  branch: z.enum(['CSE', 'CSM', 'CSDS', 'CSBS', 'ECE', 'EEE', 'MECH', 'CIV'], {
    errorMap: () => ({ message: 'Please select a valid branch' })
  }),
  section: z.string().optional(),
  domainsInterested: z.array(z.string()).min(1, 'Select at least 1 domain').max(3, 'Select at most 3 domains'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number'),
  howKnow: z.string().min(5, 'Please let us know how you heard about us').max(1000),
  whyJoin: z.string().min(10, 'Please provide a detailed reason').max(1000),
  expectations: z.string().min(10, 'Please tell us your expectations').max(1000),
}).strict().superRefine((data, ctx) => {
  // Conditional validation for section
  const requiresSection = ['CSE', 'CSM', 'CSDS'].includes(data.branch);
  if (requiresSection && !data.section) {
    ctx.addIssue({
      path: ['section'],
      code: z.ZodIssueCode.custom,
      message: 'Section is required for your branch',
    });
  }
});
