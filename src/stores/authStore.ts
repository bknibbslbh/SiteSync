import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, getCurrentUser, getUserProfile, getUserOrganizations } from '../lib/supabase';
import { Profile, Organization, OrganizationMember } from '../types';

interface AuthState {
  user: any | null;
  profile: Profile | null;
  organizations: Array<{
    role: OrganizationMember['role'];
    organizations: Organization;
  }> | null;
  currentOrganization: Organization | null;
  loading: boolean;
  initialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
  setCurrentOrganization: (org: Organization) => void;
  refreshProfile: () => Promise<void>;
  refreshOrganizations: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      organizations: null,
      currentOrganization: null,
      loading: false,
      initialized: false,

      initialize: async () => {
        try {
          set({ loading: true });
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const profile = await getUserProfile(session.user.id);
            const organizations = await getUserOrganizations(session.user.id);
            
            set({
              user: session.user,
              profile,
              organizations,
              currentOrganization: organizations[0]?.organizations || null,
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          set({ loading: false, initialized: true });
        }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true });
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const profile = await getUserProfile(data.user.id);
          const organizations = await getUserOrganizations(data.user.id);
          
          set({
            user: data.user,
            profile,
            organizations,
            currentOrganization: organizations[0]?.organizations || null,
            loading: false,
          });
        }
      },

      signUp: async (email: string, password: string, metadata: any) => {
        set({ loading: true });
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });

        if (error) throw error;
        
        set({ loading: false });
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          profile: null,
          organizations: null,
          currentOrganization: null,
        });
      },

      setCurrentOrganization: (org: Organization) => {
        set({ currentOrganization: org });
      },

      refreshProfile: async () => {
        const { user } = get();
        if (user) {
          const profile = await getUserProfile(user.id);
          set({ profile });
        }
      },

      refreshOrganizations: async () => {
        const { user } = get();
        if (user) {
          const organizations = await getUserOrganizations(user.id);
          set({ organizations });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        currentOrganization: state.currentOrganization,
      }),
    }
  )
);

// Set up auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const { initialize } = useAuthStore.getState();
  
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    await initialize();
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      profile: null,
      organizations: null,
      currentOrganization: null,
    });
  }
});