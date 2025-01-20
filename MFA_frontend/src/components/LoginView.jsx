import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
  
      if (!token) {
        console.error('No token received from Google');
        alert('Failed to retrieve Google token');
        return;
      }
  
      console.log('Google Token:', token);
  
      // Send the token to the backend
      const response = await fetch('http://localhost:3001/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Backend Response:', data);
        alert(`Welcome, ${data.user.display_name}`);
      } else {
        console.error('Backend Error:', data.error);
        alert(data.error || 'Sign-In failed');
      }
    } catch (error) {
      console.error('Error during Google Login:', error.message);
      alert('An error occurred during Google Login');
    }
  };
  
  
  
  

  const handleGoogleLoginError = () => {
    console.error('Google Login Failed');
    setError('Google Login Failed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your manual login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: '20px' }}>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
      </div>
    </div>
  );
}

export default LoginView;
