import * as z from "zod"

const weekly = z.object({
  sched_type: z.string(),
  weeklySched: z.literal(true),
  sched_Desc: z.string(),
  faculty_id: z.string(),
  course_id: z.coerce.number(),
  room_id: z.coerce.number(),
  subject_id: z.coerce.number(),

  daysOfWeek: z.string(),
  from_month: z.string(),
  to_month: z.string(),

  time_from: z.string().regex(/^[0-2]\d:[0-5]\d$/),
  time_to: z.string().regex(/^[0-2]\d:[0-5]\d$/),
})

const nonWeekly = z.object({
  sched_type: z.string(),
  weeklySched: z.literal(false),
  sched_Desc: z.string(),
  faculty_id: z.string(),
  course_id: z.coerce.number(),
  room_id: z.coerce.number(),
  subject_id: z.coerce.number(),

  time_from: z.string().regex(/^[0-2]\d:[0-5]\d$/),
  time_to: z.string().regex(/^[0-2]\d:[0-5]\d$/),
})

export const SchedformSchema = z.discriminatedUnion("weeklySched", [
  nonWeekly,
  weekly,
])

export type SchedformPayload = z.infer<typeof SchedformSchema>


