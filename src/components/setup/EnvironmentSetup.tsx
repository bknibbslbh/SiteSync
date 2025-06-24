import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AlertTriangle, CheckCircle, ExternalLink, Copy } from 'lucide-react';

interface EnvironmentSetupProps {
  onComplete: () => void;
}

const EnvironmentSetup: React.FC<EnvironmentSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [stripeKey, setStripeKey] = useState('');

  const handleCopyEnvFile = () => {
    const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=${stripeKey}

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:5173/api

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_OFFLINE_MODE=true`;

    navigator.clipboard.writeText(envContent);
  };

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return supabaseUrl && supabaseKey;
      case 2:
        return stripeKey;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-50 to-electric-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 text-white mb-4 shadow-xl">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Environment Setup Required</h1>
          <p className="text-gray-600">Let's configure your environment variables to get SiteSync running</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Step {step} of 3</h2>
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i <= step ? 'bg-electric-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-100 rounded-full flex items-center justify-center mr-3 text-electric-600 font-bold">1</span>
                  Supabase Configuration
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Need a Supabase project?</strong>
                  </p>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                    <li>Create a new project</li>
                    <li>Go to Settings → API</li>
                    <li>Copy your Project URL and anon public key</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <Input
                    label="Supabase Project URL"
                    placeholder="https://your-project.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Supabase Anon Key"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-electric-100 rounded-full flex items-center justify-center mr-3 text-electric-600 font-bold">2</span>
                  Stripe Configuration
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Need a Stripe account?</strong>
                  </p>
                  <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline">stripe.com</a></li>
                    <li>Create an account</li>
                    <li>Go to Developers → API keys</li>
                    <li>Copy your Publishable key (starts with pk_)</li>
                  </ol>
                </div>
                <Input
                  label="Stripe Publishable Key"
                  placeholder="pk_test_..."
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  fullWidth
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  Environment File Ready
                </h3>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-green-800 mb-3">
                    <strong>Final Step:</strong> Create a <code>.env</code> file in your project root with these values:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                    <pre>{`# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=${stripeKey}

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:5173/api

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_OFFLINE_MODE=true`}</pre>
                  </div>
                </div>
                <Button
                  onClick={handleCopyEnvFile}
                  leftIcon={<Copy size={18} />}
                  variant="secondary"
                  fullWidth
                  className="mb-4"
                >
                  Copy to Clipboard
                </Button>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> After creating the .env file, restart your development server for the changes to take effect.
                  </p>
                </div>
              </div>
            )}
          </CardBody>

          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepComplete(step)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={onComplete}
                variant="electric"
              >
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? Check our{' '}
            <a href="/help" className="text-electric-600 hover:text-electric-800">
              setup guide
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EnvironmentSetup;