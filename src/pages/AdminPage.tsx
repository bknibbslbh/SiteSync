import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getSites, addSite, updateSite, deleteSite } from '../utils/storage';
import { Site } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { Building, Plus, Edit, Trash2, Search, Download, QrCode } from 'lucide-react';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  
  useEffect(() => {
    // Load all sites
    const allSites = getSites();
    setSites(allSites);
    setLoading(false);
  }, []);
  
  const filteredSites = searchQuery.trim() 
    ? sites.filter(site => 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sites;
  
  const handleAddSite = () => {
    if (!siteName.trim() || !siteAddress.trim()) {
      addNotification('Please fill in all fields', 'warning');
      return;
    }
    
    const newSite: Site = {
      id: uuidv4(),
      name: siteName.trim(),
      address: siteAddress.trim(),
      qrCode: `site_${siteName.trim().toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString(36)}`,
    };
    
    addSite(newSite);
    setSites([...sites, newSite]);
    
    // Reset form
    setSiteName('');
    setSiteAddress('');
    setShowAddForm(false);
    
    addNotification('Site added successfully', 'success');
  };
  
  const handleEditSite = (site: Site) => {
    setEditingSiteId(site.id);
    setSiteName(site.name);
    setSiteAddress(site.address);
    setShowAddForm(true);
  };
  
  const handleUpdateSite = () => {
    if (!editingSiteId || !siteName.trim() || !siteAddress.trim()) {
      addNotification('Please fill in all fields', 'warning');
      return;
    }
    
    const siteToUpdate = sites.find(site => site.id === editingSiteId);
    if (!siteToUpdate) return;
    
    const updatedSite: Site = {
      ...siteToUpdate,
      name: siteName.trim(),
      address: siteAddress.trim(),
    };
    
    updateSite(updatedSite);
    
    setSites(sites.map(site => 
      site.id === editingSiteId ? updatedSite : site
    ));
    
    // Reset form
    setSiteName('');
    setSiteAddress('');
    setEditingSiteId(null);
    setShowAddForm(false);
    
    addNotification('Site updated successfully', 'success');
  };
  
  const handleDeleteSite = (siteId: string) => {
    if (window.confirm('Are you sure you want to delete this site?')) {
      deleteSite(siteId);
      setSites(sites.filter(site => site.id !== siteId));
      addNotification('Site deleted successfully', 'success');
    }
  };
  
  const handleCancelForm = () => {
    setSiteName('');
    setSiteAddress('');
    setEditingSiteId(null);
    setShowAddForm(false);
  };
  
  const handleExportQR = (site: Site) => {
    // In a real application, you would generate a proper QR code image
    // For this demo, we'll just show a notification
    addNotification(`QR code for "${site.name}" exported`, 'success');
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Site Management</h1>
            <p className="text-gray-600">Add, edit, and manage facility sites</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setShowAddForm(true)}
              leftIcon={<Plus size={18} />}
              disabled={showAddForm}
            >
              Add New Site
            </Button>
          </div>
        </div>
        
        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingSiteId ? 'Edit Site' : 'Add New Site'}
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Input
                  label="Site Name"
                  placeholder="Enter site name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  required
                  fullWidth
                />
                <Input
                  label="Site Address"
                  placeholder="Enter site address"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  required
                  fullWidth
                />
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={editingSiteId ? handleUpdateSite : handleAddSite}
                  >
                    {editingSiteId ? 'Update Site' : 'Add Site'}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} className="text-gray-400" />}
              fullWidth
              className="sm:max-w-xs"
            />
          </div>
        </div>
        
        {/* Sites List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredSites.length === 0 ? (
          <EmptyState
            title="No sites found"
            description={
              searchQuery
                ? "No sites match your search criteria"
                : "Add your first site to get started"
            }
            icon={<Building size={48} className="text-gray-400" />}
            actionLabel="Add Site"
            onAction={() => setShowAddForm(true)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Site Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSites.map((site) => (
                    <tr key={site.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{site.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{site.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500 font-mono text-sm">{site.qrCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleExportQR(site)}
                            title="Export QR Code"
                          >
                            <QrCode size={18} className="text-primary-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditSite(site)}
                            title="Edit Site"
                          >
                            <Edit size={18} className="text-secondary-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteSite(site.id)}
                            title="Delete Site"
                          >
                            <Trash2 size={18} className="text-error-500" />
                          </Button>
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

export default AdminPage;