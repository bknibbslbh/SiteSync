import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Loading from '../ui/Loading';
import { TrendingUp, Users, Building, Clock, Activity } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const { data: analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Loading analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load analytics data</p>
      </div>
    );
  }

  if (!analytics) return null;

  const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardBody className="flex items-center p-4">
            <div className="rounded-full bg-blue-500 p-3 mr-4">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Visits</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.total_visits}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardBody className="flex items-center p-4">
            <div className="rounded-full bg-green-500 p-3 mr-4">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Active Visits</p>
              <p className="text-2xl font-bold text-green-900">{analytics.active_visits}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardBody className="flex items-center p-4">
            <div className="rounded-full bg-yellow-500 p-3 mr-4">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-yellow-700 font-medium">Total Sites</p>
              <p className="text-2xl font-bold text-yellow-900">{analytics.total_sites}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardBody className="flex items-center p-4">
            <div className="rounded-full bg-purple-500 p-3 mr-4">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Team Members</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.total_users}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardBody className="flex items-center p-4">
            <div className="rounded-full bg-indigo-500 p-3 mr-4">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-700 font-medium">Avg Duration</p>
              <p className="text-2xl font-bold text-indigo-900">{analytics.avg_visit_duration}m</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits by Day */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Visits Over Time</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.visits_by_day}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  dot={{ fill: '#0EA5E9' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Visits by Site */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Visits by Site</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.visits_by_site}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ site_name, percent }) => `${site_name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.visits_by_site.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Top Users */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Most Active Users</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.visits_by_user.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="user_name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Site Activity */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Site Activity</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.visits_by_site}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="site_name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;