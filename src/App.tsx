import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './stores/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import LogbookPage from './pages/LogbookPage';
import ScanPage from './pages/ScanPage';
import CheckInForm from './pages/CheckInForm';
import CheckOutForm from './pages/CheckOutForm';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import TeamAccessPage from './pages/TeamAccessPage';

// Components
import Loading from './components/ui/Loading';
import NotificationCenter from './components/ui/NotificationCenter';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOrganization?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireOrganization = true 
}) => {
  const { user, currentOrganization, loading, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOrganization && !currentOrganization) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { user, currentOrganization, loading, initialized, initialize } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Initializing..." />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } />
          <Route path="/signup" element={
            user ? <Navigate to="/dashboard" replace /> : <SignUpPage />
          } />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={
            <ProtectedRoute requireOrganization={false}>
              <OnboardingPage />
            </ProtectedRoute>
          } />

          {/* Protected routes */}
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

          <Route path="/billing" element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />

          <Route path="/integrations" element={
            <ProtectedRoute>
              <IntegrationsPage />
            </ProtectedRoute>
          } />

          <Route path="/team" element={
            <ProtectedRoute>
              <TeamAccessPage />
            </ProtectedRoute>
          } />

          {/* Redirect root to appropriate page */}
          <Route path="/" element={
            loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <Loading size="lg" text="Loading..." />
              </div>
            ) : user ? (
              currentOrganization ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Catch all route */}
          <Route path="*" element={
            <Navigate to="/" replace />
          } />
        </Routes>

        <NotificationCenter />
      </div>
    </QueryClientProvider>
  );
}

export default App;