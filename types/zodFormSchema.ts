import * as z from "zod"

const weekly = z.object({
  // sched_type: z.string(),
  weeklySched: z.literal(true),
  sched_Desc: z.string(),
  faculty_id: z.string().uuid(),
  course_id: z.string(),
  room_id: z.string(),
  subject_id: z.string(),

  daysOfWeek: z.string(), // daysOfWeek can be string or undefined
  from_month: z.string(), // from_month can be string or undefined
  to_month: z.string(),

  time_from: z.string().regex(/^[0-2]\d:[0-5]\d$/),
  time_to: z.string().regex(/^[0-2]\d:[0-5]\d$/),
})

const nonWeekly = z.object({
  // sched_type: z.string(),
  weeklySched: z.literal(false),
  sched_Desc: z.string(),
  faculty_id: z.string().uuid(),
  course_id: z.string(),
  room_id: z.string(),
  subject_id: z.string(),

  time_from: z.string().regex(/^[0-2]\d:[0-5]\d$/),
  time_to: z.string().regex(/^[0-2]\d:[0-5]\d$/),
})

export const SchedformSchema = z.discriminatedUnion("weeklySched", [
  weekly,
  nonWeekly,
])

export type SchedformPayload = z.infer<typeof SchedformSchema>


