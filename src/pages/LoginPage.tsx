import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, ClipboardCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        addNotification('Login successful!', 'success');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDemo = async () => {
    setError(null);
    setLoading(true);
    
    try {
      // Use a demo account
      const success = await login('admin@sitesync.live', 'password');
      if (success) {
        addNotification('Logged in with demo account', 'success');
        navigate('/dashboard');
      } else {
        setError('Failed to login with demo account');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <ClipboardCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to SiteSync</h1>
            <p className="text-gray-600 mt-2">Log in to your account to continue</p>
          </div>
          
          <Card className="shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardBody className="space-y-4">
                {error && (
                  <div className="bg-error-50 text-error-700 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                {/* Demo credentials info */}
                <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  <p>Email: admin@sitesync.live</p>
                  <p>Password: password</p>
                </div>
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  leftIcon={<Mail size={18} className="text-gray-500" />}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  leftIcon={<Lock size={18} className="text-gray-500" />}
                />
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-600 hover:text-primary-800 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={loading}
                  className="mb-3"
                >
                  Log In
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={handleDemo}
                  disabled={loading}
                >
                  Demo Login
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-800 transition-colors font-medium">
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;