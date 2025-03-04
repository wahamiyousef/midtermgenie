import { ThemeProvider } from './components/theme-provider'
import Layout from './layout'
import MainPage from './MainPage'
import SettingsPage from './components/pages/SettingsPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import LoginPage from './components/pages/LoginPage'
import { Auth } from './components/pages/Auth'
import { Account } from './components/pages/Account'
import Landing from './components/pages/Landing'
import { LoaderCircle } from 'lucide-react'


function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      /*
      setTimeout(function(){
        setLoading(false);
      }, 2000);
      */
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className='flex items-center justify-center h-screen gap-4 flex-col'>
          <p>Loading...</p>
          <LoaderCircle className='animate-spin'/>
        </div>
      </ThemeProvider>
    );
  }
  
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {!session ? (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        ) : (
          <Layout>
            {/* <Account key={session.user.id} session={session} /> */}
            {
              /*
            <nav>
              <Link to="/">Home</Link>
              <Link to="/settings">Settings</Link>
            </nav>
            */
            }
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/account" element={<Account key={session.user.id} session={session} />} />
            </Routes>
          </Layout>
        )}
        
      </ThemeProvider>
    </Router>
  )
}

export default App
