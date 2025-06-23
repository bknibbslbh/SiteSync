import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { notify } from '../stores/notificationStore';
import { createOrganization } from '../lib/supabase';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ChevronRight, ChevronLeft, Building, Users, CheckCircle } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshOrganizations } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    teamSize: '',
    useCase: '',
  });

  const steps = [
    {
      title: 'Welcome to SiteSync',
      description: 'Let\'s get your organization set up in just a few steps',
      icon: CheckCircle,
    },
    {
      title: 'Organization Details',
      description: 'Tell us about your organization',
      icon: Building,
    },
    {
      title: 'Team Setup',
      description: 'Configure your team settings',
      icon: Users,
    },
  ];

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      // Complete onboarding
      await completeOnboarding();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const completeOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await createOrganization(formData.organizationName, user.id);
      await refreshOrganizations();
      
      notify.success('Welcome to SiteSync!', 'Your organization has been set up successfully.');
      navigate('/dashboard');
    } catch (error) {
      notify.error('Setup Failed', 'There was an error setting up your organization.');
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SiteSync!</h2>
            <p className="text-gray-600 mb-6">
              We're excited to help you streamline your facility management operations. 
              Let's get started by setting up your organization.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What you'll get:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Digital site logbooks</li>
                <li>• QR code check-in system</li>
                <li>• Real-time analytics</li>
                <li>• Team collaboration tools</li>
              </ul>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building size={48} className="text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Organization Details</h2>
              <p className="text-gray-600">Tell us about your organization</p>
            </div>
            
            <Input
              label="Organization Name"
              placeholder="Enter your organization name"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              required
              fullWidth
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select industry</option>
                  <option value="construction">Construction</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select team size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-25">6-25 people</option>
                  <option value="26-100">26-100 people</option>
                  <option value="100+">100+ people</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users size={48} className="text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Team Setup</h2>
              <p className="text-gray-600">How will you use SiteSync?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Use Case
              </label>
              <div className="space-y-3">
                {[
                  { value: 'maintenance', label: 'Facility Maintenance', description: 'Track maintenance visits and work orders' },
                  { value: 'security', label: 'Security Rounds', description: 'Monitor security patrols and incidents' },
                  { value: 'inspections', label: 'Safety Inspections', description: 'Conduct regular safety and compliance checks' },
                  { value: 'contractors', label: 'Contractor Management', description: 'Manage external contractor access and work' },
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="useCase"
                      value={option.value}
                      checked={formData.useCase === option.value}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return formData.organizationName.trim() !== '';
      case 2:
        return formData.useCase !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl">
          <CardBody className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardBody>

          <CardFooter className="flex justify-between p-6 bg-gray-50">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              leftIcon={<ChevronLeft size={18} />}
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              isLoading={loading}
              rightIcon={currentStep === steps.length - 1 ? undefined : <ChevronRight size={18} />}
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;