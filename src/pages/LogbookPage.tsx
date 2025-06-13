import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogEntries } from '../utils/storage';
import { LogEntry, SortConfig, SortDirection } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import LogEntryCard from '../components/logbook/LogEntryCard';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Search, ClipboardList, SortAsc, SortDesc, Filter } from 'lucide-react';

const LogbookPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'completed'
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'checkInTime',
    direction: 'desc',
  });
  
  useEffect(() => {
    // Load all log entries
    const entries = getLogEntries();
    setLogEntries(entries);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // Apply filters and search
    let filtered = [...logEntries];
    
    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter((entry) => !entry.checkOutTime);
    } else if (filterStatus === 'completed') {
      filtered = filtered.filter((entry) => !!entry.checkOutTime);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.siteName.toLowerCase().includes(query) ||
          entry.engineerName.toLowerCase().includes(query) ||
          entry.purpose.toLowerCase().includes(query) ||
          (entry.notes && entry.notes.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof LogEntry];
      const bValue = b[sortConfig.key as keyof LogEntry];
      
      if (!aValue || !bValue) return 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setFilteredEntries(filtered);
  }, [logEntries, searchQuery, filterStatus, sortConfig]);
  
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  const handleLogEntryClick = (entry: LogEntry) => {
    // If entry is active (no checkout time), navigate to checkout page
    if (!entry.checkOutTime) {
      navigate(`/check-out/${entry.id}`);
    } else {
      // If already checked out, could navigate to a details view
      // For now, we'll just do nothing
    }
  };
  
  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'asc' ? (
      <SortAsc size={16} className="ml-1" />
    ) : (
      <SortDesc size={16} className="ml-1" />
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Site Logbook</h1>
            <p className="text-gray-600">View and manage site visits</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/scan')}
              leftIcon={<Search size={18} />}
            >
              Scan to Check In
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="Search sites, engineers, or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} className="text-gray-400" />}
              fullWidth
              className="md:max-w-xs"
            />
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-grow">
              <Select
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active Visits' },
                  { value: 'completed', label: 'Completed Visits' },
                ]}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                fullWidth
                className="sm:max-w-xs"
              />
              
              <div className="flex space-x-2 ml-auto">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('checkInTime')}
                  className="flex items-center"
                >
                  Date
                  {renderSortIcon('checkInTime')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('siteName')}
                  className="flex items-center"
                >
                  Site
                  {renderSortIcon('siteName')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredEntries.length === 0 ? (
          <EmptyState
            title="No log entries found"
            description={
              searchQuery || filterStatus !== 'all'
                ? "Try adjusting your filters or search query"
                : "Start by checking in to a site"
            }
            icon={<ClipboardList size={48} className="text-gray-400" />}
            actionLabel="Scan QR Code"
            onAction={() => navigate('/scan')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <LogEntryCard 
                key={entry.id} 
                entry={entry} 
                onClick={() => handleLogEntryClick(entry)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LogbookPage;