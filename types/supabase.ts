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
      class_schedule_info: {
        Row: {
          course_id: number
          id: number
          schedule_id: number
          subject: number
        }
        Insert: {
          course_id: number
          id?: never
          schedule_id: number
          subject: number
        }
        Update: {
          course_id?: number
          id?: never
          schedule_id?: number
          subject?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          course: string
          description: string
          id: number
        }
        Insert: {
          course: string
          description: string
          id?: never
        }
        Update: {
          course?: string
          description?: string
          id?: never
        }
        Relationships: []
      }
      faculty: {
        Row: {
          address: string
          contact: string
          email: string
          firstname: string
          gender: string
          id: number
          id_no: string
          lastname: string
          middlename: string
        }
        Insert: {
          address: string
          contact: string
          email: string
          firstname: string
          gender: string
          id?: never
          id_no: string
          lastname: string
          middlename: string
        }
        Update: {
          address?: string
          contact?: string
          email?: string
          firstname?: string
          gender?: string
          id?: never
          id_no?: string
          lastname?: string
          middlename?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      schedules: {
        Row: {
          date_created: string | null
          description: string
          faculty_id: number
          id: number
          is_repeating: number
          location: string
          repeating_data: string
          schedule_date: string
          schedule_type: number
          time_from: string
          time_to: string
          title: string
        }
        Insert: {
          date_created?: string | null
          description: string
          faculty_id: number
          id?: never
          is_repeating?: number
          location: string
          repeating_data: string
          schedule_date: string
          schedule_type?: number
          time_from: string
          time_to: string
          title: string
        }
        Update: {
          date_created?: string | null
          description?: string
          faculty_id?: number
          id?: never
          is_repeating?: number
          location?: string
          repeating_data?: string
          schedule_date?: string
          schedule_type?: number
          time_from?: string
          time_to?: string
          title?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          description: string
          id: number
          subject: string
        }
        Insert: {
          description: string
          id?: never
          subject: string
        }
        Update: {
          description?: string
          id?: never
          subject?: string
        }
        Relationships: []
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
