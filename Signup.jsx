import React, { useState } from 'react';
import { supabase } from '../supabase.js';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (loading) return;
    setError(null);

    // Input validation
    if (!firstName.trim()) return setError('First name is required');
    if (!lastName.trim()) return setError('Last name is required');
    if (!email.includes('@') || !email.includes('.')) return setError('Invalid email address');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    setLoading(true);

    // ✅ Sign up with Supabase Auth
    const { data: authData, error: signupError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signupError) {
      setError(signupError.message); // this will catch duplicate emails too
      setLoading(false);
      return;
    }

    const user = authData?.user;
    if (user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: email
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    alert('Check your email to confirm your sign-up!');
    setLoading(false);
    navigate('/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="First Name"
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={e => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </div>
  );
}