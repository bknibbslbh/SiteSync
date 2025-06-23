import { create } from 'zustand';
import { Notification } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = uuidv4();
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (newNotification.duration !== Infinity) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },
}));

// Convenience functions
export const notify = {
  success: (title: string, message?: string) =>
    useNotificationStore.getState().addNotification({
      type: 'success',
      title,
      message: message || '',
    }),
  
  error: (title: string, message?: string) =>
    useNotificationStore.getState().addNotification({
      type: 'error',
      title,
      message: message || '',
    }),
  
  warning: (title: string, message?: string) =>
    useNotificationStore.getState().addNotification({
      type: 'warning',
      title,
      message: message || '',
    }),
  
  info: (title: string, message?: string) =>
    useNotificationStore.getState().addNotification({
      type: 'info',
      title,
      message: message || '',
    }),
};