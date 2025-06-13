import { format, formatDistance, parseISO } from 'date-fns';

// Format date/time for display
export const formatDateTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
  } catch (error) {
    return 'Invalid date';
  }
};

// Format date only
export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (error) {
    return 'Invalid date';
  }
};

// Format time only
export const formatTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'h:mm a');
  } catch (error) {
    return 'Invalid time';
  }
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (dateString: string): string => {
  try {
    return formatDistance(parseISO(dateString), new Date(), { addSuffix: true });
  } catch (error) {
    return 'Unknown time';
  }
};

// Calculate duration between two timestamps
export const calculateDuration = (startTime: string, endTime?: string): string => {
  try {
    if (!endTime) return 'In progress';
    
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    const durationMs = end.getTime() - start.getTime();
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    }
    
    return `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
  } catch (error) {
    return 'Invalid duration';
  }
};