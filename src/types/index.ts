export interface Site {
  id: string;
  name: string;
  address: string;
  qrCode: string;
}

export interface LogEntry {
  id: string;
  siteId: string;
  siteName: string;
  engineerId: string;
  engineerName: string;
  checkInTime: string;
  checkOutTime?: string;
  purpose: string;
  notes?: string;
  images?: string[];
  workCompleted: boolean;
}

export interface Engineer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'engineer' | 'manager';
  avatar?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}