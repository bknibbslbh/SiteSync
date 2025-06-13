import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Bell, Shield, Smartphone, Globe, Moon, Sun } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { addNotification } = useNotification();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      checkInReminders: true,
      weeklyReports: true,
    },
    privacy: {
      profileVisibility: 'team',
      activityTracking: true,
      dataSharing: false,
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-8',
    },
    mobile: {
      offlineMode: true,
      autoSync: true,
      cameraQuality: 'high',
    }
  });

  const handleSave = () => {
    // In a real app, this would save settings to the backend
    addNotification('Settings saved successfully!', 'success');
  };

  const toggleSetting = (category: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]]
      }
    }));
  };

  const updateSetting = (category: keyof typeof settings, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your application preferences and privacy settings</p>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Bell size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={() => toggleSetting('notifications', 'email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={() => toggleSetting('notifications', 'push')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Check-in Reminders</p>
                    <p className="text-sm text-gray-500">Remind me to check out after 8 hours</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.checkInReminders}
                      onChange={() => toggleSetting('notifications', 'checkInReminders')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </CardBody>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Shield size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Profile Visibility</p>
                    <p className="text-sm text-gray-500">Who can see your profile information</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="public">Public</option>
                    <option value="team">Team Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Activity Tracking</p>
                    <p className="text-sm text-gray-500">Allow tracking for analytics and improvements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.activityTracking}
                      onChange={() => toggleSetting('privacy', 'activityTracking')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </CardBody>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Sun size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Theme</p>
                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                  </div>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Language</p>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                  <select
                    value={settings.appearance.language}
                    onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            {/* Mobile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Smartphone size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Mobile Settings</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Offline Mode</p>
                    <p className="text-sm text-gray-500">Allow app to work without internet connection</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.mobile.offlineMode}
                      onChange={() => toggleSetting('mobile', 'offlineMode')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Camera Quality</p>
                    <p className="text-sm text-gray-500">Quality for QR code scanning and photos</p>
                  </div>
                  <select
                    value={settings.mobile.cameraQuality}
                    onChange={(e) => updateSetting('mobile', 'cameraQuality', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg">
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;