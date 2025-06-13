import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { getSiteByQrCode } from '../utils/storage';
import Layout from '../components/layout/Layout';
import QRScanner from '../components/qr/QRScanner';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { QrCode } from 'lucide-react';

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [manualCode, setManualCode] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  
  const handleScanSuccess = (qrCodeData: string) => {
    // Check if the QR code exists in our system
    const site = getSiteByQrCode(qrCodeData);
    if (site) {
      navigate(`/check-in/${qrCodeData}`);
    } else {
      addNotification('QR code not recognized. Please try again or contact admin.', 'error');
    }
  };
  
  const handleScanError = (error: string) => {
    addNotification(`Scanning error: ${error}`, 'error');
  };
  
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanSuccess(manualCode.trim());
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <h1 className="text-xl font-semibold text-primary-900 text-center">Scan Site QR Code</h1>
            </CardHeader>
            <CardBody>
              {!showManualEntry ? (
                <>
                  <QRScanner
                    onScanSuccess={handleScanSuccess}
                    onScanError={handleScanError}
                  />
                  <div className="mt-4 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowManualEntry(true)}
                      size="sm"
                    >
                      Enter code manually
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleManualSubmit}>
                    <Input
                      label="Site Code"
                      placeholder="Enter site QR code"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      fullWidth
                      leftIcon={<QrCode size={18} className="text-gray-400" />}
                    />
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setShowManualEntry(false)}
                        fullWidth
                      >
                        Back to Scanner
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={!manualCode.trim()}
                        fullWidth
                      >
                        Check In
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </CardBody>
          </Card>
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How to check in</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Locate the QR code at the facility entrance</li>
              <li>Position your camera to scan the QR code</li>
              <li>Complete the check-in form with your visit details</li>
              <li>When you leave, check out to record your departure time</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Demo QR Codes:</strong> Try scanning these codes or enter them manually:
              </p>
              <ul className="text-xs text-blue-600 mt-1 space-y-1">
                <li>• site_downtown_123</li>
                <li>• site_north_456</li>
                <li>• site_west_789</li>
                <li>• site_south_101</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;