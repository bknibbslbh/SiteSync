import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PRICING_PLANS } from '../../lib/stripe';
import { useSubscription } from '../../hooks/useSubscription';
import Button from '../ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';

interface PricingPlansProps {
  onSelectPlan?: (planId: string) => void;
  currentPlan?: string;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan, currentPlan }) => {
  const { upgrade, isUpgrading } = useSubscription();

  const handleSelectPlan = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      upgrade(planId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {Object.values(PRICING_PLANS).map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`relative h-full ${plan.id === 'professional' ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
            {plan.id === 'professional' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star size={16} className="mr-1" />
                  Most Popular
                </div>
              </div>
            )}
            
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/{plan.interval}</span>
              </div>
            </CardHeader>

            <CardBody className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardBody>

            <CardFooter>
              <Button
                fullWidth
                variant={plan.id === 'professional' ? 'electric' : 'primary'}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={currentPlan === plan.id || isUpgrading}
                isLoading={isUpgrading}
              >
                {currentPlan === plan.id ? 'Current Plan' : `Choose ${plan.name}`}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingPlans;