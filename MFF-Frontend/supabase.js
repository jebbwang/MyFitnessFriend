import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient('https://lnaboswulnoyjrvdrdzx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYWJvc3d1bG5veWpydmRyZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4ODA1ODYsImV4cCI6MjAyMzQ1NjU4Nn0.MFZlI2P4J98TxxDxM-uTvi0BxWzlqOyUZB5IPv3pMSo', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})