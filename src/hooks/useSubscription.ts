import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { createCheckoutSession, createPortalSession, PRICING_PLANS } from '../lib/stripe';
import { SubscriptionUsage } from '../types';

export const useSubscription = () => {
  const { currentOrganization } = useAuthStore();
  const queryClient = useQueryClient();

  const subscriptionQuery = useQuery({
    queryKey: ['subscription', currentOrganization?.id],
    queryFn: async () => {
      if (!currentOrganization) throw new Error('No organization selected');

      const { data, error } = await supabase
        .from('organizations')
        .select('subscription_status, subscription_plan, stripe_customer_id')
        .eq('id', currentOrganization.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrganization,
  });

  const usageQuery = useQuery({
    queryKey: ['subscription-usage', currentOrganization?.id],
    queryFn: async (): Promise<SubscriptionUsage> => {
      if (!currentOrganization) throw new Error('No organization selected');

      // Get current users count
      const { count: usersCount } = await supabase
        .from('organization_members')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id);

      // Get current sites count
      const { count: sitesCount } = await supabase
        .from('sites')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id);

      // Get current plan limits
      const currentPlan = PRICING_PLANS[currentOrganization.subscription_plan as keyof typeof PRICING_PLANS];
      
      return {
        users: {
          current: usersCount || 0,
          limit: currentPlan?.limits.users || 5,
        },
        sites: {
          current: sitesCount || 0,
          limit: currentPlan?.limits.sites || 10,
        },
        api_calls: {
          current: 0, // This would come from API usage tracking
          limit: currentPlan?.limits.api_calls || 1000,
          period_start: new Date().toISOString(),
          period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      };
    },
    enabled: !!currentOrganization,
  });

  const upgradeMutation = useMutation({
    mutationFn: async (planId: string) => {
      if (!currentOrganization) throw new Error('No organization selected');

      const plan = PRICING_PLANS[planId as keyof typeof PRICING_PLANS];
      if (!plan) throw new Error('Invalid plan');

      // Create Stripe checkout session
      const session = await createCheckoutSession(plan.id, currentOrganization.id);
      
      // Redirect to Stripe Checkout
      window.location.href = session.url;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  const manageBillingMutation = useMutation({
    mutationFn: async () => {
      if (!currentOrganization?.stripe_customer_id) {
        throw new Error('No customer ID found');
      }

      const session = await createPortalSession(currentOrganization.stripe_customer_id);
      window.location.href = session.url;
    },
  });

  return {
    subscription: subscriptionQuery.data,
    usage: usageQuery.data,
    isLoading: subscriptionQuery.isLoading || usageQuery.isLoading,
    upgrade: upgradeMutation.mutate,
    manageBilling: manageBillingMutation.mutate,
    isUpgrading: upgradeMutation.isPending,
  };
};