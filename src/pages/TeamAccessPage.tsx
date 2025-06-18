import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getUsers } from '../utils/storage';
import { User } from '../types';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { Users, Search, UserPlus, Edit, Trash2, Shield, Mail, Phone } from 'lucide-react';

const TeamAccessPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  useEffect(() => {
    // Load all users
    const allUsers = getUsers();
    setUsers(allUsers);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // Apply filters
    let filtered = [...users];
    
    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, searchQuery, filterRole]);
  
  const handleInviteUser = () => {
    addNotification('User invitation feature coming soon!', 'info');
  };
  
  const handleEditUser = (user: User) => {
    addNotification(`Edit user feature for ${user.name} coming soon!`, 'info');
  };
  
  const handleDeleteUser = (user: User) => {
    if (user.id === currentUser?.id) {
      addNotification('You cannot delete your own account', 'warning');
      return;
    }
    
    if (window.confirm(`Are you sure you want to remove ${user.name} from the team?`)) {
      addNotification(`${user.name} removed from team`, 'success');
    }
  };
  
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'warning';
      case 'engineer':
        return 'primary';
      default:
        return 'gray';
    }
  };
  
  // Check if current user has permission to manage team
  const canManageTeam = currentUser?.role === 'admin' || currentUser?.role === 'manager';
  
  if (!canManageTeam) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-md mx-auto">
            <CardBody>
              <div className="text-center py-8">
                <Shield size={48} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Restricted</h2>
                <p className="text-gray-600">You don't have permission to manage team access.</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Access</h1>
            <p className="text-gray-600">Manage user access and permissions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handleInviteUser}
              leftIcon={<UserPlus size={18} />}
            >
              Invite User
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} className="text-gray-400" />}
              fullWidth
              className="md:max-w-xs"
            />
            
            <Select
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Administrators' },
                { value: 'manager', label: 'Managers' },
                { value: 'engineer', label: 'Engineers' },
              ]}
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              fullWidth
              className="md:max-w-xs"
            />
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-primary-50">
            <CardBody className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-800">{users.length}</div>
              <div className="text-sm text-primary-600">Total Users</div>
            </CardBody>
          </Card>
          <Card className="bg-error-50">
            <CardBody className="p-4 text-center">
              <div className="text-2xl font-bold text-error-800">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-error-600">Admins</div>
            </CardBody>
          </Card>
          <Card className="bg-warning-50">
            <CardBody className="p-4 text-center">
              <div className="text-2xl font-bold text-warning-800">
                {users.filter(u => u.role === 'manager').length}
              </div>
              <div className="text-sm text-warning-600">Managers</div>
            </CardBody>
          </Card>
          <Card className="bg-secondary-50">
            <CardBody className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary-800">
                {users.filter(u => u.role === 'engineer').length}
              </div>
              <div className="text-sm text-secondary-600">Engineers</div>
            </CardBody>
          </Card>
        </div>
        
        {/* Users List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            description={
              searchQuery || filterRole !== 'all'
                ? "No users match your search criteria"
                : "No team members found"
            }
            icon={<Users size={48} className="text-gray-400" />}
            actionLabel="Invite User"
            onAction={handleInviteUser}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                            {user.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <Users size={20} className="text-primary-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={getRoleBadgeVariant(user.role)} 
                          rounded
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail size={14} />
                          <Phone size={14} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="success" rounded>
                          Active
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            <Edit size={18} className="text-secondary-600" />
                          </Button>
                          {user.id !== currentUser?.id && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteUser(user)}
                              title="Remove User"
                            >
                              <Trash2 size={18} className="text-error-500" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeamAccessPage;