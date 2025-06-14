export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          permissions: string[] | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: string[] | null
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: string[] | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      booking_status_history: {
        Row: {
          booking_id: number | null
          changed_at: string
          changed_by: string | null
          id: string
          new_status: string | null
          notes: string | null
          old_status: string | null
        }
        Insert: {
          booking_id?: number | null
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status?: string | null
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          booking_id?: number | null
          changed_at?: string
          changed_by?: string | null
          id?: string
          new_status?: string | null
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_status_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string | null
          booking_time: string | null
          business_id: string | null
          business_response: string | null
          business_type: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          confirmation_code: string | null
          confirmed_at: string | null
          created_at: string
          duration_minutes: number | null
          id: number
          notes: string | null
          payment_status: string | null
          response_at: string | null
          status: string | null
          total_amount: number | null
          trainer_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date?: string | null
          booking_time?: string | null
          business_id?: string | null
          business_response?: string | null
          business_type?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmation_code?: string | null
          confirmed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: number
          notes?: string | null
          payment_status?: string | null
          response_at?: string | null
          status?: string | null
          total_amount?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string | null
          booking_time?: string | null
          business_id?: string | null
          business_response?: string | null
          business_type?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmation_code?: string | null
          confirmed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: number
          notes?: string | null
          payment_status?: string | null
          response_at?: string | null
          status?: string | null
          total_amount?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_documents: {
        Row: {
          business_id: string | null
          document_type: string
          document_url: string
          id: string
          status: string | null
          uploaded_at: string | null
          verified_at: string | null
        }
        Insert: {
          business_id?: string | null
          document_type: string
          document_url: string
          id?: string
          status?: string | null
          uploaded_at?: string | null
          verified_at?: string | null
        }
        Update: {
          business_id?: string | null
          document_type?: string
          document_url?: string
          id?: string
          status?: string | null
          uploaded_at?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          address: string
          amenities: string[] | null
          business_name: string
          business_type: string
          category: string
          city: string
          closing_time: string
          created_at: string | null
          description: string | null
          email: string
          id: string
          image_urls: string[] | null
          monthly_price: number | null
          opening_time: string
          phone: string
          pin_code: string
          session_price: number | null
          state: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          business_name: string
          business_type: string
          category: string
          city: string
          closing_time: string
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          image_urls?: string[] | null
          monthly_price?: number | null
          opening_time: string
          phone: string
          pin_code: string
          session_price?: number | null
          state: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          business_name?: string
          business_type?: string
          category?: string
          city?: string
          closing_time?: string
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          image_urls?: string[] | null
          monthly_price?: number | null
          opening_time?: string
          phone?: string
          pin_code?: string
          session_price?: number | null
          state?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      business_stats: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          leads_received: number | null
          leads_this_month: number | null
          monthly_revenue: number | null
          profile_visits: number | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          leads_received?: number | null
          leads_this_month?: number | null
          monthly_revenue?: number | null
          profile_visits?: number | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          leads_received?: number | null
          leads_this_month?: number | null
          monthly_revenue?: number | null
          profile_visits?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_stats_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          booking_id: number | null
          business_id: string | null
          created_at: string
          description: string | null
          end_time: string
          event_type: string | null
          id: string
          start_time: string
          title: string
          trainer_id: string | null
          user_id: string
        }
        Insert: {
          booking_id?: number | null
          business_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          event_type?: string | null
          id?: string
          start_time: string
          title: string
          trainer_id?: string | null
          user_id: string
        }
        Update: {
          booking_id?: number | null
          business_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          event_type?: string | null
          id?: string
          start_time?: string
          title?: string
          trainer_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          chat_room_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          sender_id: string
        }
        Insert: {
          chat_room_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          sender_id: string
        }
        Update: {
          chat_room_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_room_id_fkey"
            columns: ["chat_room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          business_id: string | null
          created_at: string
          id: string
          room_type: string | null
          status: string | null
          trainer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          id?: string
          room_type?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_id?: string | null
          created_at?: string
          id?: string
          room_type?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customer_inquiries: {
        Row: {
          business_id: string | null
          created_at: string | null
          email: string | null
          id: string
          message: string
          phone: string | null
          responded_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          message: string
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string
          phone?: string | null
          responded_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_inquiries_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_bookings: boolean | null
          email_confirmations: boolean | null
          email_reminders: boolean | null
          id: string
          sms_bookings: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_bookings?: boolean | null
          email_confirmations?: boolean | null
          email_reminders?: boolean | null
          id?: string
          sms_bookings?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_bookings?: boolean | null
          email_confirmations?: boolean | null
          email_reminders?: boolean | null
          id?: string
          sms_bookings?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          recipient_email: string
          sent_at: string | null
          status: string | null
          subject: string
          template: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          subject: string
          template: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          subject?: string
          template?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          booking_date: string | null
          booking_time: string | null
          business_id: string | null
          created_at: string
          currency: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          payment_status: string | null
          service_type: string | null
          status: string | null
          stripe_session_id: string | null
          trainer_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_date?: string | null
          booking_time?: string | null
          business_id?: string | null
          created_at?: string
          currency?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          service_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          trainer_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_date?: string | null
          booking_time?: string | null
          business_id?: string | null
          created_at?: string
          currency?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          service_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          trainer_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          business_id: string | null
          business_type: string | null
          comment: string | null
          created_at: string
          id: number
          rating: number | null
          trainer_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          business_type?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          business_type?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      search_filters: {
        Row: {
          business_type: string | null
          created_at: string
          filter_name: string
          filters: Json
          id: string
          is_default: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_type?: string | null
          created_at?: string
          filter_name: string
          filters: Json
          id?: string
          is_default?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_type?: string | null
          created_at?: string
          filter_name?: string
          filters?: Json
          id?: string
          is_default?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      spas: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      trainer_profiles: {
        Row: {
          bio: string
          category: string
          certifications: string | null
          created_at: string | null
          email: string
          experience: number
          hourly_rate: number
          id: string
          location: string
          name: string
          phone: string
          profile_image_url: string | null
          specializations: string[] | null
          status: string | null
          trainer_tier: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio: string
          category: string
          certifications?: string | null
          created_at?: string | null
          email: string
          experience: number
          hourly_rate: number
          id?: string
          location: string
          name: string
          phone: string
          profile_image_url?: string | null
          specializations?: string[] | null
          status?: string | null
          trainer_tier: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string
          category?: string
          certifications?: string | null
          created_at?: string | null
          email?: string
          experience?: number
          hourly_rate?: number
          id?: string
          location?: string
          name?: string
          phone?: string
          profile_image_url?: string | null
          specializations?: string[] | null
          status?: string | null
          trainer_tier?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trainers: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          pin_code: string | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          pin_code?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          pin_code?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_wishlist: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_wishlist_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      yoga_studios: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_booking_status: {
        Args: {
          booking_id_param: number
          new_status_param: string
          user_id_param?: string
          notes_param?: string
        }
        Returns: undefined
      }
      update_business_profile_visit: {
        Args: { business_profile_id: string }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "business_owner" | "end_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["business_owner", "end_user"],
    },
  },
} as const
