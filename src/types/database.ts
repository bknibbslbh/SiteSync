export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          owner_id: string;
          settings: any;
          subscription_status: string;
          subscription_plan: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          owner_id: string;
          settings?: any;
          subscription_status?: string;
          subscription_plan?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          owner_id?: string;
          settings?: any;
          subscription_status?: string;
          subscription_plan?: string | null;
          stripe_customer_id?: string | null;
          updated_at?: string;
        };
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: string;
          invited_by: string | null;
          invited_at: string | null;
          joined_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role: string;
          invited_by?: string | null;
          invited_at?: string | null;
          joined_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          role?: string;
          invited_by?: string | null;
          invited_at?: string | null;
          joined_at?: string | null;
        };
      };
      sites: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          address: string;
          qr_code: string;
          settings: any;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          address: string;
          qr_code: string;
          settings?: any;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          address?: string;
          qr_code?: string;
          settings?: any;
          updated_at?: string;
        };
      };
      log_entries: {
        Row: {
          id: string;
          organization_id: string;
          site_id: string;
          user_id: string;
          check_in_time: string;
          check_out_time: string | null;
          purpose: string;
          notes: string | null;
          work_completed: boolean;
          location_verified: boolean;
          images: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          site_id: string;
          user_id: string;
          check_in_time: string;
          check_out_time?: string | null;
          purpose: string;
          notes?: string | null;
          work_completed?: boolean;
          location_verified?: boolean;
          images?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          site_id?: string;
          user_id?: string;
          check_in_time?: string;
          check_out_time?: string | null;
          purpose?: string;
          notes?: string | null;
          work_completed?: boolean;
          location_verified?: boolean;
          images?: string[] | null;
          updated_at?: string;
        };
      };
      api_keys: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          key_hash: string;
          permissions: string[];
          last_used_at: string | null;
          expires_at: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          key_hash: string;
          permissions: string[];
          last_used_at?: string | null;
          expires_at?: string | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          key_hash?: string;
          permissions?: string[];
          last_used_at?: string | null;
          expires_at?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          action: string;
          resource_type: string;
          resource_id: string | null;
          metadata: any;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          metadata?: any;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          metadata?: any;
          ip_address?: string | null;
          user_agent?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}