import React from 'react';
import { LogEntry } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDateTime, calculateDuration } from '../../utils/formatters';
import { ClipboardCheck, Clock, AlertCircle } from 'lucide-react';

interface LogEntryCardProps {
  entry: LogEntry;
  onClick?: () => void;
}

const LogEntryCard: React.FC<LogEntryCardProps> = ({ entry, onClick }) => {
  const isActive = !entry.checkOutTime;
  
  return (
    <Card hover={!!onClick} onClick={onClick} className="h-full">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900">{entry.siteName}</h3>
            <p className="text-sm text-gray-500">{entry.engineerName}</p>
          </div>
          <Badge 
            variant={isActive ? 'warning' : 'success'} 
            rounded
          >
            {isActive ? 'Active' : 'Completed'}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-700 mb-3">{entry.purpose}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>Check-in: {formatDateTime(entry.checkInTime)}</span>
          </div>
          
          {entry.checkOutTime ? (
            <div className="flex items-center text-gray-600">
              <ClipboardCheck size={16} className="mr-2" />
              <span>Check-out: {formatDateTime(entry.checkOutTime)}</span>
            </div>
          ) : (
            <div className="flex items-center text-warning-700">
              <AlertCircle size={16} className="mr-2" />
              <span>Currently on site</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Duration: {calculateDuration(entry.checkInTime, entry.checkOutTime)}</span>
          </div>
        </div>
        
        {entry.notes && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
            <p className="text-sm text-gray-700">{entry.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LogEntryCard;