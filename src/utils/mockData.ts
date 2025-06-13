import { Engineer, LogEntry, Site, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { format, subDays, subHours } from 'date-fns';

// Mock sites
export const mockSites: Site[] = [
  {
    id: uuidv4(),
    name: 'Downtown Office Building',
    address: '123 Main St, Downtown',
    qrCode: 'site_downtown_123',
  },
  {
    id: uuidv4(),
    name: 'North Manufacturing Plant',
    address: '456 Industrial Way, Northside',
    qrCode: 'site_north_456',
  },
  {
    id: uuidv4(),
    name: 'West Data Center',
    address: '789 Tech Blvd, Westside',
    qrCode: 'site_west_789',
  },
  {
    id: uuidv4(),
    name: 'South Retail Complex',
    address: '101 Commerce Ave, Southside',
    qrCode: 'site_south_101',
  },
];

// Mock engineers
export const mockEngineers: Engineer[] = [
  {
    id: uuidv4(),
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    company: 'ABC Engineering',
    role: 'HVAC Specialist',
    avatar: 'https://i.pravatar.cc/150?u=john',
  },
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '555-234-5678',
    company: 'XYZ Maintenance',
    role: 'Electrical Engineer',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: uuidv4(),
    name: 'David Garcia',
    email: 'david.garcia@example.com',
    phone: '555-345-6789',
    company: 'City Services',
    role: 'Plumbing Contractor',
    avatar: 'https://i.pravatar.cc/150?u=david',
  },
];

// Mock users
export const mockUsers: User[] = [
  {
    id: uuidv4(),
    name: 'Admin User',
    email: 'admin@sitesync.live',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: uuidv4(),
    name: 'Manager User',
    email: 'manager@sitesync.live',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?u=manager',
  },
  ...mockEngineers.map((engineer) => ({
    id: engineer.id,
    name: engineer.name,
    email: engineer.email,
    role: 'engineer' as const,
    avatar: engineer.avatar,
  })),
];

// Generate random dates for log entries
const getRandomPastDate = (daysAgo: number): string => {
  return format(subDays(new Date(), daysAgo), "yyyy-MM-dd'T'HH:mm:ss");
};

const getRandomCheckOutTime = (checkInTime: string, hoursLater: number): string => {
  const checkInDate = new Date(checkInTime);
  return format(
    new Date(checkInDate.setHours(checkInDate.getHours() + hoursLater)),
    "yyyy-MM-dd'T'HH:mm:ss"
  );
};

// Mock log entries
export const mockLogEntries: LogEntry[] = [
  {
    id: uuidv4(),
    siteId: mockSites[0].id,
    siteName: mockSites[0].name,
    engineerId: mockEngineers[0].id,
    engineerName: mockEngineers[0].name,
    checkInTime: getRandomPastDate(5),
    checkOutTime: getRandomCheckOutTime(getRandomPastDate(5), 3),
    purpose: 'Quarterly HVAC maintenance',
    notes: 'Replaced filters and cleaned condenser coils. System functioning optimally.',
    workCompleted: true,
  },
  {
    id: uuidv4(),
    siteId: mockSites[1].id,
    siteName: mockSites[1].name,
    engineerId: mockEngineers[1].id,
    engineerName: mockEngineers[1].name,
    checkInTime: getRandomPastDate(3),
    checkOutTime: getRandomCheckOutTime(getRandomPastDate(3), 4),
    purpose: 'Electrical system inspection',
    notes: 'Found and repaired loose connection in panel B. Recommended upgrade for outdated circuit breakers.',
    workCompleted: true,
  },
  {
    id: uuidv4(),
    siteId: mockSites[2].id,
    siteName: mockSites[2].name,
    engineerId: mockEngineers[2].id,
    engineerName: mockEngineers[2].name,
    checkInTime: getRandomPastDate(1),
    checkOutTime: getRandomCheckOutTime(getRandomPastDate(1), 2),
    purpose: 'Emergency plumbing repair',
    notes: 'Fixed leak in main water line. Pressure tested system after repair.',
    workCompleted: true,
  },
  {
    id: uuidv4(),
    siteId: mockSites[0].id,
    siteName: mockSites[0].name,
    engineerId: mockEngineers[1].id,
    engineerName: mockEngineers[1].name,
    checkInTime: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    purpose: 'Light fixture replacement',
    notes: 'In progress - replacing outdated fluorescent fixtures with LED panels.',
    workCompleted: false,
  },
];

// Current user for demo purposes
export const currentUser: User = mockUsers[0];