import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { notify } from '../stores/notificationStore';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, User, Building, ClipboardCheck } from 'lucide-react';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  organization_name: string;
  terms_accepted: boolean;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      notify.error('Passwords do not match');
      return;
    }

    if (!data.terms_accepted) {
      notify.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        full_name: data.full_name,
        organization_name: data.organization_name,
      });
      
      notify.success(
        'Account Created!', 
        'Please check your email to verify your account before signing in.'
      );
      navigate('/login');
    } catch (error: any) {
      notify.error('Sign Up Failed', error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 text-white mb-4 shadow-xl">
              <ClipboardCheck size={36} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-electric-600 to-electric-400 bg-clip-text text-transparent">
              Join SiteSync
            </h1>
            <p className="text-gray-600 mt-2">Create your account and start managing sites</p>
          </div>

          <Card className="shadow-2xl border border-electric-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className="space-y-4 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    leftIcon={<User size={18} className="text-electric-500" />}
                    error={errors.full_name?.message}
                    {...register('full_name', {
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    fullWidth
                  />

                  <Input
                    label="Organization"
                    placeholder="Your Company"
                    leftIcon={<Building size={18} className="text-electric-500" />}
                    error={errors.organization_name?.message}
                    {...register('organization_name', {
                      required: 'Organization name is required',
                    })}
                    fullWidth
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  leftIcon={<Mail size={18} className="text-electric-500" />}
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  fullWidth
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} className="text-electric-500" />}
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number',
                    },
                  })}
                  fullWidth
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} className="text-electric-500" />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  fullWidth
                />

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded border-gray-300 text-electric-600 shadow-sm focus:border-electric-300 focus:ring focus:ring-electric-200 focus:ring-opacity-50"
                    {...register('terms_accepted', {
                      required: 'You must accept the terms and conditions',
                    })}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-electric-600 hover:text-electric-800">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-electric-600 hover:text-electric-800">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms_accepted && (
                  <p className="text-red-500 text-sm">{errors.terms_accepted.message}</p>
                )}
              </CardBody>

              <CardFooter className="p-6 pt-0">
                <Button
                  type="submit"
                  variant="electric"
                  fullWidth
                  isLoading={loading}
                  disabled={loading}
                >
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-electric-600 hover:text-electric-800 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SignUpPage;