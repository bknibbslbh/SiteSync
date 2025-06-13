import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { User, Mail, Phone, Building, Camera } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    company: '',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    addNotification('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      company: '',
      bio: '',
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Profile Picture</h2>
              </CardHeader>
              <CardBody>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                    {currentUser?.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-primary-600" />
                    )}
                  </div>
                  <div>
                    <Button variant="secondary" leftIcon={<Camera size={18} />}>
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                {!isEditing && (
                  <Button variant="ghost" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardBody className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<User size={18} className="text-gray-400" />}
                      fullWidth
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<Mail size={18} className="text-gray-400" />}
                      fullWidth
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<Phone size={18} className="text-gray-400" />}
                      fullWidth
                    />
                    <Input
                      label="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<Building size={18} className="text-gray-400" />}
                      fullWidth
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardBody>
                {isEditing && (
                  <CardFooter className="flex justify-end space-x-3">
                    <Button type="button" variant="ghost" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </form>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Role</p>
                      <p className="text-sm text-gray-500">Your current access level</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                      {currentUser?.role}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Account Status</p>
                      <p className="text-sm text-gray-500">Your account is active</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-gray-900">Member Since</p>
                      <p className="text-sm text-gray-500">January 2024</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;