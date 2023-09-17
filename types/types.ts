export interface Subjects {
  created_at: string | null
  description: string
  id: number
  subject: string
  updated_at: string | null
}

export interface Course {
  course: string
  created_at: string | null
  description: string
  id: number
  updated_at: string | null
}
export interface Room {
  course: string
  created_at: string | null
  description: string
  id: number
  updated_at: string | null
}

export interface faculty {
  address: string | null
  contact_no: string | null
  email: string | null
  last_name: string | null
  first_name: string | null
  middle_initial: string
  id: string
  role: number | null
  updated_at: string | null
  username: string | null
  avatar_url: string
}
export interface Sched {
  course_id: number | null
  created_at: string | null
  daysOfWeek: string | null
  faculty_id: string | null
  from_month: string | null
  id: number
  room_id: number | null
  sched_desc: string | null
  sched_type: string | null
  subject_id: number | null
  time_from: string
  time_to: string
  to_month: string | null
  updated_at: string | null
}

export interface Schedule {
  id: number
  time_from: string | null
  time_to: string | null
  created_at: string | null
  subject_id: number | null
  room_id: number | null
  course_id: number | null
  faculty_id: string | null
  from_month: string | null
  to_month: string | null
  sched_type: string | null
  updated_at: string | null
  daysOfWeek: string | null
  subjects: {
    id: number
    subject: string
    description: string | null
    updated_at?: string | null
    created_at: string | null
  }
  rooms: {
    created_at: string
    description: string | null
    id: number
    room: string | null
    updated_at: string | null
  }
  courses: {
    id: number
    course: string
    description?: string | null
    created_at: string | null
    updated_at?: string | null
  }
  users: {
    id: string
    avatar_url: string
    email: string | null
    first_name: string | null
    last_name: string | null
    address?: string | null
    contact_no?: string | null
    username?: string | null
    role?: number | null
    updated_at?: string | null
    middle_initial?: string | null
  }
}
