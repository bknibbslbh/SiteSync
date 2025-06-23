import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { Search, Slack, Mail, Webhook, Database, Shield, Zap } from 'lucide-react';

const IntegrationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get real-time notifications in your Slack channels',
      icon: Slack,
      category: 'communication',
      status: 'available',
      popular: true,
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Automated email alerts and reports',
      icon: Mail,
      category: 'communication',
      status: 'connected',
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      description: 'Send data to external systems via HTTP webhooks',
      icon: Webhook,
      category: 'productivity',
      status: 'available',
    },
    {
      id: 'api',
      name: 'REST API',
      description: 'Full API access for custom integrations',
      icon: Database,
      category: 'productivity',
      status: 'available',
    },
    {
      id: 'sso',
      name: 'Single Sign-On',
      description: 'SAML and OIDC authentication',
      icon: Shield,
      category: 'security',
      status: 'available',
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3000+ apps through Zapier',
      icon: Zap,
      category: 'productivity',
      status: 'available',
      popular: true,
    },
  ];

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'available':
        return <Badge variant="gray">Available</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  const handleConnect = (integrationId: string) => {
    console.log(`Connecting to ${integrationId}`);
    // Implementation for connecting to integration
  };

  const handleDisconnect = (integrationId: string) => {
    console.log(`Disconnecting from ${integrationId}`);
    // Implementation for disconnecting from integration
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-600">Connect SiteSync with your favorite tools and services</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} className="text-gray-400" />}
              className="max-w-md"
            />
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="relative">
                  {integration.popular && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="warning" className="text-xs">Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent size={24} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody>
                    <p className="text-gray-600 text-sm">{integration.description}</p>
                  </CardBody>

                  <CardFooter>
                    {integration.status === 'connected' ? (
                      <div className="flex space-x-2 w-full">
                        <Button variant="ghost" size="sm" fullWidth>
                          Configure
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          fullWidth
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        fullWidth 
                        onClick={() => handleConnect(integration.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* API Documentation */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">API Documentation</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                Build custom integrations using our comprehensive REST API. Access all SiteSync 
                functionality programmatically with proper authentication and rate limiting.
              </p>
              <div className="flex space-x-4">
                <Button variant="primary">
                  View API Docs
                </Button>
                <Button variant="ghost">
                  Generate API Key
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default IntegrationsPage;