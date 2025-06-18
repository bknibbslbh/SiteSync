import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogEntries, getSites } from '../utils/storage';
import { LogEntry, Site } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDateTime, getRelativeTime } from '../utils/formatters';
import { Building, Users, ClipboardCheck, Clock, Search, ArrowRight, Activity, QrCode } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load all log entries and sites
    const entries = getLogEntries();
    const allSites = getSites();
    
    setLogEntries(entries);
    setSites(allSites);
    setLoading(false);
  }, []);
  
  // Calculate dashboard stats
  const activeVisits = logEntries.filter((entry) => !entry.checkOutTime);
  const totalVisits = logEntries.length;
  const totalSites = sites.length;
  const recentEntries = [...logEntries]
    .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
    .slice(0, 5);
  
  // For demo, we'll calculate monthly visit trends
  const getMonthlyStats = () => {
    const currentDate = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = currentDate.getMonth();
    
    // Generate last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(monthNames[monthIndex]);
    }
    
    // Generate random counts for demo
    const counts = months.map(() => Math.floor(Math.random() * 30) + 5);
    
    return { months, counts };
  };
  
  const { months, counts } = getMonthlyStats();
  
  // Calculate max count for the bar chart
  const maxCount = Math.max(...counts);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/scan')}
              leftIcon={<QrCode size={18} />}
            >
              Scan QR Code
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-primary-50">
            <CardBody className="flex items-center p-6">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <Activity size={24} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Visits</p>
                <p className="text-2xl font-bold text-primary-800">{activeVisits.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-secondary-50">
            <CardBody className="flex items-center p-6">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <ClipboardCheck size={24} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Visits</p>
                <p className="text-2xl font-bold text-secondary-800">{totalVisits}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-accent-50">
            <CardBody className="flex items-center p-6">
              <div className="rounded-full bg-accent-100 p-3 mr-4">
                <Building size={24} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Managed Sites</p>
                <p className="text-2xl font-bold text-accent-800">{totalSites}</p>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/logbook')}
                  rightIcon={<ArrowRight size={16} />}
                >
                  View All
                </Button>
              </CardHeader>
              <CardBody className="p-0">
                {recentEntries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ClipboardCheck size={40} className="text-gray-400 mb-3" />
                    <p className="text-gray-600">No recent activity yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {recentEntries.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/logbook`)}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{entry.siteName}</h3>
                            <p className="text-sm text-gray-500">{entry.engineerName}</p>
                          </div>
                          <Badge 
                            variant={entry.checkOutTime ? 'success' : 'warning'} 
                            rounded
                          >
                            {entry.checkOutTime ? 'Completed' : 'Active'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{entry.purpose}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>{getRelativeTime(entry.checkInTime)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Monthly Visits Chart */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Monthly Visits</h2>
              </CardHeader>
              <CardBody>
                <div className="h-64 flex items-end space-x-2">
                  {months.map((month, index) => (
                    <div key={month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary-500 rounded-t-sm" 
                        style={{ 
                          height: `${(counts[index] / maxCount) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">{month}</div>
                      <div className="text-xs font-medium">{counts[index]}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/scan')}>
            <CardBody className="p-4 flex items-center">
              <div className="rounded-full bg-primary-100 p-2 mr-3">
                <QrCode size={20} className="text-primary-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Scan QR Code</h3>
                <p className="text-sm text-gray-600">Check in to a site</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/logbook')}>
            <CardBody className="p-4 flex items-center">
              <div className="rounded-full bg-secondary-100 p-2 mr-3">
                <ClipboardCheck size={20} className="text-secondary-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Logbook</h3>
                <p className="text-sm text-gray-600">See all site visits</p>
              </div>
            </CardBody>
          </Card>
          
          {currentUser?.role === 'admin' && (
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/admin')}>
              <CardBody className="p-4 flex items-center">
                <div className="rounded-full bg-accent-100 p-2 mr-3">
                  <Building size={20} className="text-accent-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Sites</h3>
                  <p className="text-sm text-gray-600">View and edit sites</p>
                </div>
              </CardBody>
            </Card>
          )}
          
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/team')}>
            <CardBody className="p-4 flex items-center">
              <div className="rounded-full bg-gray-100 p-2 mr-3">
                <Users size={20} className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Team Access</h3>
                <p className="text-sm text-gray-600">Manage user access</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;