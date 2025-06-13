import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { getLogEntryById, updateLogEntry } from '../utils/storage';
import { LogEntry } from '../types';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { formatDateTime } from '../utils/formatters';
import { Building, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const CheckOutForm: React.FC = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [notes, setNotes] = useState('');
  const [workCompleted, setWorkCompleted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (!entryId) {
      setError('No log entry ID provided');
      setLoading(false);
      return;
    }
    
    const entry = getLogEntryById(entryId);
    if (entry) {
      setLogEntry(entry);
      setNotes(entry.notes || '');
      setWorkCompleted(entry.workCompleted);
      setLoading(false);
    } else {
      setError('Log entry not found');
      setLoading(false);
    }
  }, [entryId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logEntry) {
      addNotification('Unable to check out. Please try again.', 'error');
      return;
    }
    
    setSubmitting(true);
    
    const updatedEntry: LogEntry = {
      ...logEntry,
      checkOutTime: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      notes,
      workCompleted,
    };
    
    // Update log entry in storage
    updateLogEntry(updatedEntry);
    
    // Show success notification
    addNotification('Check-out successful!', 'success');
    
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
                  onClick={() => navigate('/logbook')}
                  variant="primary"
                >
                  Back to Logbook
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
  
  if (!logEntry) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-md mx-auto">
            <CardBody>
              <div className="text-center py-4">
                <AlertCircle size={48} className="text-error-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Log Entry Not Found</h2>
                <p className="text-gray-600 mb-4">We couldn't find the log entry you're looking for.</p>
                <Button 
                  onClick={() => navigate('/logbook')}
                  variant="primary"
                >
                  Back to Logbook
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // If already checked out, don't allow checking out again
  if (logEntry.checkOutTime) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="max-w-md mx-auto">
            <CardBody>
              <div className="text-center py-4">
                <AlertCircle size={48} className="text-warning-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Already Checked Out</h2>
                <p className="text-gray-600 mb-4">This entry has already been checked out at {formatDateTime(logEntry.checkOutTime)}.</p>
                <Button 
                  onClick={() => navigate('/logbook')}
                  variant="primary"
                >
                  Back to Logbook
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
                  <h2 className="text-xl font-semibold text-primary-900">{logEntry.siteName}</h2>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock size={16} className="mr-1" />
                    <span>Checked in: {formatDateTime(logEntry.checkInTime)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Purpose of visit:</span> {logEntry.purpose}
                    </p>
                  </div>
                  <Textarea
                    label="Notes"
                    placeholder="Add any notes about work performed or issues encountered"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                  />
                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">Work Status</p>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-primary-600 focus:ring-primary-500"
                          name="workStatus"
                          checked={workCompleted}
                          onChange={() => setWorkCompleted(true)}
                        />
                        <span className="ml-2 text-gray-700">Completed</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-primary-600 focus:ring-primary-500"
                          name="workStatus"
                          checked={!workCompleted}
                          onChange={() => setWorkCompleted(false)}
                        />
                        <span className="ml-2 text-gray-700">Incomplete</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/logbook')}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  isLoading={submitting}
                >
                  Check Out
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CheckOutForm;