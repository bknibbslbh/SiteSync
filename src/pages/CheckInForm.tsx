import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getSiteByQrCode, addLogEntry } from '../utils/storage';
import { Site, LogEntry } from '../types';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { CheckCircle, AlertCircle, Building } from 'lucide-react';
import { format } from 'date-fns';

const CheckInForm: React.FC = () => {
  const { qrCode } = useParams<{ qrCode: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (!qrCode) {
      setError('No QR code provided');
      setLoading(false);
      return;
    }
    
    const site = getSiteByQrCode(qrCode);
    if (site) {
      setSite(site);
      setLoading(false);
    } else {
      setError('Invalid QR code. Site not found.');
      setLoading(false);
    }
  }, [qrCode]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !site) {
      addNotification('Unable to check in. Please try again.', 'error');
      return;
    }
    
    setSubmitting(true);
    
    const newLogEntry: LogEntry = {
      id: uuidv4(),
      siteId: site.id,
      siteName: site.name,
      engineerId: currentUser.id,
      engineerName: currentUser.name,
      checkInTime: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      purpose,
      notes,
      workCompleted: false,
    };
    
    // Add log entry to storage
    addLogEntry(newLogEntry);
    
    // Show success notification
    addNotification('Check-in successful!', 'success');
    
    // Navigate to logbook
    navigate('/logbook');
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-md mx-auto">
            <CardBody>
              <div className="text-center py-4">
                <AlertCircle size={48} className="text-error-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button 
                  onClick={() => navigate('/scan')}
                  variant="primary"
                >
                  Back to Scanner
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
  
  if (!site) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-md mx-auto">
            <CardBody>
              <div className="text-center py-4">
                <AlertCircle size={48} className="text-error-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Site Not Found</h2>
                <p className="text-gray-600 mb-4">The QR code scanned does not match any site in our system.</p>
                <Button 
                  onClick={() => navigate('/scan')}
                  variant="primary"
                >
                  Try Again
                </Button>
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
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="bg-primary-50">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-md shadow-sm">
                  <Building size={24} className="text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary-900">{site.name}</h2>
                  <p className="text-sm text-gray-600">{site.address}</p>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <CheckCircle size={20} className="text-success-500 mr-2" />
                      <p className="text-sm text-gray-700">
                        Checking in as <span className="font-medium">{currentUser?.name}</span>
                      </p>
                    </div>
                  </div>
                  <Input
                    label="Purpose of Visit"
                    placeholder="e.g., Routine maintenance, Emergency repair"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    fullWidth
                  />
                  <Textarea
                    label="Notes (optional)"
                    placeholder="Add any additional details about your visit"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                  />
                </div>
              </CardBody>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/scan')}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!purpose || submitting}
                  isLoading={submitting}
                >
                  Check In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CheckInForm;