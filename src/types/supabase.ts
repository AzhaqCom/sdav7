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
      armies: {
        Row: {
          id: number
          name: string
          created_at: string
         
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
      }
      figurines: {
        Row: {
          id: number
          army_id: number
          name: string
          points: number
          created_at: string
        }
        Insert: {
          id?: number
          army_id: number
          name: string
          points: number
          created_at?: string
        }
        Update: {
          id?: number
          army_id?: number
          name?: string
          points?: number
          created_at?: string
        }
      }
      actions_heroiques: {
        Row: {
          id: number
          nom: string
          effet:string
          created_at: string
         
        }
        Insert: {
          id?: number
          name: string
          effet:string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          effet?:string
          created_at?: string
        }
      }
    }
  }
}