import * as z from "zod"

export const profileFormSchema = z.object({
  first_name: z.string().min(4).max(30),
  last_name: z.string().min(4).max(30),
  username: z.string().min(4).max(30),
  email: z.string().min(4).max(30),
  address: z.string().optional(),
  contact_no: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const subjectFormSchema = z.object({
  subject: z.string().min(4).max(30),
  description: z.string().optional(),
})

export type SubjectFormValues = z.infer<typeof subjectFormSchema>

export const courseFormSchema = z.object({
  course: z.string().min(4).max(30),
  description: z.string().optional(),
})

export type CourseFormValues = z.infer<typeof courseFormSchema>

export const roomFormSchema = z.object({
  room: z.string().min(4).max(30),
  description: z.string().optional(),
})

export type RoomFormValues = z.infer<typeof roomFormSchema>

export const facultyFormSchema = z.object({
  first_name: z.string().min(4).max(30),
  last_name: z.string().min(4).max(30),
  username: z.string().min(4).max(30),
  email: z.string().min(4).max(30),
  address: z.string().optional(),
  contact_no: z.string().optional(),
})

export type FacultyFormValues = z.infer<typeof facultyFormSchema>
