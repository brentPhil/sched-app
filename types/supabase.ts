export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          course: string
          created_at: string | null
          description: string
          id: number
          updated_at: string | null
        }
        Insert: {
          course: string
          created_at?: string | null
          description: string
          id?: never
          updated_at?: string | null
        }
        Update: {
          course?: string
          created_at?: string | null
          description?: string
          id?: never
          updated_at?: string | null
        }
        Relationships: []
      }
      days_of_weak: {
        Row: {
          day: string | null
          id: number
          sched_id: number | null
        }
        Insert: {
          day?: string | null
          id?: number
          sched_id?: number | null
        }
        Update: {
          day?: string | null
          id?: number
          sched_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "days_of_weak_sched_id_fkey"
            columns: ["sched_id"]
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          created_at: string
          description: string | null
          id: number
          room: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          room?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          room?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      schedules: {
        Row: {
          course_id: number | null
          created_at: string | null
          date: string | null
          daysOfWeek: string | null
          faculty_id: string | null
          from_month: string | null
          id: number
          room_id: number | null
          sched_type: string | null
          section_id: number | null
          subject_id: number | null
          time_from: string
          time_to: string
          to_month: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string | null
          date?: string | null
          daysOfWeek?: string | null
          faculty_id?: string | null
          from_month?: string | null
          id?: never
          room_id?: number | null
          sched_type?: string | null
          section_id?: number | null
          subject_id?: number | null
          time_from: string
          time_to: string
          to_month?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string | null
          date?: string | null
          daysOfWeek?: string | null
          faculty_id?: string | null
          from_month?: string | null
          id?: never
          room_id?: number | null
          sched_type?: string | null
          section_id?: number | null
          subject_id?: number | null
          time_from?: string
          time_to?: string
          to_month?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_faculty_id_fkey"
            columns: ["faculty_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      sections: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      status: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          uid: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          uid?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          uid?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string | null
          description: string
          id: number
          subject: string
          units: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: never
          subject: string
          units?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: never
          subject?: string
          units?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          avatar_url: string | null
          contact_no: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_initial: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          contact_no?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          middle_initial?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          contact_no?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_initial?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            referencedRelation: "roles"
            referencedColumns: ["name"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
