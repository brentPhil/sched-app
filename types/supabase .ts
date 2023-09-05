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
          faculty_id: string | null
          id: number
          room_id: number | null
          schedule_date: string
          subject_id: number | null
          time_from: string
          time_to: string
        }
        Insert: {
          course_id?: number | null
          created_at?: string | null
          faculty_id?: string | null
          id?: never
          room_id?: number | null
          schedule_date: string
          subject_id?: number | null
          time_from: string
          time_to: string
        }
        Update: {
          course_id?: number | null
          created_at?: string | null
          faculty_id?: string | null
          id?: never
          room_id?: number | null
          schedule_date?: string
          subject_id?: number | null
          time_from?: string
          time_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
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
      subjects: {
        Row: {
          created_at: string | null
          description: string
          id: number
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: never
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: never
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          contact_no: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: number | null
          username: string | null
        }
        Insert: {
          address?: string | null
          contact_no?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: number | null
          username?: string | null
        }
        Update: {
          address?: string | null
          contact_no?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
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
