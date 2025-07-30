import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Login from './Login';
import Dashboard from './Dashboard';
import Match from './Match';
import Signup from './Signup';


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login supabase={supabase} />} />
        <Route path="/dashboard" element={user ? <Dashboard supabase={supabase} user={user} /> : <Navigate to="/" />} />
        <Route path="/match/:id" element={user ? <Match supabase={supabase} user={user} /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login supabase={supabase} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
