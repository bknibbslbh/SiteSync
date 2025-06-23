import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { Users, Building, Zap } from 'lucide-react';

const UsageMetrics: React.FC = () => {
  const { usage, subscription } = useSubscription();

  if (!usage) return null;

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const formatLimit = (limit: number) => {
    return limit === -1 ? 'Unlimited' : limit.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Users Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Team Members</h3>
          <Users size={16} className="text-gray-500" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{usage.users.current}</div>
          <p className="text-xs text-gray-500">
            of {formatLimit(usage.users.limit)} members
          </p>
          {usage.users.limit !== -1 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Usage</span>
                <span>{Math.round(getUsagePercentage(usage.users.current, usage.users.limit))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getUsagePercentage(usage.users.current, usage.users.limit) >= 90
                      ? 'bg-red-500'
                      : getUsagePercentage(usage.users.current, usage.users.limit) >= 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.users.current, usage.users.limit)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Sites Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Sites</h3>
          <Building size={16} className="text-gray-500" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{usage.sites.current}</div>
          <p className="text-xs text-gray-500">
            of {formatLimit(usage.sites.limit)} sites
          </p>
          {usage.sites.limit !== -1 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Usage</span>
                <span>{Math.round(getUsagePercentage(usage.sites.current, usage.sites.limit))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getUsagePercentage(usage.sites.current, usage.sites.limit) >= 90
                      ? 'bg-red-500'
                      : getUsagePercentage(usage.sites.current, usage.sites.limit) >= 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.sites.current, usage.sites.limit)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* API Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">API Calls</h3>
          <Zap size={16} className="text-gray-500" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{usage.api_calls.current.toLocaleString()}</div>
          <p className="text-xs text-gray-500">
            of {formatLimit(usage.api_calls.limit)} this month
          </p>
          {usage.api_calls.limit !== -1 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Usage</span>
                <span>{Math.round(getUsagePercentage(usage.api_calls.current, usage.api_calls.limit))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getUsagePercentage(usage.api_calls.current, usage.api_calls.limit) >= 90
                      ? 'bg-red-500'
                      : getUsagePercentage(usage.api_calls.current, usage.api_calls.limit) >= 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.api_calls.current, usage.api_calls.limit)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UsageMetrics;