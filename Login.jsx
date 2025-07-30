import React, { useState } from 'react';
import { supabase } from '../supabase.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/dashboard'); // or wherever you want to go after login
    setLoading(false);
  };

  return (
    <div className="login-page" style={{ padding: 20 }}>
      <h2>Darts Fines Tracker Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
      <button onClick={() => navigate('/signup')} style={{ marginLeft: 10 }}>
        Sign Up
      </button>
    </div>
  );
}