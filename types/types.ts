
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
}
