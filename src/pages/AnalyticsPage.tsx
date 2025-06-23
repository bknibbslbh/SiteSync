import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Download, Calendar, Filter } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleExport = () => {
    // Implementation for exporting analytics data
    console.log(`Exporting analytics as ${exportFormat} for last ${dateRange} days`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Insights and metrics for your organization</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Select
              options={[
                { value: '7', label: 'Last 7 days' },
                { value: '30', label: 'Last 30 days' },
                { value: '90', label: 'Last 90 days' },
                { value: '365', label: 'Last year' },
              ]}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
            <Button
              variant="ghost"
              leftIcon={<Download size={18} />}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>

        <AnalyticsDashboard />

        {/* Additional Analytics Features */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Compliance Reports</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Generate detailed compliance reports for audits and regulatory requirements.
              </p>
              <div className="space-y-3">
                <Button variant="ghost" fullWidth className="justify-start">
                  <Calendar size={18} className="mr-2" />
                  Monthly Compliance Report
                </Button>
                <Button variant="ghost" fullWidth className="justify-start">
                  <Filter size={18} className="mr-2" />
                  Site Activity Summary
                </Button>
                <Button variant="ghost" fullWidth className="justify-start">
                  <Download size={18} className="mr-2" />
                  Audit Trail Export
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Set up automated reports to be delivered to your email.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Summary</p>
                    <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
                  </div>
                  <Button size="sm" variant="ghost">Edit</Button>
                </div>
                <Button variant="ghost" fullWidth>
                  + Add New Report
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;