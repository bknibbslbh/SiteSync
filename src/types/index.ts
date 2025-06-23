export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  settings: OrganizationSettings;
  subscription_status: 'active' | 'inactive' | 'trialing' | 'past_due' | 'canceled';
  subscription_plan: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationSettings {
  branding: {
    primary_color: string;
    logo_url: string | null;
    custom_domain: string | null;
  };
  features: {
    analytics: boolean;
    api_access: boolean;
    white_label: boolean;
    sso: boolean;
    audit_logs: boolean;
  };
  notifications: {
    email_reports: boolean;
    slack_webhook: string | null;
    webhook_url: string | null;
  };
  security: {
    require_2fa: boolean;
    session_timeout: number;
    ip_whitelist: string[];
  };
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'manager' | 'member';
  invited_by: string | null;
  invited_at: string | null;
  joined_at: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  organization_id: string;
  name: string;
  address: string;
  qr_code: string;
  settings: SiteSettings;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  location: {
    latitude: number | null;
    longitude: number | null;
    radius: number; // meters for location verification
  };
  access: {
    require_approval: boolean;
    allowed_roles: string[];
    restricted_hours: {
      start: string | null;
      end: string | null;
    };
  };
  notifications: {
    check_in_alerts: boolean;
    overdue_alerts: boolean;
    alert_recipients: string[];
  };
}

export interface LogEntry {
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
}

export interface ApiKey {
  id: string;
  organization_id: string;
  name: string;
  key_hash: string;
  permissions: ApiPermission[];
  last_used_at: string | null;
  expires_at: string | null;
  created_by: string;
  created_at: string;
}

export type ApiPermission = 
  | 'sites:read'
  | 'sites:write'
  | 'log_entries:read'
  | 'log_entries:write'
  | 'users:read'
  | 'analytics:read';

export interface AuditLog {
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
}

export interface AnalyticsData {
  total_visits: number;
  active_visits: number;
  total_sites: number;
  total_users: number;
  avg_visit_duration: number;
  visits_by_day: Array<{
    date: string;
    count: number;
  }>;
  visits_by_site: Array<{
    site_name: string;
    count: number;
  }>;
  visits_by_user: Array<{
    user_name: string;
    count: number;
  }>;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    users: number; // -1 for unlimited
    sites: number; // -1 for unlimited
    api_calls: number;
  };
  popular?: boolean;
}

export interface SubscriptionUsage {
  users: {
    current: number;
    limit: number;
  };
  sites: {
    current: number;
    limit: number;
  };
  api_calls: {
    current: number;
    limit: number;
    period_start: string;
    period_end: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'communication' | 'analytics' | 'security';
  status: 'available' | 'connected' | 'error';
  config?: any;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  timestamp: string;
  organization_id: string;
}

// Form validation schemas
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpForm {
  email: string;
  password: string;
  full_name: string;
  organization_name: string;
  terms_accepted: boolean;
}

export interface SiteForm {
  name: string;
  address: string;
  settings?: Partial<SiteSettings>;
}

export interface CheckInForm {
  purpose: string;
  notes?: string;
}

export interface CheckOutForm {
  notes?: string;
  work_completed: boolean;
  images?: File[];
}

export interface InviteUserForm {
  email: string;
  role: OrganizationMember['role'];
  message?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Utility types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface FilterConfig {
  [key: string]: any;
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}