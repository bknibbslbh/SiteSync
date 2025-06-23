import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, metadata?: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
};

export const updatePassword = async (password: string) => {
  return await supabase.auth.updateUser({ password });
};

// Organization helpers
export const createOrganization = async (name: string, userId: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .insert({
      name,
      owner_id: userId,
      settings: {
        branding: {
          primary_color: '#0EA5E9',
          logo_url: null,
        },
        features: {
          analytics: true,
          api_access: false,
          white_label: false,
        },
      },
    })
    .select()
    .single();

  if (error) throw error;

  // Create organization member record
  await supabase
    .from('organization_members')
    .insert({
      organization_id: data.id,
      user_id: userId,
      role: 'owner',
    });

  return data;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserOrganizations = async (userId: string) => {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      role,
      organizations (
        id,
        name,
        settings,
        subscription_status,
        subscription_plan,
        created_at
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};