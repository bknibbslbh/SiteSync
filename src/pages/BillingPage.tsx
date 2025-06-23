import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import Layout from '../components/layout/Layout';
import PricingPlans from '../components/billing/PricingPlans';
import UsageMetrics from '../components/billing/UsageMetrics';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CreditCard, Download, Settings } from 'lucide-react';

const BillingPage: React.FC = () => {
  const { subscription, manageBilling, isLoading } = useSubscription();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600">Manage your subscription and billing information</p>
          </div>

          {/* Current Subscription */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Current Subscription</h2>
                <Badge 
                  variant={subscription?.subscription_status === 'active' ? 'success' : 'warning'}
                  className="capitalize"
                >
                  {subscription?.subscription_status || 'inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {subscription?.subscription_plan || 'No Plan'} Plan
                  </h3>
                  <p className="text-gray-600">
                    {subscription?.subscription_status === 'active' 
                      ? 'Your subscription is active and in good standing'
                      : 'Choose a plan to get started'
                    }
                  </p>
                </div>
                {subscription?.subscription_status === 'active' && (
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      leftIcon={<Download size={18} />}
                      onClick={() => {/* Download invoice */}}
                    >
                      Download Invoice
                    </Button>
                    <Button
                      variant="secondary"
                      leftIcon={<CreditCard size={18} />}
                      onClick={manageBilling}
                    >
                      Manage Billing
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Usage Metrics */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Overview</h2>
            <UsageMetrics />
          </div>

          {/* Pricing Plans */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {subscription?.subscription_status === 'active' ? 'Upgrade Plan' : 'Choose a Plan'}
            </h2>
            <PricingPlans currentPlan={subscription?.subscription_plan || undefined} />
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
                <Button
                  variant="ghost"
                  leftIcon={<Settings size={18} />}
                  onClick={manageBilling}
                >
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-center py-8 text-gray-500">
                <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No billing history available</p>
                <p className="text-sm">Invoices will appear here once you have an active subscription</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BillingPage;