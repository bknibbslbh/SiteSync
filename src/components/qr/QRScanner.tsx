import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Button from '../ui/Button';

interface QRScannerProps {
  onScanSuccess: (siteQrCode: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (scanning) {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      };

      scanner = new Html5QrcodeScanner('qr-reader', config, false);

      const onScannerSuccess = (decodedText: string) => {
        // Stop scanner
        if (scanner) {
          scanner.clear();
        }
        setScanning(false);
        onScanSuccess(decodedText);
      };

      const onScannerError = (errorMessage: string) => {
        // Don't show camera access errors here, as we handle them separately
        if (!errorMessage.includes('Camera access is denied')) {
          setError(errorMessage);
          if (onScanError) {
            onScanError(errorMessage);
          }
        }
      };

      scanner.render(onScannerSuccess, onScannerError);

      // Handle permissions error
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .catch(() => {
          setPermissionDenied(true);
          setScanning(false);
          if (scanner) {
            scanner.clear();
          }
          if (onScanError) {
            onScanError('Camera permission denied');
          }
        });
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanning, onScanSuccess, onScanError]);

  const startScanning = () => {
    setError(null);
    setPermissionDenied(false);
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
    // Html5QrcodeScanner automatically clears in the useEffect cleanup
  };

  if (permissionDenied) {
    return (
      <div className="text-center py-8">
        <div className="text-error-500 text-4xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Camera Access Denied</h3>
        <p className="text-gray-600 mb-4">
          Please allow camera access in your browser settings to scan QR codes.
        </p>
        <Button onClick={startScanning}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="qr-scanner">
      {!scanning ? (
        <div className="text-center py-8">
          <div className="text-primary-500 text-4xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Scan Site QR Code</h3>
          <p className="text-gray-600 mb-4">
            Point your camera at a site QR code to check in.
          </p>
          <Button onClick={startScanning}>Start Scanning</Button>
        </div>
      ) : (
        <div>
          <div id="qr-reader" className="w-full max-w-md mx-auto rounded-lg overflow-hidden"></div>
          {error && <p className="text-error-500 mt-2">{error}</p>}
          <div className="text-center mt-4">
            <Button variant="secondary" onClick={stopScanning}>
              Cancel Scanning
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;