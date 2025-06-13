import { LogEntry, Site, User } from '../types';
import { mockLogEntries, mockSites, mockUsers } from './mockData';

// Local storage keys
const SITES_KEY = 'sitesync_sites';
const LOG_ENTRIES_KEY = 'sitesync_log_entries';
const USERS_KEY = 'sitesync_users';
const CURRENT_USER_KEY = 'sitesync_current_user';

// Initialize storage with mock data if empty
const initStorage = () => {
  if (!localStorage.getItem(SITES_KEY)) {
    localStorage.setItem(SITES_KEY, JSON.stringify(mockSites));
  }

  if (!localStorage.getItem(LOG_ENTRIES_KEY)) {
    localStorage.setItem(LOG_ENTRIES_KEY, JSON.stringify(mockLogEntries));
  }

  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }
};

// Sites CRUD operations
export const getSites = (): Site[] => {
  initStorage();
  return JSON.parse(localStorage.getItem(SITES_KEY) || '[]');
};

export const getSiteById = (id: string): Site | undefined => {
  const sites = getSites();
  return sites.find((site) => site.id === id);
};

export const getSiteByQrCode = (qrCode: string): Site | undefined => {
  const sites = getSites();
  return sites.find((site) => site.qrCode === qrCode);
};

export const addSite = (site: Site): void => {
  const sites = getSites();
  sites.push(site);
  localStorage.setItem(SITES_KEY, JSON.stringify(sites));
};

export const updateSite = (updatedSite: Site): void => {
  const sites = getSites();
  const index = sites.findIndex((site) => site.id === updatedSite.id);
  if (index !== -1) {
    sites[index] = updatedSite;
    localStorage.setItem(SITES_KEY, JSON.stringify(sites));
  }
};

export const deleteSite = (id: string): void => {
  const sites = getSites();
  const filteredSites = sites.filter((site) => site.id !== id);
  localStorage.setItem(SITES_KEY, JSON.stringify(filteredSites));
};

// Log entries CRUD operations
export const getLogEntries = (): LogEntry[] => {
  initStorage();
  return JSON.parse(localStorage.getItem(LOG_ENTRIES_KEY) || '[]');
};

export const getLogEntryById = (id: string): LogEntry | undefined => {
  const entries = getLogEntries();
  return entries.find((entry) => entry.id === id);
};

export const getLogEntriesBySite = (siteId: string): LogEntry[] => {
  const entries = getLogEntries();
  return entries.filter((entry) => entry.siteId === siteId);
};

export const getLogEntriesByEngineer = (engineerId: string): LogEntry[] => {
  const entries = getLogEntries();
  return entries.filter((entry) => entry.engineerId === engineerId);
};

export const addLogEntry = (entry: LogEntry): void => {
  const entries = getLogEntries();
  entries.push(entry);
  localStorage.setItem(LOG_ENTRIES_KEY, JSON.stringify(entries));
};

export const updateLogEntry = (updatedEntry: LogEntry): void => {
  const entries = getLogEntries();
  const index = entries.findIndex((entry) => entry.id === updatedEntry.id);
  if (index !== -1) {
    entries[index] = updatedEntry;
    localStorage.setItem(LOG_ENTRIES_KEY, JSON.stringify(entries));
  }
};

export const deleteLogEntry = (id: string): void => {
  const entries = getLogEntries();
  const filteredEntries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(LOG_ENTRIES_KEY, JSON.stringify(filteredEntries));
};

// Users operations
export const getUsers = (): User[] => {
  initStorage();
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Initialize storage on load
initStorage();