import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnaboswulnoyjrvdrdzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYWJvc3d1bG5veWpydmRyZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4ODA1ODYsImV4cCI6MjAyMzQ1NjU4Nn0.MFZlI2P4J98TxxDxM-uTvi0BxWzlqOyUZB5IPv3pMSo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
