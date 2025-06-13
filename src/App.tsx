import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LogbookPage from './pages/LogbookPage';
import ScanPage from './pages/ScanPage';
import CheckInForm from './pages/CheckInForm';
import CheckOutForm from './pages/CheckOutForm';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Components
import Loading from './components/ui/Loading';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard if authenticated and on root route
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard');
    } else if (!isAuthenticated && location.pathname === '/') {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (loading && location.pathname === '/') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/logbook" element={
        <ProtectedRoute>
          <LogbookPage />
        </ProtectedRoute>
      } />
      
      <Route path="/scan" element={
        <ProtectedRoute>
          <ScanPage />
        </ProtectedRoute>
      } />
      
      <Route path="/check-in/:qrCode" element={
        <ProtectedRoute>
          <CheckInForm />
        </ProtectedRoute>
      } />
      
      <Route path="/check-out/:entryId" element={
        <ProtectedRoute>
          <CheckOutForm />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />

      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />

      {/* Public pages */}
      <Route path="/help" element={<HelpPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      
      {/* Redirect to login or dashboard based on auth state */}
      <Route path="*" element={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading size="lg" text="Loading..." />
          </div>
        ) : isAuthenticated ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  );
}

export default App;