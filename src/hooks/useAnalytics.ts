import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { AnalyticsData } from '../types';

export const useAnalytics = (dateRange?: { start: string; end: string }) => {
  const { currentOrganization } = useAuthStore();

  return useQuery({
    queryKey: ['analytics', currentOrganization?.id, dateRange],
    queryFn: async (): Promise<AnalyticsData> => {
      if (!currentOrganization) throw new Error('No organization selected');

      // Get total visits
      const { count: totalVisits } = await supabase
        .from('log_entries')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id);

      // Get active visits
      const { count: activeVisits } = await supabase
        .from('log_entries')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id)
        .is('check_out_time', null);

      // Get total sites
      const { count: totalSites } = await supabase
        .from('sites')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id);

      // Get total users
      const { count: totalUsers } = await supabase
        .from('organization_members')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrganization.id);

      // Get visits by day (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: visitsByDay } = await supabase
        .from('log_entries')
        .select('check_in_time')
        .eq('organization_id', currentOrganization.id)
        .gte('check_in_time', thirtyDaysAgo.toISOString());

      // Process visits by day
      const visitsGrouped = visitsByDay?.reduce((acc, entry) => {
        const date = new Date(entry.check_in_time).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const visitsByDayArray = Object.entries(visitsGrouped).map(([date, count]) => ({
        date,
        count,
      }));

      // Get visits by site
      const { data: visitsBySite } = await supabase
        .from('log_entries')
        .select(`
          site_id,
          sites!inner(name)
        `)
        .eq('organization_id', currentOrganization.id);

      const siteVisits = visitsBySite?.reduce((acc, entry) => {
        const siteName = (entry.sites as any).name;
        acc[siteName] = (acc[siteName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const visitsBySiteArray = Object.entries(siteVisits).map(([site_name, count]) => ({
        site_name,
        count,
      }));

      // Get visits by user
      const { data: visitsByUser } = await supabase
        .from('log_entries')
        .select(`
          user_id,
          profiles!inner(full_name)
        `)
        .eq('organization_id', currentOrganization.id);

      const userVisits = visitsByUser?.reduce((acc, entry) => {
        const userName = (entry.profiles as any).full_name;
        acc[userName] = (acc[userName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const visitsByUserArray = Object.entries(userVisits).map(([user_name, count]) => ({
        user_name,
        count,
      }));

      // Calculate average visit duration
      const { data: completedVisits } = await supabase
        .from('log_entries')
        .select('check_in_time, check_out_time')
        .eq('organization_id', currentOrganization.id)
        .not('check_out_time', 'is', null);

      const avgDuration = completedVisits?.reduce((acc, entry) => {
        const checkIn = new Date(entry.check_in_time);
        const checkOut = new Date(entry.check_out_time!);
        const duration = checkOut.getTime() - checkIn.getTime();
        return acc + duration;
      }, 0) || 0;

      const avgVisitDuration = completedVisits?.length 
        ? avgDuration / completedVisits.length / (1000 * 60) // Convert to minutes
        : 0;

      return {
        total_visits: totalVisits || 0,
        active_visits: activeVisits || 0,
        total_sites: totalSites || 0,
        total_users: totalUsers || 0,
        avg_visit_duration: Math.round(avgVisitDuration),
        visits_by_day: visitsByDayArray,
        visits_by_site: visitsBySiteArray,
        visits_by_user: visitsByUserArray,
      };
    },
    enabled: !!currentOrganization,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};